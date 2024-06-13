module.exports = function () {
    $.gulp.task('watch', function () {
        $.gulp.watch($.paths.scss.src, $.gulp.series('styles:sass', 'compress:css'));
        $.gulp.watch($.paths.js.src, $.gulp.series('copy:js'));
        $.gulp.watch($.paths.images.src, $.gulp.series('img:default'));
        $.gulp.watch($.paths.pug.src, $.gulp.series('pug:default'));

        // // $.gulp.watch('./src/static/img/svg/*.svg', $.gulp.series('svg'));
        // $.gulp.watch('./src/static/js/**/*.js', $.gulp.series('libsJS:dev', 'js:copy'));
        // $.gulp.watch('./src/static/fonts/**/*.*', $.gulp.series('fonts'));
        // $.gulp.watch(['./src/static/img/general/**/*.{png,jpg,gif}',
        //              './src/static/img/content/**/*.{png,jpg,gif}'], $.gulp.series('img:dev'));
        // $.gulp.watch('./src/static/img/sprites/**/*.*', $.gulp.series('sprite'));
        // $.gulp.watch('./src/static/img/general/**/*.svg', $.gulp.series('svg:copy'));
        // $.gulp.watch('./build/**/*.html', { usePolling: true }, $.gulp.registry().get('htmlIndex'));
    });
};
