var gulp = require('gulp');
var postcss = require('gulp-postcss');

gulp.task('css', function() {
	var processors = [
		//Aqui irán los plugins que vayamos instalando
	];
	//Aquí la ruta de donde coge nuestros css
	return gulp.src('./src/css/styles.css')
		.pipe(postcss(processors))
		//Aqui la ruta de destino
		.pipe(gulp.dest('./dist/css'));
});