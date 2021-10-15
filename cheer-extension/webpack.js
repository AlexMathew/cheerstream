const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const srcDir = path.join(__dirname, 'src');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    content: path.join(srcDir, 'content.tsx'),
    twitter_embed: path.join(srcDir, 'twitter_embed.ts'),
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
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: '.', to: '../', context: 'public' }],
      options: {},
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};
