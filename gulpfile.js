// load all plug-ins
const { watch, src, dest, series } = require('gulp');
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
exports.default = series(copyHtml, images, fonts, styles, scripts, function(){
	browserSync.init({
		server: './dist'
	});
});
watch('sass/**/*.scss', styles);
watch('js/**/*.js', scripts);
watch('img/**', images);
watch('fonts/**', fonts);
watch('*.html', copyHtml);
watch('./dist/index.html').on('change', browserSync.reload);

// converting, concatinating and saving the Javascript to the dist folder
// Standard Javascript task for live editing
function scripts() {
	return src('js/**/*.js')
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(dest('dist/js'));
}

// more time-intensive task only for distribution
// in addition to standard js task: minimizes
function scriptsDist() {
	return src('js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(dest('dist/js'));
}
// copies the HTML to the dist folder
function copyHtml() {
	return src('./*.html')
			.pipe(dest('./dist'));
}
// optimizes the images and saves them to the dist folder
function images() {
	return src('img/*')
		  .pipe(dest('dist/img'));

}
function fonts() {
	return src('fonts/*')
	   .pipe(dest('dist/fonts'));
}
// converts SASS to CSS, adds prefixes and saves the files to the dist folder
function styles() {
	return src('sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			cascade: false
		}))
		.pipe(dest('dist/css'))
		.pipe(browserSync.stream());
}

// call this when you're ready for distribution!
exports.dist = series(copyHtml, images, styles, scriptsDist);
