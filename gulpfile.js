var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var compass = require('gulp-compass');
var jade = require('gulp-jade');
var plumber = require('gulp-plumber');


gulp.task('serve', ['jade','compass'], function() {

		browserSync.init({
				server: "./production"
		});

		gulp.watch("./src/sass/*.sass", ['compass']);
		gulp.watch("./src/jade/*.jade", ['jade']);
		gulp.watch("./production/*.html").on('change', browserSync.reload);
});



gulp.task('jade', function(){
	return gulp.src('./src/jade/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('./production'))
		.pipe(browserSync.stream());
});


gulp.task('compass', function() {
	gulp.src('./src/sass/*.sass')
		.pipe(compass({
			css: './production/css',
			sass: './src/sass',
			image: './src/img'
		}))
		.pipe(plumber({
			errorHandler: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('./production/css'))
		.pipe(browserSync.stream());
});




gulp.task('default', ['serve']);