var gulp = require('gulp');
var clean = require('gulp-clean');
var webpack = require("webpack");
var webpackBuildConfig = require("./webpack.config.build.js");
gulp.task('clean', function () {
    return gulp.src(['./dist']).pipe(clean());
});
gulp.task("build", ['clean'], function(callback) {
    return webpack(Object.create(webpackBuildConfig), function(err, stats) {callback();});
});