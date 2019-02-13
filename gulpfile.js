var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
var     del             = require('del');


var path = {
    build: {
        dist: 'dist/',
        css: 'dist/assets/css/',
        images: 'dist/assets/images/'
    },
    src: {
        scss: 'src/scss/',
        images: 'src/images/'
    }
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'images'], function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(path.src.scss + '**/*.scss', ['sass']);
    gulp.watch(path.src.images + '*', ['images']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
});

gulp.task('images', function () {
    gulp.src(path.src.images + '*')
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.images))
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(path.src.scss + '**/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Styles',
                    message: err.message
                }
            })
        }))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe( autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }) )
        .pipe(sourcemaps.write('.') )
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

// Clean
gulp.task('clean', function(cb) {
    del([path.build.dist], cb);
});

gulp.task('default', ['serve']);