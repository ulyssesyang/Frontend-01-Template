var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  module: {
    rules: [{
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              ["@babel/plugin-transform-react-jsx", {
                pragma: 'createElement'
              }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: require.resolve('./lib/createStyle.js')
        },
      },
      // {
      //   test: /\.css$/,
      //   use: {
      //     loader: 'css-loader'
      //   },
      // }
    ]
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: "development",
  optimization: {
    minimize: false
  },
  devServer: {
    writeToDisk: true,
    open: true,
    compress: false
  }
}