import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright";

export type ViewportCapture = {
  name: string;
  width: number;
  height: number;
  screenshot: string;
  metrics: {
    sections: number;
    headings: number;
    buttons: number;
    links: number;
    largeRadiusElements: number;
    pillElements: number;
    gradientElements: number;
    backdropBlurElements: number;
    centeredTextElements: number;
    uniqueBackgroundColors: number;
    uniqueRadii: number;
  };
};

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 1000 },
  { name: "wide", width: 1920, height: 1080 },
];

export async function captureAndInspect(url: string, outputDirectory: string): Promise<{ url: string; captures: ViewportCapture[] }> {
  await mkdir(outputDirectory, { recursive: true });
  const browser = await chromium.launch({ headless: true });
  const captures: ViewportCapture[] = [];
  try {
    for (const viewport of viewports) {
      const page = await browser.newPage({ viewport: { width: viewport.width, height: viewport.height } });
      await page.goto(url, { waitUntil: "networkidle" });
      const screenshot = join(outputDirectory, `${viewport.name}-${viewport.width}.png`);
      await page.screenshot({ path: screenshot, fullPage: true });
      const metrics = await page.evaluate(() => {
        const elements = Array.from(document.querySelectorAll<HTMLElement>("body *"));
        const styles = elements.map((element) => ({ element, style: getComputedStyle(element) }));
        const radiusValue = (value: string) => Number.parseFloat(value) || 0;
        const backgrounds = new Set<string>();
        const radii = new Set<string>();
        let largeRadiusElements = 0, pillElements = 0, gradientElements = 0, backdropBlurElements = 0, centeredTextElements = 0;
        for (const { element, style } of styles) {
          const radius = radiusValue(style.borderTopLeftRadius);
          if (radius >= 16) largeRadiusElements++;
          const rect = element.getBoundingClientRect();
          if (radius >= Math.min(rect.width, rect.height) * 0.45 && Math.min(rect.width, rect.height) > 8) pillElements++;
          if (style.backgroundImage.includes("gradient")) gradientElements++;
          if (style.backdropFilter && style.backdropFilter !== "none") backdropBlurElements++;
          if (style.textAlign === "center" && (element.textContent?.trim().length ?? 0) > 2) centeredTextElements++;
          if (style.backgroundColor !== "rgba(0, 0, 0, 0)") backgrounds.add(style.backgroundColor);
          if (radius > 0) radii.add(style.borderTopLeftRadius);
        }
        return {
          sections: document.querySelectorAll("section, main > div, main > article").length,
          headings: document.querySelectorAll("h1,h2,h3,h4,h5,h6").length,
          buttons: document.querySelectorAll("button,[role=button]").length,
          links: document.querySelectorAll("a[href]").length,
          largeRadiusElements, pillElements, gradientElements, backdropBlurElements, centeredTextElements,
          uniqueBackgroundColors: backgrounds.size, uniqueRadii: radii.size,
        };
      });
      captures.push({ ...viewport, screenshot, metrics });
      await page.close();
    }
  } finally {
    await browser.close();
  }
  const result = { url, captures };
  await writeFile(join(outputDirectory, "inspection.json"), `${JSON.stringify(result, null, 2)}\n`);
  return result;
}
