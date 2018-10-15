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