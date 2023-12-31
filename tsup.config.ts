import { defineConfig } from "tsup";

export default defineConfig((options) => ({
  entry: ["src/index.ts", "src/preview.ts", "src/manager.ts"],
  splitting: false,
  minify: !options.watch,
  format: ["cjs"],
  dts: {
    resolve: true,
  },
  treeshake: true,
  sourcemap: true,
  clean: true,
  platform: "browser",
  esbuildOptions(options) {
    options.conditions = ["module"];
  },
}));
