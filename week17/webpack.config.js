module.exports = {
  entry: './main.js',
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
  mode: "development",
  optimization: {
    minimize: false
  },
  devServer: {
    writeToDisk: true
  }
}