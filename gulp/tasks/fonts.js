module.exports = function () {
    let npmFonts = [
        'node_modules/@fortawesome/fontawesome-free/webfonts/**/*',
        $.paths.fonts.src
    ];

    $.gulp.task('copy:fonts', () => {
        return $.gulp.src(npmFonts)
            .pipe($.gulp.dest($.paths.fonts.dest));
    });
};
