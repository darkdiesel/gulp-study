module.exports = function () {
    $.gulp.task('img:default', () => {
        return $.gulp.src($.paths.images.src)
            .pipe(
                $.gp.cache(
                    // $.gp.imagemin({
                    //     progressive: true,
                    //     svgminPlugins: [{removeViewBox: true}],
                    //     use: [$.imageminPngquant()]
                    // })
                    $.gp.imagemin([
                        // png
                        $.gp.imageminPngquant({
                            speed: 1,
                            quality: [0.8, 0.9] //lossy settings
                        }),
                        $.gp.imageminZopfli({
                            more: true
                            // iterations: 50 // very slow but more effective
                        }),
                        //gif
                        $.gp.imagemin.gifsicle({
                            interlaced: true,
                            optimizationLevel: 3
                        }),
                        //gif very light lossy, use only one of gifsicle or Giflossy
                        // $.gp.imageminGiflossy({
                        //     optimizationLevel: 3,
                        //     optimize: 3, //keep-empty: Preserve empty transparent frames
                        //     lossy: 2
                        // }),
                        //svg
                        $.gp.imagemin.svgo({
                            plugins: [{
                                removeViewBox: false
                            }]
                        }),
                        //jpg lossless
                        // $.gp.imagemin.jpegtran({
                        //     progressive: true
                        // }),
                        // jpg very light lossy, use vs jpegtran
                        $.imageminMozjpeg({
                            quality: 90,
                            progressive: true
                        })
                    ])
                )
            )
            .pipe($.gulp.dest($.paths.images.dest))
            // .pipe($.gp.notify({'message': 'Images generated'}))
            .pipe($.browserSync.stream());
    });
};