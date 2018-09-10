const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { ANALYZE } = process.env;

const appPlugins = [];

if (ANALYZE) {
  appPlugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true,
    })
  );
}

module.exports = ({ root, platform }, defaults) => ({
  entry: './index.js',
  output: {
    path: path.join(root, 'qt/dist'),
    filename: `${platform}.bundle.js`,
    library: 'Bundle',
  },
  plugins: [...defaults.plugins, ...appPlugins],
});
