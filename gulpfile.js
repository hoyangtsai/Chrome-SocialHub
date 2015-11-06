var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');

gulp.task('copy', function() {
  return gulp.src(['background.js', 'manifest.json', '*.png'])
    .pipe(gulp.dest('build/'));
});

gulp.task('copyMdl', function() {
  return gulp.src(['mdl/*.min.css', 'mdl/*.min.js'])
    .pipe(gulp.dest('build/mdl'));
});

gulp.task('copyLocales', function() {
  return gulp.src('_locales/*/*')
    .pipe(gulp.dest('build/_locales'));
});

gulp.task('copyFont', function() {
  return gulp.src('css/font/*')
    .pipe(gulp.dest('build/css/font'));
});

gulp.task('clean', function() {
  return del.sync(['build/**']);
});

gulp.task('usemin', ['clean', 'copy', 'copyMdl', 'copyLocales', 'copyFont'], function() {
  return gulp.src('*.html')
    .pipe($.usemin({
      css: [ $.minifyCss, $.rev ],
      html: [ $.minifyHtml({ empty: true }) ],
      js: [ $.uglify, $.rev ],
      inlinejs: [ $.uglify ],
      inlinecss: [ $.minifyCss, 'concat' ]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('default', ['usemin']);
