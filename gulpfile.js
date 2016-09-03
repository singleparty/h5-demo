var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require("webpack");
var webpackMinConfig = require("./webpack.config.min.js");
gulp.task('clean', function () {
    return gulp.src(['./dist']).pipe(clean());
});
gulp.task("build", ['clean'], function(callback) {
    return webpack(Object.create(webpackMinConfig), function(err, stats) {callback();});
});