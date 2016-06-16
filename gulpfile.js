'use strict';
var cfg = require('./config');

var gulp            = require('gulp');
var browserify      = require('browserify');
var babelify        = require('babelify');
var watchify        = require('watchify');
var source          = require('vinyl-source-stream');
var gulpif          = require('gulp-if');
var uglify          = require('gulp-uglify');
var streamify       = require('gulp-streamify');
var sass            = require('gulp-sass');
var cleanCSS        = require('gulp-clean-css');
var uncss           = require('gulp-uncss');
var sourcemaps      = require('gulp-sourcemaps');
var autoprefixer    = require('gulp-autoprefixer');
var plumber         = require('gulp-plumber');
var del             = require('del');

var vendors = [
    'react',
    'react-dom',
    'react-router',
    'react-cookie'
];

///////////////////////////////////
// Styling
///////////////////////////////////

gulp.task('sass', function() {
	return gulp.src('./src/sass/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', sass.logError))
		.pipe(autoprefixer({browser: ['last 2 versions', 'ie 8', 'ie 9', '> 1%'], cascade: false}))
		.pipe(gulp.dest('./.tmp/css'))
});

gulp.task('style', ['sass'], function() {
	return gulp.src('./.tmp/css/**/*.css')
		.pipe(plumber())
		.pipe(sourcemaps.init())
		//.pipe(gulpif(cfg.isProduction, uncss({
		//	html: ['public/**/*.html'],
		//	ignore: [new RegExp('\.is-.*')]
		//})))
		.pipe(gulpif(cfg.isProduction, cleanCSS({
			advanced: true,
            keepSpecialComments: 0,
            removeDuplicates: true,
            mergeAdjacent: true,
            reduceNonAdjacent: true,
            restructure: true,
            removeDuplicateMediaQueries: true,
            mergeMediaQueries: true
		})))
		.pipe(sourcemaps.write(cfg.isProduction ? '.' : null))
		.pipe(gulp.dest('./build/css'));
});


///////////////////////////////////
// Javascript
///////////////////////////////////

gulp.task('browserify:vendors', function () {
    browserify({
		require: vendors,
		debug: !cfg.isProduction // We also add sourcemapping
	})
    .bundle()
	.pipe(source('vendors.js'))
    .pipe(gulpif(cfg.isProduction, streamify(uglify())))
	.pipe(gulp.dest('./build/js'));
});

gulp.task('browserify:app', function () {
    var bundler = browserify({
        entries: './src/app/app.js',
		debug: !cfg.isProduction, // We also add sourcemapping
		// These options are just for Watchify
        cache: {}, packageCache: {}, fullPaths: !cfg.isProduction
	})
    .external(vendors) // Do not include react
    .transform("babelify", {presets: ["es2015", "react"]});
    
    var rebundle = function() {
		bundler.bundle()
			.pipe(source('main.js'))
			.pipe(gulpif(cfg.isProduction, streamify(uglify())))
			.pipe(gulp.dest('./build/js'));
	};

    if(!cfg.isProduction){
        //bundler = watchify(bundler);
		//bundler.on('update', rebundle);
    }
    return rebundle();
});

gulp.task('browserify', ['browserify:vendors', 'browserify:app']);

///////////////////////////////////
// Tasks
///////////////////////////////////

gulp.task('default', ['style', 'browserify'], function () {
    gulp.start('clean:tmp');
});

gulp.task('clean:tmp', function () {
    del.sync(['./.tmp']);
});

gulp.task('clean:build', function () {
    del.sync(['./build']);
});

gulp.task('clean', ['clean:tmp', 'clean:build']);