const { BUNDLE_DIR } = require("./copy-path");
const defaultOptions = require("@docsvision/webclient-extension-build/rollup.config.js");
const fs = require('fs');
const replace = require('@rollup/plugin-replace');

// let versionInfo = fs.readFileSync("../BuildInfo.cs");
// let regexp = /Version = "(.*)";/gm;
// let version = regexp.exec(versionInfo)[1].replace("5.5.", "");
// defaultOptions.plugins.unshift(replace({ 'this.BuildVersion': `'${version}'` }));
// console.info("\r\nBuilding web extension v" + version)

module.exports = {
  input: 'src/Index.ts',
  output: {
    file: BUNDLE_DIR + '/extension.js',
    format: defaultOptions.output.format,
    sourcemap: true
  },
  plugins: defaultOptions.plugins,
  external: defaultOptions.external
};