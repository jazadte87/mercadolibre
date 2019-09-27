var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    cssmin      = require('gulp-minify-css');

gulp.task('sass', function() {
	console.log("1");
	gulp.src('server/sass/main.sass')
		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(gulp.dest('client/public'))
});

gulp.task('watch', function() {
    console.log("2");
	gulp.watch('./server/sass/*.sass',['sass'])
});

gulp.task('default',['sass','watch']);


