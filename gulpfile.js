var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    pump = require('pump');


gulp.task('default', function(){
    gulp.start('minifycss','minifyjs');
    // gulp.start('minifycss');
});

gulp.task('minifycss', function(cb){
    pump([
            gulp.src('src/auth.css'),
            concat('auth.css'),
            rename({suffix:'.min'}),
            minifycss(),
            gulp.dest('dist'),
            notify({message: 'css minfiy done'})
        ],
        cb
    )
});

gulp.task('minifyjs', function(cb){
    pump([
            gulp.src(['public/jquery.min.js','src/auth.js']),
            concat('auth.js'),
            rename({suffix:'.min'}),
            uglify(),
            gulp.dest('dist'),
            notify({message: 'js uglify done'})
        ],
        cb
    );
});

























