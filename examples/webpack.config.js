const path = require('path');
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const config = require('../build/webpack.config');

config.mode = 'production';
config.devtool = '';
config.entry = {
  main: path.resolve(__dirname, './main.jsx')
};
config.output = {
  path: path.resolve(__dirname),
  filename: '[name].js'
};
delete config.externals;
config.plugins.length = config.plugins.length - 1;
config.plugins.push(
  new openBrowserWebpackPlugin({ url: 'http://localhost:9000' })
);

config.devServer = {
  contentBase: path.join(__dirname),
  compress: true,
  port: 9000
};

module.exports = config;
