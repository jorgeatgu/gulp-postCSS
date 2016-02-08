var fs = require("fs")
var autoprefixer = require("autoprefixer")
var postcss = require("postcss")
var atImport = require("postcss-import")
var vars = require("postcss-simple-vars")
var nested = require("postcss-nested")
var pxToRem = require("postcss-pxtorem")
var sorting = require("postcss-sorting")
var devtools = require('postcss-devtools')
var css = fs.readFileSync("src/css/styles.css", "utf8")

postcss()
	.use(devtools())
	.use(atImport())
	.use(vars())
	.use(nested())
	//pasamos las opciones al plugin
	.use(pxToRem({
		root_value: 16,
		unit_precision: 2,
		prop_white_list: ['font-size', 'line-height', 'padding'],
		replace: true,
		media_query: false
	}))
	.use(sorting())
	.process(css, {
		//La ruta donde se alojan nuestros CSS
		from: "./src/css/styles.css",
		//La ruta donde vamos a dejar el CSS
		to: "./css/styles.css",
		//Vamos a desactivar los source maps inline
		map: {
			inline: false
		},
	})
	.then(function(result) {
		fs.writeFileSync('./css/styles.css', result.css);
		//Si desactivamos los source maps inline vamos a escribir la ruta donde queremos que cree el .map
		if (result.map) fs.writeFileSync('./css/styles.css.map', result.map);
	});