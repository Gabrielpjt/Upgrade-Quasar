/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */

/* eslint-env node */

const path = require('path');
const webpack = require('webpack');
const { bundler, styles } = require('@ckeditor/ckeditor5-dev-utils');
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  performance: { hints: false },
  entry: path.resolve(__dirname, 'src', 'ckeditor.js'),
  output: {
    library: 'ClassicEditor',
    path: path.resolve(__dirname, 'build'),
    filename: 'ckeditor.js',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },

  optimization: {
    minimizer: [
      new TerserWebpackPlugin({
        terserOptions: {
          output: {
            // Preserve CKEditor 5 license comments.
            comments: /^!/
          }
        },
        extractComments: false
      })
    ]
  },

  plugins: [
    new CKEditorWebpackPlugin({
      language: 'en',
      additionalLanguages: 'all'
    }),
    new webpack.BannerPlugin({
      banner: bundler.getLicenseBanner(),
      raw: true
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ],

  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag',
              attributes: {
                'data-cke': true
              }
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: styles.getPostCssConfig({
                themeImporter: {
                  themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                },
                minify: true
              })
            }
          }
        ]
      }
    ]
  }
};