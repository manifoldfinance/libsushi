import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import external from "rollup-plugin-peer-deps-external";
import commonjs from "@rollup/plugin-commonjs";
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve'
import { terser } from "rollup-plugin-terser";

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            exports: "named",
            sourcemap: true,
        },
        {
            file: pkg.module,
            format: "es",
            exports: "named",
            sourcemap: true,
        },
    ],
    plugins: [
        external(),
        typescript({
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        babel({
            presets: ["@babel/preset-react"],
            extensions: [
                '.ts',
                '.tsx',
            ],
        }),
        resolve(),
        commonjs(),
        terser()
    ],
};