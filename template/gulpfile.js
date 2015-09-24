var gulp = require('gulp'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
	minifyCSS = require('gulp-minify-css'),
	imagemin = require('gulp-imagemin');

gulp.task('begin', function() {
    console.log('+++++++++++begin+++++++++++');
});

gulp.task('end', function() {
    console.log('+++++++++++end+++++++++++');
});

gulp.task('min-js', function() {
    gulp.src(['js/**/*.js', '!js/**/*.min.js'])	//选择文件，传入参数是文件路径
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/js/'));	//输出文件
});

gulp.task('concat-js', function() {
    gulp.src('js/*.js') //选择文件，传入参数是文件路径
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .pipe(uglify())
      .pipe(concat('app.min.js'))
      .pipe(gulp.dest('dist/js/')); //输出文件
});

gulp.task('lint-js', ['begin'], function() {
    gulp.src('js/*.js') //选择文件，传入参数是文件路径
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

gulp.task('auto', function() {
	// 监听文件修改，当文件被修改则执行 uglify-js 任务
    gulp.watch('js/*.js', ['min-js']);
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 script 任务和 auto 任务
gulp.task('default',['min-js', 'auto']);

gulp.task('min-css', function() {
    gulp.src('css/*.css')
      .pipe(minifyCSS())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('dist/css/'));
});

gulp.task('min-img', function() {
    gulp.src('img/*.*')
      .pipe(imagemin({progressive: true}))
      .pipe(gulp.dest('dist/img/'));
});