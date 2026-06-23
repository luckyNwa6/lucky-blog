const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-html-minifier-terser');
const htmlclean = require('gulp-htmlclean');
const terser = require('gulp-terser');

// 压缩 public 目录下的 CSS
gulp.task('minify-css', () => {
  return gulp.src('./public/**/*.css')
    .pipe(cleanCSS())
    .pipe(gulp.dest('./public'));
});

// 压缩 public 目录下的 HTML
gulp.task('minify-html', () => {
  return gulp.src('./public/**/*.html')
    .pipe(htmlclean())
    .pipe(htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: false
    }))
    .pipe(gulp.dest('./public'));
});

// 压缩 public 目录下的 JS（排除可能有问题的文件）
gulp.task('minify-js', () => {
  return gulp.src([
    './public/**/*.js',
    '!./public/**/*.min.js',
    '!./public/js/dist/*.js',
    '!./public/js/twikoo.all.min.js',
    '!./public/js/av-min.js',
    '!./public/js/sw.js',
    '!./public/js/swReg.js'
  ])
    .pipe(terser({
      ecma: 5,
      compress: {
        drop_console: false,
        pure_funcs: null
      },
      output: {
        comments: false
      }
    }))
    .pipe(gulp.dest('./public'));
});

// 只压缩 CSS 和 HTML（跳过 JS）
gulp.task('minify-css-html', gulp.series(
  'minify-css',
  'minify-html'
));

// 执行压缩任务
gulp.task('default', gulp.series(
  'minify-css',
  'minify-html',
  'minify-js'
));