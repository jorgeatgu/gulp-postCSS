var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var nested = require('postcss-nested');
var pxtorem = require('postcss-pxtorem');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');


gulp.task('css', function() {
    var processors = [
        nested,
        autoprefixer
    ];
    //Aquí la ruta de donde coge nuestros css
    return gulp.src('./src/css/styles.css')
        .pipe(rucksack())
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(colorblindPlugin())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'));

});

gulp.task('default', function() {
    gulp.watch('./src/css/*.css', ['css']);
});
