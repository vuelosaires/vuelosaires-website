var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var stylus = require('gulp-stylus');
var notify = require('gulp-notify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var cache = require('gulp-cache');
var pug = require('gulp-pug');

var browserify = require('browserify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// Stylus compilation

gulp.task('styles', function() {
  gulp.src('public/styl/style.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(cleanCSS({ level: 2 }))
    .pipe(gulp.dest('./dist/css/'))
    .pipe(notify({ message: 'Styles task complete' }));
});

// Image Compression

// 'images' task disabled since we're using the prismic.io image hosting for now

// gulp.task('images', function() {
//   return gulp.src('dist/img/')
//     .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
//     .pipe(gulp.dest('dist/img/'))
//     .pipe(notify({ message: 'Images task complete' }));
// });

// Browserify

gulp.task('browserify', function() {
  return browserify('public/js/index.js')
    .transform('babelify', {
      presets: ["es2015"],
      ignore: /wow\.min\.js/
    })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('bundle.js'))
    .pipe(buffer())
    // Re-activate uglify at production time,
    // de-activate it for development since it slows down the process heavily
    // .pipe(uglify())
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/js/'));
});

// Static index
gulp.task('index', function() {
  gulp.src('public/js/views/base/layout.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename('index.html'))
    .pipe(gulp.dest('./'));
});

// Default Task

gulp.task('default', function() {
    gulp.start(
      'styles',
      'index',
      'browserify',
      'watch');
});

gulp.task('watch', function() {

  // Watch .scss files
  gulp.watch(['public/**/*.styl', ], ['styles']);

  // Watch .js files
  gulp.watch(['public/js/**/*.js', 'public/**/*.pug', 'views/**/*.pug'], ['index', 'browserify']);

  // Watch image files
  gulp.watch('public/images/*', ['images']);

});