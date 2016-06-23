var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var nested = require('postcss-nested');
var pxtorem = require('postcss-pxtorem');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');


gulp.task('css', function() {
  var processors = [
    nested,
    stylelint(),
    reporter({
      clearMessages: true
    }),
    pxtorem
  ];
  //Aquí la ruta de donde coge nuestros css
  return gulp.src('./src/css/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./css'));


});

gulp.task('default', function() {
  gulp.watch('./src/css/*.css', ['css']);
});
