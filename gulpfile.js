var gulp = require('gulp');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var less = require('gulp-less');
var connect = require('gulp-connect');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemap = require('gulp-sourcemaps');
var csscomb = require('gulp-csscomb');
var cssmin = require('gulp-cssmin');
var changed = require('gulp-changed');
var notify = require('gulp-notify');
var spritesmith = require('gulp.spritesmith');
var del = require('del');
var retinasprites = require('gulp-retina-sprites');
var replace = require('gulp-replace');

// less plugin
var lessAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new lessAutoprefix({
    browers : ['last 2 version']
})

// image compression
var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

// port, paths
var port = '10003';
var path = {
    dist: 'www/',
    dist_css: 'www/css/',
    dist_js: 'www/js/',
    dist_images: 'www/images/',
    html: ['dev/**/*.html'],
    less: ['dev/**/*.less'],
    js: ['dev/js/**/*.js'],
    images: ['dev/images/sprite.png', 'dev/images/*.{png,jpeg,jpg,svg,gif}'],
    //etc: ['dev/**/*', '!dev/layout/**/*', '!dev/**/*.html', '!dev/**/*.less', '!dev/**/*.js']
};

var onError = function(err) {
	notify.onError({
		title: "Gulp",
		subtitle: "Failure!",
		message: "Error: <%= error.message %>",
		sound: "Beep"
	})(err);
	this.emit('end');
};

gulp.task('html', function(){
	return gulp.src(path.html)
		.pipe(plumber({errorHandler: onError}))
		.pipe(changed(path.dist, {extension: '.html'}))
		.pipe(gulp.dest(path.dist));
});

// Styles for less
gulp.task('styles', function () {
    console.log('starting styles task');
    return gulp.src('dev/less/styles.less')
        .pipe(plumber(function(err){
            console.log('Styles Task Error');
            console.log(err);
            this.emit('end');
        }))
        //.pipe(sourcemap.init())
        .pipe(less({
            plugins:[lessAutoprefix]
        }))
		.pipe(csscomb())
		.pipe(cssmin({
			restructuring: false,
			keepBreaks: true,
			advanced: true,
			aggressiveMerging: true,
			keepSpecialComments: "*",
			compatibility: 'ie7'
		}))
        //.pipe(sourcemap.write())
        .pipe(gulp.dest(path.dist_css))
        .pipe(livereload());
});

// image sprites
gulp.task('sprite', function(){
    var spriteData = gulp.src('dev/images/sp/*.png')
    .pipe(spritesmith({
        //retinaSrcFilter : ['*_2x.png'],
        imgName : 'sprite.png',
        imgPath : '/images/sprite.png',
        //retinaImgName : 'sprite_2x.png',
        padding : 10,
        cssName : '_sprite.less',
        cssFormat : 'less'
    }));
    spriteData.img.pipe(gulp.dest('dev/images/'));  //sprite.png이미지 생성
    spriteData.css
        .pipe(replace(/^\.icon-/gm, '.'))
        .pipe(gulp.dest('dev/less/'));   //spirte.css 생성
});

// image retina sprites __test중
gulp.task('retina', function(){
    var spriteData2x = gulp.src('dev/images/sp_2x/*_2x.png')
    .pipe(retinasprites({
        retinaSrcFilter : '*_2x.png',
        retinaImgName : 'sprite_2x.png',
        padding : 10,
        cssName : '_sprite_2x.less'
    }));
    spriteData2x.img.pipe(gulp.dest('dev/images/'));  //sprite.png이미지 생성
    spriteData2x.css.pipe(gulp.dest('dev/less/'));   //spirte.css 생성
});

// image compress
gulp.task('images', function(){
	return gulp.src(path.images)
		.pipe(changed(path.dist_images))
        /*.pipe(imagemin(
            [
                imagemin.gifsicle(),
                imagemin.jpegtran(),
                imagemin.optipng(),
                imagemin.svgo(),
                imageminPngquant(),
                imageminJpegRecompress()
            ]
        ))*/
		.pipe(gulp.dest(path.dist_images));
});

gulp.task('js', function(){
	return gulp.src(path.js)
		.pipe(changed(path.dist_js, {extension: '.js'}))
		.pipe(gulp.dest(path.dist_js));
});

gulp.task('etc', function(){
	return gulp.src(path.etc)
		.pipe(changed(path.dist))
		.pipe(gulp.dest(path.dist));
});

gulp.task('clean',function (){
    return del.sync([
        path.dist
    ])
});

gulp.task('watch', function(){
    console.log('starting watch task');
	gulp.watch(path.html, ['html']);
	gulp.watch(path.images, ['sprite']);
	gulp.watch(path.images, ['images']);
	gulp.watch(path.less, ['styles']);
	gulp.watch(path.js, ['js']);
	gulp.watch(path.etc, ['etc']);
});

gulp.task('connect', function(){
	connect.server({
		root: path.dist,
		port: port
	});
});

gulp.task('build', ['clean', 'watch', 'html', 'sprite', 'images', 'styles', 'js'], function(){
    console.log('starting watch default task');
});

gulp.task('default', ['watch', 'html', /*'sprite', 'images',*/ 'styles', 'js'], function(){
    console.log('starting watch default task'); //infinit loop때문에 sprite와 default를 구분했습니다. sprite이미지 추가시 gulp sprite를 먼저해주시고 default로 watch해주세요.
});

gulp.task('all', ['html_all', 'css_all'], function(){
});
