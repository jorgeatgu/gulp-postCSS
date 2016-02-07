var postcss = require('postcss')

module.exports = {
  use: [
    "postcss-devtools",
    "postcss-import",
    "postcss-inline-comment",
    "postcss-nested",
    "postcss-pxtorem",
    "postcss-reporter",
    "postcss-simple-vars",
    "postcss-sorting"
  ],
  input: 'src/css/styles.css',
  dir: 'css'
}