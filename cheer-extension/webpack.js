const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const srcDir = path.join(__dirname, 'src');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  entry: {
    content: path.join(srcDir, 'content.tsx'),
    twitter_embed: path.join(srcDir, 'twitter_embed.ts'),
    background: path.join(srcDir, 'background.ts'),
  },
  output: {
    path: path.join(__dirname, 'dist/js'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  plugins: [
    new Dotenv(),
    new CopyPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
      options: {},
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
