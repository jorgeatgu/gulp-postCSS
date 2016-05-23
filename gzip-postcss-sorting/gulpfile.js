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
rename = require('gulp-rename');

gulp.task('css', function() {
    var processors = [
        nested,
        atImport,
        cssnext,
        autoprefixer,
        sorting({
            "sort-order": "yandex"
        })
    ];
    return gulp.src('./src/css/styles.css')

    .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('minify', function() {
    return gulp.src('./css/*.css')
        .pipe(nano())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'));
});


gulp.task('default', function() {
    gulp.watch('./src/css/*.css', ['css']);
});