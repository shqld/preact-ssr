const webpack = require('webpack')

const paths = require('./build.paths')

const getConfig = (platform, isClient = platform === 'client') => ({
  mode: process.env.NODE_ENV,
  entry: paths.entry[platform],
  output: {
    path: paths.output[platform],
    publicPath: isClient ? '/static' : '',
    libraryTarget: isClient ? 'umd' : 'commonjs2',
  },
  stats: 'verbose',
  cache: true,
  target: isClient ? 'web' : 'node',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: paths.cache[platform],
            },
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  isClient
                    ? { targets: { ie: '11' }, modules: 'amd' }
                    : { targets: { node: 'current' }, modules: 'commonjs' },
                ],
              ],
              cacheDirectory: true,
            },
          },
        ],
        rules: [
          {
            test: /\.jsx$/,
            loader: 'babel-loader',
            options: { presets: ['preact'] },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
})

module.exports = {
  client: getConfig('client'),
  views: getConfig('views'),
}
