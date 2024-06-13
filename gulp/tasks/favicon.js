module.exports = function () {
    // File where the favicon markups are stored
    var FAVICON_DATA_FILE = 'dist/faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
    $.gulp.task('generate-favicon', function (done) {
        $.gp.realFavicon.generateFavicon({
            masterPicture: $.paths.favicon.src,
            dest: $.paths.favicon.dest,
            iconsPath: $.paths.favicon.path,
            design: {
                ios: {
                    pictureAspect: 'noChange',
                    assets: {
                        ios6AndPriorIcons: false,
                        ios7AndLaterIcons: false,
                        precomposedIcons: false,
                        declareOnlyDefaultIcon: true
                    }
                },
                desktopBrowser: {},
                windows: {
                    pictureAspect: 'noChange',
                    backgroundColor: '#5e5e5e',
                    onConflict: 'override',
                    assets: {
                        windows80Ie10Tile: false,
                        windows10Ie11EdgeTiles: {
                            small: false,
                            medium: true,
                            big: false,
                            rectangle: false
                        }
                    }
                },
                androidChrome: {
                    pictureAspect: 'noChange',
                    themeColor: '#ffffff',
                    manifest: {
                        display: 'standalone',
                        orientation: 'notSet',
                        onConflict: 'override',
                        declared: true
                    },
                    assets: {
                        legacyIcon: false,
                        lowResolutionIcons: false
                    }
                },
                safariPinnedTab: {
                    pictureAspect: 'blackAndWhite',
                    threshold: 90,
                    themeColor: '#2c3234'
                }
            },
            settings: {
                scalingAlgorithm: 'Spline',
                errorOnImageTooSmall: false,
                readmeFile: false,
                htmlCodeFile: false,
                usePathAsIs: false
            },
            markupFile: FAVICON_DATA_FILE
        }, function () {
            done();
        });
    });

// Inject the favicon markups in your HTML pages. You should run
// this task whenever you modify a page. You can keep this task
// as is or refactor your existing HTML pipeline.
    $.gulp.task('inject-favicon-markups', function () {
        return $.gulp.src([$.paths.favicon.html])
            .pipe($.gp.realFavicon.injectFaviconMarkups(JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
            .pipe($.gulp.dest($.paths.dist));
    });

// Check for updates on RealFaviconGenerator (think: Apple has just
// released a new Touch icon along with the latest version of iOS).
// Run this task from time to time. Ideally, make it part of your
// continuous integration system.
    $.gulp.task('check-for-favicon-update', function (done) {
        var currentVersion = JSON.parse($.fs.readFileSync(FAVICON_DATA_FILE)).version;
        $.gp.realFavicon.checkForUpdates(currentVersion, function (err) {
            if (err) {
                throw err;
            }
        });
    });
};