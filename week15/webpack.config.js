module.exports = {
  // entry: './main_SFC.js',
  entry: './main_animation.js',
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
        test: /\.vue/,
        use: {
          loader: require.resolve("./myloader.js"),
        }
      }
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