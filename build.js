/* eslint-disable unicorn/import-style */
/* eslint-disable unicorn/prefer-module */

/**
 *
 */

const { build } = require('esbuild');
// const { dependencies = {} } = require('../package.json');
const { join, resolve } = require('path');
const { ensureDirSync, remove } = require('fs-extra');

const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');

//c onst external = Object.entries(dependencies).map(([key]) => key);
const root = process.cwd();

async function buildPackage(format, outfile) {
  return build({
    entryPoints: [resolve(join(root, 'src/index.ts'))],
    bundle: true,
    minify: true,
    format,
    sourcemap: true,
    target: ["esnext", "node18"],//['chrome60', 'firefox60', 'safari11', 'edge18'],
    outfile,
    external: ['esbuild']
  });
}

async function buildTypings() {
  ensureDirSync(join(root, 'dist/docs'));
  ensureDirSync(join(root, 'dist/@types'));

  const extractorConfig = ExtractorConfig.loadFileAndPrepare(
    join(root, 'api-extractor.json')
  );

  const extractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,
    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true
  });

  const result = extractorResult.succeeded
    ? Promise.resolve(extractorResult.succeeded)
    : Promise.reject(extractorResult.errorCount);

  return result;
}

async function buildBundle() {
  await remove(join(root, 'dist'));

  await buildPackage('cjs', 'dist/libsushi.cjs.js');
  await buildPackage('esm', 'dist/libsushi.esm.js');

  await buildTypings();

  await remove(join(root, 'declarations'));
  await remove(join(root, 'temp'));
}

buildBundle();