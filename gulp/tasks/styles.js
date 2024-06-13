module.exports = function () {
    $.gulp.task('styles:sass', function(){
        return $.gulp.src($.paths.scss.src)
            .pipe($.gp.plumber({
                errorHandler: $.gp.notify.onError(function (err) {
                    return {
                        title: 'Styles scss',
                        message: err.message
                    }
                })
            }))
            .pipe($.gp.sourcemaps.init({loadMaps: true}))
            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.gp.autoprefixer({
                cascade: false
            }))
            .pipe($.gp.sourcemaps.write('.'))
            .pipe($.gulp.dest($.paths.scss.dest))
            //.pipe($.gp.notify({'message': 'Scss generated'}))
            .pipe($.browserSync.stream());
    });

    $.gulp.task('compress:css', () => {
        //return $.gulp.src([$.paths.css.dest + '**/*.css', '!' + $.paths.css.dest + '**/*.min.css'])
        return $.gulp.src($.paths.css.dest + '**/*.css')
            .pipe($.gp.filter(['**/*.css', '!**/*.min.css'], {restore: true}))
            //.pipe($.gp.concatCss($.paths.css.style))
            .pipe($.gp.csso())
            .pipe($.gp.rename({ suffix: '.min' }))
            .pipe($.gulp.dest($.paths.css.dest))
            .pipe($.browserSync.stream());
    });
};
