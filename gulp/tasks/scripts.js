module.exports = function () {
    let npmPlugins = [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/@popperjs/core/dist/umd/popper.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
    ];
    
    $.gulp.task('copy:js', function () {
        return $.gulp.src($.paths.js.src)
            .pipe($.gp.uglify())
            .pipe($.gp.rename({suffix: '.min'}))
            .pipe($.gulp.dest($.paths.js.dest))
            .pipe($.browserSync.stream());
    });

    $.gulp.task('copy:js:libs', function () {
        _npmPlugins = [];

        npmPlugins.forEach(function (npmPLugin) {
            if ($.fs.existsSync(npmPLugin)) {
                _npmPlugins.push(npmPLugin);
              } else {
                console.warn('FILE ' + npmPLugin + ' DOES NOT EXIST');
              }
        });

        return $.gulp.src(_npmPlugins)
            .pipe($.gp.concat($.paths.js.libs))
            .pipe($.gp.uglify())
            .pipe($.gulp.dest($.paths.js.dest))
            .pipe($.browserSync.stream());
    });
};
