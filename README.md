# Gulp

[<span class="font-size: 20px;"><img src="https://i.imgur.com/yFeBvMO.png" style="position: relative; top: 5px;" height="80" /> </span>]


Create or Open <project folder>
Create 'glupfile.js'

Open Command line

```
	npm install gulp-cli -g
	npm install gulp -D
	touch gulpfile.js
	gulp --help
```



### gulpfile.js
```
var gulp = require('gulp'),
minifyCSS = require('gulp-minify-css'),
concat = require('gulp-concat')


gulp.task('css', function(){
	gulp.src(['strong.css', 'em.css'])
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('css'))
});

// open command and type 'css' press enter.
// both files wil minify as style.min.css 

```



