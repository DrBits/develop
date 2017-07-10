const autoprefixer = require('autoprefixer');
const precss = require('precss');

module.exports = {
  loader: 'postcss-loader',
  options: {
    plugins: [precss, autoprefixer]
  }
};
