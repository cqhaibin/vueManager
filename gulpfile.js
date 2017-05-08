var path = require('path');
var connect = require('gulp-connect');
var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('connect',function(){
    connect.server({
        root: './',
        port: 9001
    })
});

//编译sass
gulp.task('compass',function(){
    var skinName = 'default';
    gulp.src('./assets/'+ skinName +'/*.scss')
    .pipe(compass({
        project: path.join(__dirname, 'assets/' + skinName),
        css: 'css',
        sass: 'sass'
    }))
    .pipe(gulp.dest('./skin'));
});
