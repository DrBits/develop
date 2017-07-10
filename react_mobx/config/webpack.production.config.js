import webpack from 'webpack';
import Config from 'webpack-config';

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: './client/index.js',
  output: {
    filename: '[chunkhash].js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:5]',
              minimize: true
            }
          },
          { loader: 'postcss-loader' }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true
      }
    })
  ]
});
