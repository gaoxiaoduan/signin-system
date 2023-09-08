import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    input: "./src/main.ts",
    output: {
        dir: "./dist",
        format: "esm",
        preserveModules: true,
        sourcemap: true
    },
    plugins: [
        typescript(),
    ]
});