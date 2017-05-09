var path = require('path');
var connect = require('gulp-connect');
var gulp = require('gulp');
var compass = require('gulp-compass');

gulp.task('connect',function(){
    connect.server({
        root: './',
        port: 9001
    })
    gulp.watch('./assets/default/sass/*.scss', ['compass']);
});


//编译sass
gulp.task('compass',function(){
    var skinName = 'default';
    gulp.src('./assets/'+ skinName +'/**/*.scss') //没有指定想根文件夹，不能复制
    .pipe(compass({
        project: path.join(__dirname, 'assets/' + skinName),
        css: '../../skin',
        sass: 'sass'
    }));
});
