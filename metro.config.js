const { getDefaultConfig } = require('expo/metro-config');
const jsoMetroPlugin = require("obfuscator-io-metro-plugin")({
  compact: false,
  sourceMap: false,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 1,
  numbersToExpressions: true,
  simplify: true,
  stringArrayShuffle: true,
  splitStrings: true,
  stringArrayThreshold: 1,
}, {
  runInDev: false,
  logObfuscatedFiles: true,
});

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
  ...getDefaultConfig(__dirname),
  ...jsoMetroPlugin,
};