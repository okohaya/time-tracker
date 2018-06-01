const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    bundle: './src/index.js',
  },
  output: {
    filename: 'js/[name].js?id=[hash]',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  devServer: {
    host: '0.0.0.0',
    port: 8001,
    disableHostCheck: true,
    contentBase: '../public',
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
}
