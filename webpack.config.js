const path = require('path');

module.exports = {
    entry: {
        knn: './_site/writing_dir/thoughts/js/knn.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, './_site/writing_dir/js/'),
    },
  };