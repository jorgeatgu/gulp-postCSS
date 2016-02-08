var postcss = require('postcss')

module.exports = {
  use: [
    "postcss-devtools",
    "postcss-import",
    "postcss-inline-comment",
    "postcss-nested",
    "postcss-pxtorem",
    "postcss-simple-vars",
    "postcss-sorting"
  ],
  "postcss-pxtorem": {
    root_value: 16,
    unit_precision: 2,
    prop_white_list: ['font-size', 'line-height', 'padding'],
    replace: true,
    media_query: false
  },
  "input": 'src/css/styles.css',
  "output": "css/styles.css"
}