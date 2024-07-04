import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["bin/cli.ts", "lib/index.ts"],
  target: "es2020",
  format: ["esm"],
  dts: true,
});
