var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    pump = require('pump');

gulp.task('default', function(){
    gulp.start('minifycss','uglifyjs');
    // gulp.start('minifycss');
});

gulp.task('minifycss', function(cb){
    pump([
            gulp.src('auth/src/auth.css'),
            concat('auth.css'),
            rename({suffix:'.min'}),
            minifycss(),
            gulp.dest('auth/dist'),
            notify({message: 'css minfiy done'})
        ],
        cb
    )
});

gulp.task('uglifyjs', function(cb){
    pump([
            gulp.src(['auth/public/jquery.min.js','auth/src/auth.js']),
            concat('auth.js'),
            rename({suffix:'.min'}),
            uglify(),
            gulp.dest('auth/dist'),
            notify({message: 'js uglify done'})
        ],
        cb
    );
});

























