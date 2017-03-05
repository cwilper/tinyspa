const gulp = require('gulp');
const browserify = require('gulp-browserify');
const closure = require('google-closure-compiler').gulp();
const del = require('del');
const rework = require('gulp-rework');
const reworkNpm = require('rework-npm');
const uglifycss = require('gulp-uglifycss');
const watch = require('gulp-watch');

gulp.task('clean', () =>
 del(['dist', 'npm-debug.log']));

gulp.task('superclean', ['clean'], () =>
 del(['node_modules']));

gulp.task('dev-js', () =>
  gulp.src('src/js/*.js')
    .pipe(browserify({ debug: true }))
    .pipe(gulp.dest('dist/dev/js')));

gulp.task('dev-css', () =>
  gulp.src('src/css/main.css')
    .pipe(rework(
      reworkNpm(),
      { sourcemap: true }))
    .pipe(gulp.dest('dist/dev/css')));

gulp.task('dev-copy', () =>
  gulp.src(['src/images/**', 'src/index.html'], { base: 'src/' })
    .pipe(gulp.dest('dist/dev')));

gulp.task('watch', () => {
  watch('src/js/**/*.js', () => gulp.start('dev-js'));
  watch('src/css/**/*.css', () => gulp.start('dev-css'));
  watch(['src/images/**', 'src/index.html'], () => gulp.start('dev-copy'));
});

gulp.task('dev', ['dev-js', 'dev-css', 'dev-copy']);

gulp.task('prod-js', ['dev-js'], () =>
  gulp.src('dist/dev/js/main.js')
    .pipe(closure({
      compilation_level: 'SIMPLE',
      warning_level: 'QUIET',
      language_in: 'ECMASCRIPT6_STRICT',
      language_out: 'ECMASCRIPT5_STRICT',
      js_output_file: 'main.js',
    }))
    .pipe(gulp.dest('dist/prod/js')));

gulp.task('prod-css', ['dev-css'], () =>
  gulp.src('dist/dev/css/*.css')
    .pipe(uglifycss())
    .pipe(gulp.dest('dist/prod/css')));

gulp.task('prod-copy', ['dev-copy'], () =>
  gulp.src(['dist/dev/images/**', 'dist/dev/index.html'], { base: 'dist/dev/' })
    .pipe(gulp.dest('dist/prod')));

gulp.task('prod', ['prod-js', 'prod-css', 'prod-copy']);

gulp.task('default', ['prod']);
