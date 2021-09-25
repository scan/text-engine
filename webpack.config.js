/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
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
          target: 'es2015'
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
      title: 'Text Engine',
      inject: 'body',
    }),
    new SubresourceIntegrityPlugin(),
    new FaviconsWebpackPlugin({
      logo: path.join(srcDir, 'logo.svg'),
      manifest: {
        lang: 'en-GB',
        name: 'Text Engine',
        short_name: 'TextEngine',
        display: 'fullscreen',
        background_color: '#303030',
        theme_color: '#d84315'
      }
    }),
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
