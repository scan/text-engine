const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SubresourceIntegrityPlugin } = require('webpack-subresource-integrity');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

const path = require('path');

const srcDir = path.join(__dirname, 'src');
const outDir = path.join(__dirname, 'dist');

module.exports = {
  entry: path.join(srcDir, 'index.tsx'),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]'
        }
      }
    ],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: outDir,
    crossOriginLoading: 'anonymous',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(srcDir, 'index.html'),
      title: 'text-engine',
      inject: 'body',
    }),
    new SubresourceIntegrityPlugin(),
    new FaviconsWebpackPlugin(path.join(srcDir, 'logo.svg')),
  ],
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
          chunks: 'all',
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // Syntax to compile to (see options below for possible values)
      }),
    ],
  },
};
