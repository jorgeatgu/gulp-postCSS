var gulp = require('gulp');
postcss = require('gulp-postcss');
autoprefixer = require('gulp-autoprefixer');
sourcemaps = require('gulp-sourcemaps');
atImport = require('postcss-import');
postCSS_InlineComment = require('postcss-inline-comment');
cssnext = require('postcss-cssnext');
sorting = require('postcss-sorting');
nested = require('postcss-nested');
nano = require('gulp-cssnano');


var imgSrc = './src/img/*';
var imgDist = './img';
var jsSrc = './src/js/*.js';
var jsDist = './js';


gulp.task('css', function() {
    var processors = [
        nested,
        atImport,
        cssnext,
        autoprefixer,
        sorting({
            "sort-order": "zen"
        })
    ];
    return gulp.src('./src/css/styles.css')

    .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify', function() {
    return gulp.src('./css/styles.css')
        .pipe(nano())
        .pipe(gulp.dest('./css'));
});


gulp.task('default', function() {
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./css/*.css', ['minify']);
});