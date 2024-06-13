global.$ = {
    tasks: require('./gulp/tasks.js'),
    paths: require('./gulp/paths'),
    gulp: require('gulp'),
    del: require('del'),
    sass: require('gulp-sass')(require('sass')),
    //buffer: require('vinyl-buffer'),
    //merge: require('merge-stream'),
    fs: require('fs'),
    //ld: require('lodash'),
    browserSync: require('browser-sync').create(),
    //imagemin: require('gulp-imagemin'),
    imageminPngquant: require('imagemin-pngquant'),
    imageminZopfli: require('imagemin-zopfli'),
    imageminMozjpeg: require('imagemin-mozjpeg'), //need to run 'brew install libpng'
    // imageminGiflossy: require('imagemin-giflossy'),
    gp: require('gulp-load-plugins')({
        // true is the default value
        overridePattern: true,
        pattern: ['gulp-*', 'gulp.*', '@*/gulp{-,.}*', 'imagemin-pngquant', 'imagemin-zopfli', 'imagemin-giflossy', 'imagemin-mozjpeg']
    }),
    //serve: require('gulp-serve'),
    cfg: require('./gulp/config.json')
};

$.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('build', $.gulp.series(
    'clean:default',
    $.gulp.parallel('styles:sass', 'pug:default', 'copy:js', 'img:default', 'copy:js:libs', 'copy:fonts'),
    $.gulp.parallel('compress:css'),
    )
);

$.gulp.task('dev', $.gulp.series(
    'build'
    )
);

$.gulp.task('favicon', $.gulp.series('clean:favicon', 'generate-favicon'));

$.gulp.task('default', $.gulp.series(
    'dev',
    $.gulp.parallel(
        'watch',
        'serve'
    )
));