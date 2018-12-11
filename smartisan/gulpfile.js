// 编写gulp管理文件的任务的
// EMCA6 const 声明"常量" (这个变量一旦被声明，就没有办法被修改)
const gulp = require("gulp");

//拷贝html文件
gulp.task("copy-html", function(){
	return gulp.src("index.html")
	.pipe(gulp.dest("dist"))
	.pipe(connect.reload());
})
gulp.task("copy-html1", function(){
	return gulp.src("html/*.html")
	.pipe(gulp.dest("dist/html"))
	.pipe(connect.reload());
})
//拷贝图片
gulp.task("images", function(){
	return gulp.src("images/**/*")
	.pipe(gulp.dest("dist/images"))
	.pipe(connect.reload());
})

//数据
gulp.task("data", function(){
	return gulp.src("data/*.json")
	.pipe(gulp.dest("dist/data"))
	.pipe(connect.reload());
})

//js文件
gulp.task("scripts", function(){
	return gulp.src("js/*.js")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})
//php文件
gulp.task("php", function(){
	return gulp.src("js/*.php")
	.pipe(gulp.dest("dist/js"))
	.pipe(connect.reload());
})

//建立工程
gulp.task("build", ['copy-html','copy-html1', 'images', 'scripts', 'data', 'scss','php'], function(){
	console.log('工程建立成功');
})

//scss文件 gulp-sass-china(windows)  gulp-scss
const scss = require("gulp-sass-china");
const minifyCSS = require("gulp-minify-css");
const rename = require("gulp-rename");
gulp.task('scss', function(){
	return gulp.src("stylesheet/*.scss")
	.pipe(scss())
	.pipe(gulp.dest("dist/css"))
	// .pipe(minifyCSS())
	// .pipe(rename("index.min.css"))
	// .pipe(gulp.dest("dist/css"))
	.pipe(connect.reload());
})

/*
	gulp监听
 */

gulp.task("watch", function(){

	gulp.watch("index.html", ['copy-html']);
	gulp.watch("html/*.html",['copy-html1']);
	gulp.watch("images/**/*", ['images']);
	gulp.watch("data/*.json", ['data']);
	gulp.watch("js/*.js", ['scripts']);
	gulp.watch("stylesheet/*.scss", ['scss']);
	gulp.watch('js/*.php',['php']);

})

/*
	启动服务

 */
const connect = require("gulp-connect");
gulp.task("server", function(){
	connect.server({
		root: 'dist', 
		port: 8888,
		livereload: true //设置实时刷新
	})
})


// 默认任务
gulp.task("default", ['watch', 'server']);
