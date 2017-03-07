import gulp from 'gulp';
import { gulp as closure } from 'google-closure-compiler';
import connect from 'gulp-connect';
import del from 'del';
import rework from 'gulp-rework';
import reworkNpm from 'rework-npm';
import uglifycss from 'gulp-uglifycss';
import webpack from 'webpack-stream';

gulp.task('clean', () =>
 del(['dist', 'npm-debug.log']));

gulp.task('superclean', ['clean'], () =>
 del(['node_modules']));

gulp.task('dev-js', () =>
  gulp.src('src/js/*.js')
    .pipe(webpack({
      output: {
        filename: 'main.js' },
      devtool: 'source-map',
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
        }],
      },
    }))
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

gulp.task('dev', ['dev-js', 'dev-css', 'dev-copy']);

gulp.task('connect', () =>
  connect.server({
    root: 'dist/dev',
    livereload: true,
    port: 9100,
  }));

gulp.task('livereload', () =>
  gulp.watch(['dist/dev/**'], () =>
    gulp.src(['dist/dev/**']).pipe(connect.reload())));

gulp.task('watch', ['dev'], () => {
  gulp.watch('src/js/**/*.js', () => gulp.start('dev-js'));
  gulp.watch('src/css/**/*.css', () => gulp.start('dev-css'));
  gulp.watch(['src/images/**', 'src/index.html'], () => gulp.start('dev-copy'));
});

gulp.task('livedev', ['connect', 'livereload', 'watch']);

gulp.task('prod-js', ['dev-js'], () =>
  gulp.src('dist/dev/js/main.js')
    .pipe(closure()({
      compilation_level: 'SIMPLE',
      warning_level: 'QUIET',
      // language_in: 'ECMASCRIPT7',
      language_in: 'ECMASCRIPT5_STRICT',
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

gulp.task('default', ['livedev']);
