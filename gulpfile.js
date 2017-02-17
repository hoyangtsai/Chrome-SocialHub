var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence').use(gulp);

gulp.task('copy', function() {
  return gulp.src(
    [ 'background.js', 'manifest.json',
      'icons/**/*', 'fonts/**/*', '_locales/**/*'], {base: '.'}
    ).pipe(gulp.dest('build/'));
});

gulp.task('copyMdl', function() {
  return gulp.src(['mdl/*.min.css*', 'mdl/*.min.js*'])
    .pipe(gulp.dest('build/mdl'));
});

gulp.task('clean', function() {
  return del.sync(['build**']);
});

gulp.task('usemin', function() {
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

gulp.task('zip', function() {
  return gulp.src('build/*')
      .pipe($.zip('build.zip'))
      .pipe(gulp.dest('.'));
});

gulp.task('publish', function() {
  runSequence(
    'clean',
    ['usemin', 'copy', 'copyMdl'],
    'zip'
  );
});

gulp.task('default', ['publish']);
