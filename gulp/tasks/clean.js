module.exports = function() {
    $.gulp.task('clean:default', () => {
        return $.del([$.paths.dist + '**/*', '!' + $.paths.dist + 'favicon{,/**}', '!' + $.paths.dist + 'faviconData.json'], {dot: true}).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'))
        });
    });

    $.gulp.task('clean:favicon', () => {
        return $.del([$.paths.dist + 'favicon/*'], {dot: true}).then(paths => {
            console.log('Deleted files and folders:\n', paths.join('\n'))
        });
    });
};
