const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: './server/server.ts',
  output: {
    filename: 'server.js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: ['node_modules', 'server'],
  }
}
