const gulp = require('gulp');
const webpack = require('webpack');
const $ = require('gulp-load-plugins')();


// public/components/**/*.css to .build/css/components.bundle.css
gulp.task('component-css', function () {
    return gulp.src('./public/components/**/*.css')
    .pipe($.concat('components.bundle.css'))
    .pipe(gulp.dest('./.build/css/'))
});


// public/assets/**  to .build/assets/** 
gulp.task('copy-assets', function() {
    return gulp.src('./public/assets/**')
    .pipe(gulp.dest('./.build/assets'))
});

// public/components/**/*.js to .build/js/components.bundle.js
gulp.task('webpackify-components', function() {
    webpack(require('./webpack.config.js'), function() {
        console.log('Done');
    });
});

gulp.task('watch', function() {
    gulp.watch('./public/**/*.js', ['webpackify-components']);
    gulp.watch('./public/**/*.css',['component-css']);
    gulp.watch('./public/assets/**', ['copy-assets']);
});

gulp.task('dev', ['build', 'watch'], function() {
    $.nodemon({
        script: 'index.js',
        watch: ['controllers', 'models', 'config', 'lib'],
        exec: 'node --inspect',
    });
});

gulp.task('build', ['webpackify-components']);
