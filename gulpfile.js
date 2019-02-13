var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var pug = require('gulp-pug');
var runSequence = require('run-sequence');


var path = {
    build: {
        dist: 'dist/',
        css: 'dist/assets/css/',
        js: 'dist/assets/scripts/',
        images: 'dist/assets/images/'
    },
    src: {
        scss: 'src/scss/',
        js: 'src/js/',
        images: 'src/images/',
        pug: 'src/pug/'
    }
};

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'images', 'pug', 'copy:js'], function () {

    browserSync.init({
        server: "./dist"
    });

    gulp.watch(path.src.scss + '**/*.scss', ['sass']);
    gulp.watch(path.src.js + '**/*.js', ['copy:js']);
    gulp.watch(path.src.images + '*', ['images']);
    gulp.watch(path.src.pug + '**/*.pug', ['pug']);
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
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

gulp.task('copy:js', function () {
    return gulp.src(path.src.js + '**/*.js')
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src(path.src.images + '*')
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.images))
        .pipe(browserSync.stream());
});

gulp.task('pug', function () {
    return gulp.src(path.src.pug + 'pages/**/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function (err) {
                return {
                    title: 'Pug',
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest(path.build.dist))
        .pipe(browserSync.stream());
});

// Clean
gulp.task('clean', function (cb) {
    return del([path.build.dist + '*'], cb).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'))
    });
});

// cb = callback
gulp.task('default', function (cb) {
    runSequence(
        'clean',
        'serve',
        cb
    );
});