var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var vars = require('postcss-simple-vars');
var nested = require('postcss-nested');
var rucksack = require('gulp-rucksack');
var pxtorem = require('postcss-pxtorem');
var sourcemaps = require('gulp-sourcemaps');
var oldie = require("oldie");
var rename = require('gulp-rename');

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

gulp.task('ie8', function() {
	var processors = [
		vars,
		nested,
		rucksack,
		oldie
	];
	//Aquí la ruta de donde coge nuestros css
	return gulp.src('./dist/css/styles.css')
		.pipe(rucksack())
		.pipe(postcss(processors))
		.pipe(rename({
			suffix: '.ie8'
		}))
		.pipe(gulp.dest('./dist/css'));
});


gulp.task('default', function() {
	gulp.watch('./src/css/*.css', ['css']);
});