var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('gulp-autoprefixer');
var nested = require('postcss-nested');
var pxtorem = require('postcss-pxtorem');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var stylelint = require('stylelint');
var reporter = require('postcss-reporter');


var stylelintConfig = {
    "rules": {
        "at-rule-empty-line-before": ["always", {
            except: ["blockless-group", "first-nested"],
            ignore: ["after-comment"],
            message: ["Deja un espacio despues de una propiedad"]
        }],
        "at-rule-name-case": ["lower", {
            message: ["Las propiedades siempre en minúsculas"]
        }],
        "at-rule-name-space-after": "always-single-line",
        "at-rule-semicolon-newline-after": ["always", {
            message: ["Punto y coma = return"]
        }],
        "block-closing-brace-newline-after": ["always", {
            message: ["Llave = return"]
        }],
        "block-closing-brace-newline-before": ["always", {
            message: ["La llave de cierre siempre va sola "]
        }],
        "block-closing-brace-space-before": ["always", {
            message: ["La llave siempre lleva un espacio delante"]
        }],
        "block-no-empty": [true, {
            message: ["Propiedad vacía, golpe de remo por gañan."]
        }],
        "block-opening-brace-newline-after": ["always", {
            message: ["Llave de apertura siempre va sola"]
        }],
        "block-opening-brace-space-after": ["always", {
            message: ["La llave de apertura siempre lleva espacio después"]
        }],
        "block-opening-brace-space-before": ["always", {
            message: ["Propiedad y llave siempre separadas por un espacio"]
        }],
        "color-hex-length": ["short", {
            message: ["¿Te gusta escribir más?"]
        }],
        "color-no-invalid-hex": [true, {
            message: ["En la vida eso será un color"]
        }],
        "comment-whitespace-inside": "always",
        "declaration-bang-space-before": ["always", {
            message: ["Que menos que dar un poco de separación a ese !important del averno"]
        }],
        "declaration-block-no-ignored-properties": true,
        "declaration-block-no-shorthand-property-overrides": [true, {
            message: ["El shorthand en primer lugar. Ejemplo .foo { margin: 10px; margin-right: 5px; }"]
        }],
        "declaration-block-semicolon-space-before": ["never", {
            message: ["Espacio antes del ; lo próximo será usar Bootstrap ¿no?"]
        }],
        "declaration-block-single-line-max-declarations": [1, {
            message: ["Declaración por línea. La legibilidad es innegociable!!"]
        }],
        "declaration-block-trailing-semicolon": ["always", {
            message: ["Te has dejado un ; nada más que decir ¿no?"]
        }],
        "declaration-colon-space-after": ["always", {
            message: ["Después de : siempre se deja espacio"]
        }],
        "declaration-colon-space-before": ["never", {
            message: ["Antes de los : jamás se deja espacio"]
        }],
        "function-calc-no-unspaced-operator": [true, {
            message: ["Los operadores matematicos siempre van acompañados de un espacio, antes y después. Siempre"]
        }],
        "function-comma-space-after": "always",
        "function-linear-gradient-no-nonstandard-direction": true,
        "function-max-empty-lines": 0,
        "function-name-case": ["lower", {
            message: ["Minúsculas"]
        }],
        "function-whitespace-after": ["always", {
            message: ["spacebar"]
        }],
        "keyframe-declaration-no-important": [true, {
            message: ["quita ese important"]
        }],
        "max-empty-lines": 1,
        "max-nesting-depth": [2, {
            message: ["No, no y no. Deja de abusar del nesting"]
        }],
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-no-missing-punctuation": true,
        "media-feature-range-operator-space-after": "always",
        "media-feature-range-operator-space-before": "always",
        "media-query-list-comma-newline-after": "always-multi-line",
        "media-query-list-comma-space-after": "always-single-line",
        "media-query-list-comma-space-before": "never",
        "media-query-parentheses-space-inside": "never",
        "no-eol-whitespace": [true, {
            message: ["A borrar los espacios"]
        }],
        "no-extra-semicolons": [true, {
            message: ["Te sobra un ;"]
        }],
        "number-leading-zero": ["never", {
            message: ["Escribiendo ceros de más"]
        }],
        "number-max-precision": [2, {
            message: ["Sobran decimales."]
        }],
        "number-no-trailing-zeros": [true, {
            message: ["Sobran ceros"]
        }],
        "property-case": ["lower", {
            message: ["En minúsculas"]
        }],
        "selector-attribute-brackets-space-inside": "never",
        "selector-attribute-operator-space-after": "never",
        "selector-attribute-operator-space-before": "never",
        "selector-combinator-space-after": "always",
        "selector-combinator-space-before": "always",
        "selector-list-comma-newline-after": "always",
        "selector-list-comma-space-before": "never",
        "selector-max-empty-lines": 0,
        "selector-pseudo-class-case": "lower",
        "selector-pseudo-class-no-unknown": true,
        "selector-pseudo-class-parentheses-space-inside": "never",
        "selector-pseudo-element-case": "lower",
        "selector-pseudo-element-colon-notation": "double",
        "selector-pseudo-element-no-unknown": true,
        "selector-type-case": "lower",
        "selector-type-no-unknown": true,
        "shorthand-property-no-redundant-values": true,
        "string-no-newline": true,
        "unit-case": "lower",
        "unit-no-unknown": true,
        "value-list-comma-newline-after": "always-multi-line",
        "value-list-comma-space-after": "always-single-line",
        "value-list-comma-space-before": "never",
    },

}

gulp.task('css', function() {
    var processors = [
        nested,
        autoprefixer,
        pxtorem,
        stylelint(stylelintConfig),
        reporter({
            clearMessages: true
        })
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
