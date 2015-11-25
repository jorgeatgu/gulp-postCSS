var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var vars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var rucksack = require('gulp-rucksack');
var pxtorem = require('postcss-pxtorem');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('css', function() {
	var processors = [
		vars,
		nested,
		rucksack,
		pxtorem({
			root_value: 16,
			unit_precision: 2,
			prop_white_list: ['font-size', 'line-height', 'padding'],
			replace: true,
			media_query: false
		}),
		autoprefixer
	];
	//Aquí la ruta de donde coge nuestros css
	return gulp.src('./src/css/styles.css')
		.pipe(rucksack())
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('./dist/css'));
});


gulp.task('default', function() {
	gulp.watch('./src/css/*.css', ['css']);
});