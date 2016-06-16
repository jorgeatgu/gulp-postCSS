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
        }]
        "at-rule-name-space-after": "always-single-line",
        "at-rule-semicolon-newline-after": ["always", {
            message: ["Punto y coma = return"]
        }]
        "block-closing-brace-newline-after": ["always", {
            message: ["Llave = return"]
        }]
        "block-closing-brace-newline-before": ["always", {
            message: ["La llave de cierre siempre va sola "]
        }]
        "block-closing-brace-space-before": ["always", {
            message: ["La llave siempre lleva un espacio delante"]
        }]
        "block-no-empty": [true, {
            message: ["Propiedad vacía, golpe de remo por gañan."]
        }]
        "block-opening-brace-newline-after": "always-multi-line",
        "block-opening-brace-space-after": "always-single-line",
        "block-opening-brace-space-before": "always",
        "color-hex-length": "short",
        "color-no-invalid-hex": true,
        "comment-whitespace-inside": "always",
        "declaration-bang-space-after": "never",
        "declaration-bang-space-before": "always",
        "declaration-block-no-ignored-properties": true,
        "declaration-block-no-shorthand-property-overrides": true,
        "declaration-block-semicolon-newline-after": "always-multi-line",
        "declaration-block-semicolon-space-after": "always-single-line",
        "declaration-block-semicolon-space-before": "never",
        "declaration-block-single-line-max-declarations": 1,
        "declaration-block-trailing-semicolon": "always",
        "declaration-colon-newline-after": "always-multi-line",
        "declaration-colon-space-after": "always-single-line",
        "declaration-colon-space-before": "never",
        "function-calc-no-unspaced-operator": true,
        "function-comma-newline-after": "always-multi-line",
        "function-comma-space-after": "always-single-line",
        "function-comma-space-before": "never",
        "function-linear-gradient-no-nonstandard-direction": true,
        "function-max-empty-lines": 0,
        "function-name-case": "lower",
        "function-parentheses-newline-inside": "always-multi-line",
        "function-parentheses-space-inside": "never-single-line",
        "function-whitespace-after": "always",
        "keyframe-declaration-no-important": true,
        "max-empty-lines": 2,
        "media-feature-colon-space-after": "always",
        "media-feature-colon-space-before": "never",
        "media-feature-no-missing-punctuation": true,
        "media-feature-range-operator-space-after": "always",
        "media-feature-range-operator-space-before": "always",
        "media-query-list-comma-newline-after": "always-multi-line",
        "media-query-list-comma-space-after": "always-single-line",
        "media-query-list-comma-space-before": "never",
        "media-query-parentheses-space-inside": "never",
        "no-eol-whitespace": true,
        "no-extra-semicolons": true,
        "no-invalid-double-slash-comments": true,
        "number-no-trailing-zeros": true,
        "number-zero-length-no-unit": true,
        "property-case": "lower",
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
