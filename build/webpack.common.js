const path = require('path');
// 处理 ie8 下一些关键词， 比如 default
const es3ifyPlugin = require('es3ify-webpack-plugin');
// const Visualizer = require('webpack-visualizer-plugin');

var reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};
var reactDOMExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

module.exports = {
  devtool: 'source-map',
  externals: {
    'react': reactExternal,
    'react-dom': reactDOMExternal
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader?cacheDirectory'
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          'css-loader',
          // 'postcss-loader',
          // 'less-loader'
        ]
      },
      {
        test: /\.(png|jpe?g)$/,
        use: [
          'url-loader'
        ]
      }
    ]
  },
  plugins: [
    new es3ifyPlugin(),
    // new Visualizer()
  ]
};
