var connect = require('gulp-connect');
var gulp = require('gulp');

gulp.task('connect',function(){
    connect.server({
        root: './',
        port: 9001
    })
});
