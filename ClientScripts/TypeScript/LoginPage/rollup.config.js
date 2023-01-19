const { SCRIPTS_DIR } = require("./copy-path");
const defaultOptions = require("@docsvision/webclient-extension-build/rollup.config.js");

module.exports = {
  input: 'src/Index.tsx',
  output: {
    file: SCRIPTS_DIR + '/extension.js',
    format: 'umd',
    sourcemap: true
  },
  plugins: defaultOptions.plugins
};