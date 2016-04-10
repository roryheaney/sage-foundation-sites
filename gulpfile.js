'use strict';
// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    merge  = require('merge-stream'),
    browserSync = require('browser-sync').create(),
    bless = require('gulp-bless'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    sourcemaps = require('gulp-sourcemaps'),
    // livereload = require('gulp-livereload'),
    del = require('del'),
    sftp = require('gulp-sftp');

var onError = function (error) {
    gutil.beep();
    notify({
        title: 'Gulp Task Error',
        message: 'Check the console.'
    }).write(error);
    console.log(error.toString());
    this.emit('end');
};


// browswer sync
gulp.task('browser-sync', function() {
    browserSync.init({
        proxy: "http://localhost:8888/pfj_blog/"
    });
});

// sass
gulp.task('sass', function () {
  gulp.src('assets/styles/**/*.scss')
    // .pipe(sass.sync().on('error', sass.logError))
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(sourcemaps.init())
    .pipe(sass.sync())
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest('dist/ie'))
    .pipe(sourcemaps.write('/maps'))
    //.pipe(rename({ suffix: '.min' }))
    // .pipe(minifycss())
    .pipe(gulp.dest('dist/styles'))//.on('change', browserSync.reload)
    .pipe(browserSync.stream({match: '**/*.css'}))
    .pipe(notify({ message: 'sass task complete' }));
});


//bless the css
gulp.task('blessed', function () {
    gulp.src('dist/ie/main.css')
        .pipe(bless())
        .pipe(gulp.dest('dist/ie/'))
        .pipe(notify({ message: 'blessed, POW POW' }));
});


 
//jshint
gulp.task('jshintAction', function () {
    return gulp.src([
        'assets/scripts/components/*.js',
        'assets/scripts/*.js'
    ])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});


// Scripts
gulp.task('scripts', function() {
    return gulp.src([
        'bower_components/foundation/js/foundation.min.js',
        'bower_components/flexslider/jquery.flexslider-min.js',
        'bower_components/picturefill/src/picturefill.js',
        'bower_components/moment/min/moment.min.js',
        'assets/scripts/components/*.js',
        'assets/scripts/main.js'
    ])
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    //.pipe(rename({ suffix: '.min' }))
    //.pipe(uglify())
    .pipe(gulp.dest('dist/scripts'))//.on('change', browserSync.reload)
    .pipe(notify({ message: 'Scripts task complete' }));
});


// wiredep
// gulp.task('wiredep', function() {
//   var wiredep = require('wiredep').stream;
//   return gulp.src('assets/styles/main.scss')
//     .pipe(wiredep())
//     .pipe(gulp.dest('css'));
// });

// Images
gulp.task('images', function() {
    return gulp.src('assets/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/images'));
    //.pipe(notify({ message: 'Images task complete' }));
});

// DEV TEMP Images
gulp.task('tempImages', function () {
    return gulp.src('temp/img/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/temp/img'));
    //.pipe(notify({ message: 'Images task complete' }));
});

// Clean
gulp.task('clean', function(cb) {
    del(['dist/*'], cb)
});

gulp.task('copy', function() {
    gulp.src([
        'bower_components/foundation/js/foundation.min.js', 
        'bower_components/foundation/js/vendor/modernizr.js', 
        'bower_components/foundation/js/vendor/jquery.js'
      ])
        .pipe(gulp.dest('dist/scripts/'));
    gulp.src([
        'temp/**/*'
      ])
        .pipe(gulp.dest('dist/temp/'));
    gulp.src([
        'assets/fonts/*'
      ])
        .pipe(gulp.dest('dist/fonts/'));
});


// Default task
gulp.task('default', ['sass', 'scripts', 'images','copy','blessed'], function() {
    // gulp.task('sass', 'scripts', 'images','copy');
});

// Watch
gulp.task('watch', ['browser-sync'], function() {

  // Watch .scss files
    //gulp.watch('assets/styles/**/*.scss', ['sass']).on('change', browserSync.reload);
    gulp.watch('assets/styles/**/*.scss', ['sass']);

  // Watch .js files
  //gulp.watch('assets/scripts/**/*.js', ['jshintAction', 'scripts']).on('change', browserSync.reload);
  gulp.watch('assets/scripts/**/*.js', ['jshintAction', 'scripts']);

  // Watch image files
  //gulp.watch('assets/images/**/*', ['images']).on('change', browserSync.reload);
  gulp.watch('assets/images/**/*', ['images']);
  //gulp.watch('temp/img/*', ['tempImages']);

    //watch markup files
  gulp.watch('*.php').on('change', browserSync.reload);
  gulp.watch('templates/*.php').on('change', browserSync.reload);
  gulp.watch('partials/*.php').on('change', browserSync.reload);
  gulp.watch('partials/*/*.php').on('change', browserSync.reload);
  // Create LiveReload server
  // livereload.listen();

  // Watch any files in dist/, reload on change
  gulp.watch(['dist/scripts/*']).on('change', browserSync.reload);

});
