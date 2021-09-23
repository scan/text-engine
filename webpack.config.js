const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'jsx',
          target: 'es2015',
        },
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'text-engine',
      inject: 'body',
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    }),
  ],
};
