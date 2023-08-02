const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const minify = require('gulp-minify');

function watch() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch('./public/*.html').on('change', browserSync.reload);
}

function style() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass.sync({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
}

function js() {
  return gulp.src('./src/js/**/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.stream());
};

exports.watch = watch;
exports.style = style;
exports.js = js;