var fs = require("fs")
var autoprefixer = require("autoprefixer")
var postcss = require("postcss")
var atImport = require("postcss-import")
var vars = require("postcss-simple-vars")
var nested = require("postcss-nested")
var pxToRem = require("postcss-pxtorem")
var sorting = require("postcss-sorting")
var messages = require("postcss-reporter")

var css = fs.readFileSync("src/css/styles.css", "utf8")


postcss([require('autoprefixer')])
	.use(atImport())
	.use(vars())
	.use(nested())
	.use(pxToRem())
	.use(sorting())
	.use(messages({
		formatter: function(input) {
			return input.source + ' produced ' + input.messages.length + ' messages';
		}
	}))
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