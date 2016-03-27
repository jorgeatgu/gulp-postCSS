var gulp = require('gulp');
postcss = require('gulp-postcss');
autoprefixer = require('gulp-autoprefixer');
sourcemaps = require('gulp-sourcemaps');
atImport = require('postcss-import');
postCSS_InlineComment = require('postcss-inline-comment');
cssnext = require('postcss-cssnext');
sorting = require('postcss-sorting');
nested = require('postcss-nested');
pxtorem = require('postcss-pxtorem');
uglify = require('gulp-uglify');
newer = require('gulp-newer');
rename = require('gulp-rename');
nano = require('gulp-cssnano');
notify = require("gulp-notify");
colorblind = require("postcss-colorblind");


var imgSrc = './src/img/*';
var imgDist = './img';
var jsSrc = './src/js/*.js';
var jsDist = './js';

function errorAlertJS(error) {
    notify.onError({
        title: "Gulp JavaScript",
        subtitle: "Algo esta mal en tu JavaScript!",
        sound: "Basso"
    })(error);
    console.log(error.toString());
    this.emit("end");
};

function errorAlertPost(error) {
    notify.onError({
        title: "Gulp postCSS",
        subtitle: "Algo esta mal en tu CSS!",
        sound: "Basso"
    })(error);
    console.log(error.toString());
    this.emit("end");
};

gulp.task('compress', function() {
    return gulp.src(jsSrc)
        .pipe(uglify())
        .on("error", errorAlertJS)
        .pipe(gulp.dest(jsDist))
        .pipe(notify({
            message: 'JavaScript complete'
        }));

});

gulp.task('css', function() {
    var processors = [
        nested,
        atImport,
        cssnext,
        autoprefixer,
        pxtorem({
            root_value: 16,
            unit_precision: 2,
            prop_white_list: ['font', 'font-size', 'line-height', 'letter-spacing', 'margin', 'padding'],
            replace: true,
            media_query: false
        }),
        sorting({
            "sort-order": "csscomb"
        })
    ];
    return gulp.src('./src/css/styles.css')

    .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .on("error", errorAlertPost)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'postCSS complete'
        }));
});

gulp.task('minify', function() {
    return gulp.src('./css/styles.css')
        .pipe(nano())
        .pipe(gulp.dest('./css'))
        .pipe(notify({
            message: 'CSSnano task complete'
        }));
});

gulp.task('blind', function() {
    var processors = [colorblind({
        method: 'achromatopsia'
    })];
    return gulp.src('./css/styles.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./css'));
});

gulp.task('default', function() {
    gulp.watch('./src/css/*.css', ['css']);
    gulp.watch('./src/img/**', ['images']);
    gulp.watch('./css/*.css', ['minify']);
});