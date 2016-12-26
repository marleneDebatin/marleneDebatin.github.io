// load all plug-ins
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
// var imagemin = require('gulp-imagemin');
// var pngquant = require('imagemin-pngquant');

// default task is executed everytime you type gulp in the command line
// calls the task in the array after executing
gulp.task('default', ['copy-html', 'images', 'styles', 'scripts'], function() {
	// watches your files for changes and calls the respective tasks
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('js/**/*.js', ['scripts']);
	gulp.watch('img/**', ['images']);
	gulp.watch('*.html', ['copy-html']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);

	browserSync.init({
		server: './dist'
	});
});
// call this when you're ready for distribution!
gulp.task('dist', [
	'copy-html',
	'images',
	'styles',
	'scripts-dist'
]);
// converting, concatinating and saving the Javascript to the dist folder
// Standard Javascript task for live editing
gulp.task('scripts', function() {
	gulp.src('js/**/*.js')
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist/js'));
});
// more time-intensive task only for distribution
// in addition to standard js task: minimizes
gulp.task('scripts-dist', function() {
	gulp.src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('dist/js'));
});
// copies the HTML to the dist folder
gulp.task('copy-html', function() {
	gulp.src('./*.html')
		.pipe(gulp.dest('./dist'));
});
// optimizes the images and saves them to the dist folder
gulp.task('images', function() {
	gulp.src('img/*')
		// .pipe(imagemin({
		//             progressive: true,
		//             use: [pngquant()]
		//         }))
		  .pipe(gulp.dest('dist/img'));
	  gulp.src('fonts/*')
	  	.pipe(gulp.dest('dist/fonts'));
});
// converts SASS to CSS, adds prefixes and saves the files to the dist folder
gulp.task('styles', function() {
	gulp.src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
});
