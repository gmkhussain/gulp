# Gulp

[<span class="font-size: 20px;"><img src="https://i.imgur.com/yFeBvMO.png" style="position: relative; top: 5px;" height="80" /> </span>]


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