import webpack from 'webpack';
import Config from 'webpack-config';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || '3000';

export default new Config().extend('config/webpack.base.config.js').merge({
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://${HOST}:${PORT}`,
    'webpack/hot/only-dev-server',
    './client/index.js'
  ],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js'
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
              localIdentName: '[local]__[hash:base64:5]',
              minimize: false
            }
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './build',
    noInfo: true,
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
});
