var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var path = require('path');
var eslint = require('gulp-eslint');
var postcss = require('gulp-postcss');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglifyjs');
var reload = browserSync.reload;

gulp.task('sass:ui', function () {
    return gulp.src(['src/shared/styles/ui-theme.scss', 'bower_components/mesh/dist/mesh.css'])
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'expanded' // nested, compact, compressed, expanded
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('minifyCSS', function() {
    return gulp.src(['dist/**/*.css', '!dist/**/*.min.css'])
        .pipe($.cssnano())
        .pipe($.rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist/'));
});



// Start a BrowserSync server, which you can view at http://localhost:3040
gulp.task('browser-sync', function () {
    browserSync.init({
        port: 3040,
        startPath: '/index.html',
        server: {
            baseDir: [
                // base path for views and demo assets
                'views/',
                'dist/',
                // root folder for everything else
                './'
            ],
            middleware: [
                function(req, res, next) {
                    var redirectTo;

                    switch (req.url) {
                        case '/':
                            redirectTo = '/index.html';
                            break;
                    }

                    if (redirectTo) {
                        res.writeHead(301, {Location: redirectTo});
                        res.end();
                    } else {
                        next();
                    }
                }
            ]
        },
        bsFiles: {
            src: [
                'dist/**/*.css',
                'dist/**/*.js',
                'views/*.html'
            ]
        }
    });
});

gulp.task('minifyJS', function() {
    gulp.src(['bower_components/tiny.js/dist/tiny.js', 'bower_components/chico/dist/ui/chico.js'])
        .pipe(uglify('app.min.js', {
            outSourceMap: true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('copyAssets', function () {
    // Everything in the assets folder
    return gulp
        .src('bower_components/chico/dist/assets/*.*')
        .pipe(gulp.dest('./dist/assets'));
});

// Build all files without starting a server
gulp.task('build', function (done) {
    runSequence([
        'copyAssets',
        'sass:ui',
        'minifyJS'
    ], done);
});