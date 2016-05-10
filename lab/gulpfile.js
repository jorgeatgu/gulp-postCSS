var gulp = require('gulp');
postcss = require('gulp-postcss');
sourcemaps = require('gulp-sourcemaps');
atImport = require('postcss-import');
cssnext = require('postcss-cssnext');
sorting = require('postcss-sorting');
nested = require('postcss-nested');
devtools = require('postcss-devtools');
// cssstats = require('postcss-cssstats');

gulp.task('css', function() {
    var processors = [
        devtools,
        atImport,
        nested,
        cssnext,
        sorting({
            "sort-order": "csscomb"
        })
        // cssstats(
        //     function(stats) {
        //         console.log(stats);
        //     }
        // )
    ];
    return gulp.src('./src/css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write('./css', {
            sourceRoot: '/src'
        }))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function() {
    gulp.watch('./src/css/*.css', ['css']);
});