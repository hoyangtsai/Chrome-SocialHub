'use strict';
var gulp = require('gulp');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var del = require('del');

gulp.task('copy', function() {
  return gulp.src(['background.js', 'manifest.json', '*.png'])
    .pipe(gulp.dest('build/'));
});

gulp.task('copyMdl', function() {
  return gulp.src(['mdl/*.min.css', 'mdl/*.min.js', 'css/font/*'])
    .pipe(gulp.dest('build/mdl'));
});

gulp.task('copyLocales', function() {
  return gulp.src('_locales/*/*')
    .pipe(gulp.dest('build/_locales'));
});

gulp.task('clean', function() {
  return del(['build/*', 'build/*/*', 'build/_locales/*/*']);
});

gulp.task('usemin', ['clean', 'copy', 'copyMdl', 'copyLocales'], function() {
  return gulp.src('*.html')
    .pipe(usemin({
      css: [ minifyCss, rev ],
      html: [ function () {return minifyHtml({ empty: true });} ],
      js: [ uglify, rev ],
      inlinejs: [ uglify ],
      inlinecss: [ minifyCss, 'concat' ]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['usemin']);
