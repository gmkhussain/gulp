# Gulp <img src="https://i.imgur.com/yFeBvMO.png" style="position: relative; top: 5px;" height="80" />



### Install Packages

```npm i gulp```
Gulp: https://www.npmjs.com/package/gulp


``npm i gulp-sass``
Gulp Sass: https://www.npmjs.com/package/gulp-sass

``npm i gulp-minify-css```
Gulp Minify css: https://www.npmjs.com/package/gulp-minify-css
NOTE: This package has been deprecated Please use ```gulp-clean-css```
Gulp clean css: https://www.npmjs.com/package/gulp-clean-css



```npm i gulp-autoprefixer```
Gulp Autoprefixer: https://www.npmjs.com/package/gulp-autoprefixer



```npm i gulp-htmlmin```
Gulp htmlmin: https://www.npmjs.com/package/gulp-htmlmin



```npm i gulp-uglify```
Gulp Uglify: https://www.npmjs.com/package/gulp-uglify



```npm i gulp-babel```
Gulp Babel: https://www.npmjs.com/package/gulp-babel


```npm i browser-sync```
browser-sync: https://www.npmjs.com/package/browser-sync



```npm i gulp-imagemin```
Gulp Imagemin: https://www.npmjs.com/package/gulp-imagemin




```npm i gulp-plumber```
Gulp Plumber: https://www.npmjs.com/package/gulp-plumber



```npm i pump```
Pump: https://www.npmjs.com/package/pump




```npm i gulp-js-minify```
Gulp-js-minify: https://www.npmjs.com/package/gulp-js-minify





```npm i gulp-concat```
gulp-concat: https://www.npmjs.com/package/gulp-concat


```npm i merge-stream```
merge-stream: https://www.npmjs.com/package/merge-stream






### gulpfile.js

```javascript
const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const pump = require('pump');

const minifyjs = require('gulp-js-minify');
const concat = require('gulp-concat');
const merge = require('merge-stream');



const srcPath = 'assets';
const src = {
  scss: `${srcPath}/scss/style.scss`,
  html: `${srcPath}/**/*.html`,
  js: `${srcPath}/js/**/*.js`,
  img: `${srcPath}/images/**/*`,
}



// Dest set to docs for github pages, feel free to change
const destPath = 'build';
const dest = {
  css: `${destPath}/css`,
  html: destPath,
  js: `${destPath}/js`,
  img: `${destPath}/images`,

  css_bundle: `${destPath}/css/*.css`,
}

gulp.task('sass', () => {
  pump([
    gulp.src(src.scss),
    plumber(err => console.error(err)),
    sass({ style: 'compressed' }).on('error', sass.logError),
    autoprefixer({ browsers: ['last 2 versions'] }),
    minifyCss(),
    gulp.dest(dest.css),
    browserSync.stream({match: '**/*.css'})
  ]);

  
});

/*
gulp.task('html', () => {
  pump([
    gulp.src(src.html),
    plumber(err => console.error(err)),
    htmlmin({ collapseWhitespace: true, removeComments: true }),
    gulp.dest(dest.html)
  ]);
});
*/

gulp.task('js', () => {
  pump([
    gulp.src(src.js),
    plumber(err => console.error(err)),
    babel({ presets: ['es2015', 'es2017'] }),
    uglify(),
    gulp.dest(dest.js),
    browserSync.stream()
  ]);
});

gulp.task('image', () => {
  pump([
    gulp.src(src.img),
    plumber(err => console.error(err)),
    imagemin({ verbose: true }),
    gulp.dest(dest.img)
  ]);
}); 




gulp.task('prod', function() {

  var css = gulp.src([`${srcPath}/css/bootstrap.min.css`, `${srcPath}/css/stylized.css`, `${srcPath}/css/swiper.min.css`, `${srcPath}/css/font-awesome.min.css`, `${destPath}/css/style.css`])
    //.pipe(minifyCss())
    .pipe(concat('style.bundle.css'))
    .pipe(gulp.dest(`./${destPath}/css`));

  var headerjs = gulp.src([`${srcPath}/js/jquery-2.2.4.min.js`])
    .pipe(concat('header.bundle.js'))
    //.pipe(minifyjs())
    .pipe(gulp.dest(`./${destPath}/js`));
  

  var footerjs = gulp.src([`${srcPath}/js/bootstrap.min.js`, `${srcPath}/js/kodeized.js`, `${srcPath}/js/viewportchecker.js`,`${srcPath}/js/swiper.jquery.min.js`, `${srcPath}/js/customized.js`])
      .pipe(concat('footer.bundle.js'))
      /*.pipe(minifyjs()) /*not recommand minify for debuging*/
      .pipe(gulp.dest(`./${destPath}/js`));
    
  return merge(css, headerjs, footerjs).on('change', browserSync.stream);

});



