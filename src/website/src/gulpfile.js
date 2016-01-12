var gulp  = require('gulp'),


jshint     = require('gulp-jshint'),
sass       = require('gulp-sass'),
concat     = require('gulp-concat'),
sourcemaps = require('gulp-sourcemaps'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
minifycss = require('gulp-notify'),
rename = require('gulp-rename'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
browserSync = require('browser-sync');
reload      = browserSync.reload;


input  = {
  'sass': 'sass/**/*.scss',
  'javascript': 'js/**/*.js',
  'images': 'img/**',
},

output = {
  'stylesheets': 'css/build/',
  'javascript': 'js/build/',
  'images': 'img/'
};

/* run the watch task when gulp is called without arguments */
gulp.task('default', ['watch']);

/* run javascript through jshint */
gulp.task('jshint', function() {
  return gulp.src(input.javascript)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});

/* compile scss files */
gulp.task('watch-css', function() {
  return gulp.src('sass/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    errLogToConsole: true,
    sourceComments : 'normal'
  }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(output.stylesheets))
  .pipe(reload({stream: true}));

});

// Set the proxy.
// Set the proxy.
gulp.task('browser-sync', function () {
  browserSync({
    proxy: "https://localhost/acronym/"
  });
});

gulp.task('build-css', function() {
  return gulp.src('sass/**/*.scss')
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(gulp.dest(output.stylesheets))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest(output.stylesheets))
});





/* concat javascript files, minify if --type production */
gulp.task('build-js', function() {
  return gulp.src(input.javascript)
  .pipe(sourcemaps.init())
  .pipe(concat('bundle.js'))
      //only uglify if gulp is ran with '--type production'
      .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(output.javascript));
    });

/* Watch these files for changes and run the task on update */
gulp.task('watch', function() {
  gulp.watch(input.javascript, ['jshint', 'build-js', browserSync.reload]);
  gulp.watch(input.sass, ['watch-css', browserSync.reload]);
});

gulp.task('default',['browser-sync'], function() {
  gulp.start('watch');
});