const { BUNDLE_DIR } = require("./copy-path");
const defaultOptions = require("@docsvision/webclient-extension-build/rollup.config.js");

module.exports = {
  input: 'src/Index.ts',
  output: {
    ...defaultOptions.output,
    file: BUNDLE_DIR + '/extension.js'
  },
  plugins: defaultOptions.plugins,
  external: defaultOptions.external
};
