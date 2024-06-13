module.exports = {
    js: {
        src: 'src/js/**/*.js',
        dest: 'dist/assets/scripts/',
        libs: 'vendor.min.js'
    },
    scss: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/assets/css/',
    },
    css: {
        dest: './dist/assets/css/',
        style: 'style.min.css',
    },
    images: {
        src: 'src/images/**/*.{png,jpg,gif}',
        dest: 'dist/assets/images/',
    },
    pug: {
        src: 'src/pug/**/*.pug',
        pages: 'src/pug/pages/**/*.pug',
        dest: 'dist/',
    },
    favicon: {
        src: 'src/favicon/favicon.png',
        dest: 'dist/favicon/',
        path: 'favicon/',
        html: 'dist/*.html'
    },
    fonts: {
        src: './src/fonts/**/*',
        dest: './dist/assets/fonts/'
    },
    dist: './dist/',
};
