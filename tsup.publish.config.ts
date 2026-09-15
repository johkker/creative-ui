import { defineConfig } from "tsup";

export default defineConfig({
  entry: { index: "packages/cli/src/index.tsx" },
  outDir: "dist",
  format: ["esm"],
  platform: "node",
  target: "node20",
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: false,
  noExternal: [/^@creative-ui\//],
  external: ["playwright"],
});