//gulp.task('browserSync', ['sass', 'js', 'html'], () => {
  gulp.task('browserSync', ['sass', 'prod'], () => {
    browserSync.init({
      injectChanges: true,
      server: `./${destPath}`,
    });
  

    gulp.watch([dest.css_bundle, src.scss, src.js], ['sass', 'prod']);
      //  gulp.watch(src.js, ['js']);
      //  gulp.watch(src.js).on('change', browserSync.stream);
      //  gulp.watch(src.html, ['html']);
      //  gulp.watch(src.html).on('change', browserSync.reload);
      //  gulp.watch(src.js).on('change', browserSync.reload);
  });


gulp.task('default', ['browserSync']);
```









Create or Open <project folder>
Create 'gulpfile.js'

Open Command line

```javascript
	npm install gulp (press enter)
	npm install gulp gulp-concat gulp-minify-css (press enter)
	npm install touch-cli -g
	touch gulpfile.js
	gulp --help
```



## Folder structure 
```html
<Root>
|   gulpfile.js
|   index.html
|   package.json
|   
+---assets
|   +---css
|   |       bootstrap.min.css
|   |       stylized.css
|   |       
|   |       
|   +---images
|   |   |   contact-area-bg.jpg
|   |   |   slide1.jpg
|   |   |   
|   |   \---image-subfolder
|   |           project1.jpg
|   |           project2.jpg
|   |           
|   +---js
|   |       bootstrap.min.js
|   |       customized.js
|   |       jquery-2.2.4.min.js
|   |       kodeized.js
|   |       
|   \---scss
|           style.scss
|           
+---build
|   +---css
|   |       style.bundle.css
|   |       style.css
|   |       
|   +---images
|   |   |   contact-area-bg.jpg
|   |   |   dashboard1.jpg
|   |   |   
|   |   \---portfolio
|   |           project1.jpg
|   |           project2.jpg
|   |           
|   \---js
|           footer.bundle.js
|           header.bundle.js

```	



### gulpfile.js
```javascript
var gulp = require('gulp'),
minifyCSS = require('gulp-minify-css'),
concat = require('gulp-concat')


gulp.task('css', function(){
	gulp.src(['strong.css', 'em.css'])
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('css'))
});

// open command and type 'gulp css' press enter.
// both files wil minify as style.min.css 

```


### How to combine multiple minify JS files into one with using GulpJS

```javascript
var gulp = require('gulp');
var minifyjs = require('gulp-js-minify');
var concat = require('gulp-concat');
 
gulp.task('headerjs', function() {
  //return gulp.src('../front/js/*.js')
	gulp.src(['../front/js/kodeized.js', '../front/js/bootstrap.min.js'])
    .pipe(concat('all.js'))
	.pipe(minifyjs())
    .pipe(gulp.dest('../front/js/'));
});
```



### How run multiple bunch of sources in one gulp task
```javascript
...
var merge = require('merge-stream');
...


gulp.task('prod', function() {
	
		var cssFiles = gulp.src(['../front/css/stylized.css', '../front/colorized.css'])
			.pipe(minifyCSS())
			.pipe(concat('style.bundle.css'))
			.pipe(gulp.dest('../front/css'));
	
		var jsHeader = gulp.src(['../front/js/kodeized.js', '../front/js/bootstrap.min.js'])
			.pipe(concat('all_header.bundle.js'))
			.pipe(minifyjs())
			.pipe(gulp.dest('../front/js/'));
		

		var jsFooter = gulp.src(['../front/js/kodeized.js', '../front/js/bootstrap.min.js'])
			.pipe(concat('all_footer.bundle.js'))
			.pipe(minifyjs())
			.pipe(gulp.dest('../front/js/'));
		

		return merge(cssFiles, jsHeader, jsFooter);
  
});
```