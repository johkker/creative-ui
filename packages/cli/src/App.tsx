import React, { useMemo, useState } from "react";
import { Box, Text, useApp, useInput } from "ink";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  compositionSchema,
  defaultDesignDNA,
  generateDesignBrief,
  type DesignDNA,
} from "@creative-ui/core";

const compositions = compositionSchema.options;

const rows = [
  ["density", "Density"],
  ["experimentation", "Experimentation"],
  ["rawness", "Rawness"],
  ["layering", "Layering"],
  ["asymmetry", "Asymmetry"],
  ["kinetic", "Motion"],
  ["physicality", "Physicality"],
  ["typographicExpression", "Type expression"],
  ["contrast", "Contrast"],
  ["texture", "Texture"],
] as const;

type AxisKey = (typeof rows)[number][0];

function meter(value: number) {
  const total = 18;
  const filled = Math.round(value * total);
  return `${"█".repeat(filled)}${"░".repeat(total - filled)} ${Math.round(value * 100)}%`;
}

export function InitApp() {
  const { exit } = useApp();
  const [dna, setDna] = useState<DesignDNA>(structuredClone(defaultDesignDNA));
  const [cursor, setCursor] = useState(0);
  const [status, setStatus] = useState("Use ↑/↓ to select, ←/→ to adjust. Enter saves. C cycles composition.");

  const selected = rows[cursor];
  const currentComposition = useMemo(
    () => compositions.indexOf(dna.composition),
    [dna.composition],
  );

  async function save() {
    const dir = join(process.cwd(), ".creative-ui");
    await mkdir(dir, { recursive: true });
    await Promise.all([
      writeFile(join(dir, "design-dna.json"), `${JSON.stringify(dna, null, 2)}\n`),
      writeFile(join(dir, "DESIGN.md"), generateDesignBrief(dna)),
    ]);
    setStatus("Saved .creative-ui/design-dna.json and .creative-ui/DESIGN.md");
    setTimeout(exit, 250);
  }

  useInput((input, key) => {
    if (key.upArrow) setCursor((value) => Math.max(0, value - 1));
    if (key.downArrow) setCursor((value) => Math.min(rows.length - 1, value + 1));

    if (key.leftArrow || key.rightArrow) {
      const [keyName] = selected;
      const delta = key.rightArrow ? 0.05 : -0.05;
      setDna((current) => ({
        ...current,
        axes: {
          ...current.axes,
          [keyName]: Math.max(0, Math.min(1, current.axes[keyName as AxisKey] + delta)),
        },
      }));
    }

    if (input.toLowerCase() === "c") {
      const next = (currentComposition + 1) % compositions.length;
      setDna((current) => ({ ...current, composition: compositions[next] }));
    }

    if (input.toLowerCase() === "q" || key.escape) exit();
    if (key.return) void save();
  });

  return (
    <Box flexDirection="column" padding={1}>
      <Text bold>CREATIVE UI / DESIGN DIRECTOR</Text>
      <Text dimColor>Define intent before your coding agent touches JSX.</Text>
      <Box marginTop={1} flexDirection="column">
        <Text>Composition: <Text bold>{dna.composition}</Text> <Text dimColor>[C to cycle]</Text></Text>
        {rows.map(([keyName, label], index) => (
          <Text key={keyName} inverse={cursor === index}>
            {cursor === index ? "›" : " "} {label.padEnd(18)} {meter(dna.axes[keyName])}
          </Text>
        ))}
      </Box>
      <Box marginTop={1}>
        <Text dimColor>{status}</Text>
      </Box>
    </Box>
  );
}
