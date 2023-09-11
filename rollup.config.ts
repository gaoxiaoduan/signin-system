import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeExternals from "rollup-plugin-node-externals";
import nodeResolve from "@rollup/plugin-node-resolve";

export default defineConfig({
    input: "./src/main.ts",
    output: {
        dir: "./dist",
        format: "esm",
        preserveModules: true,
        sourcemap: true
    },
    plugins: [
        nodeResolve(),
        nodeExternals(),
        typescript(),
    ]
});