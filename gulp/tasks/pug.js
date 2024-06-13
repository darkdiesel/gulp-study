module.exports = function () {
    $.gulp.task('pug:default', function(){
        return $.gulp.src($.paths.pug.pages)
            .pipe($.gp.plumber({
                errorHandler: $.gp.notify.onError(function (err) {
                    return {
                        title: 'Pug',
                        message: err.message
                    }
                })
            }))
            .pipe($.gp.pug({
                pretty: true
            }))
            .pipe($.gulp.dest($.paths.pug.dest))
            //.pipe(notify({'message': 'PUG generated'}))
            .pipe($.browserSync.stream());
    });
};