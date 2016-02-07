var fs = require("fs")
var postcss = require("postcss")
var css = fs.readFileSync("src/css/styles.css", "utf8")

postcss([require('autoprefixer'), require('postcss-import'), require('postcss-simple-vars'), require('postcss-nested'), require('postcss-pxtorem')({
	root_value: 16,
	unit_precision: 2,
	prop_white_list: ['font-size', 'line-height', 'padding'],
	replace: true,
	media_query: false
}), require('postcss-sorting'), require('postcss-devtools')])
.process(css, {
		from: "./src/css/styles.css",
		to: "./css/styles.css",
		map: {
			inline: false
		},
	})
	.then(function(result) {
		fs.writeFileSync('./css/styles.css', result.css);
		if (result.map) fs.writeFileSync('./css/styles.css.map', result.map);
	});