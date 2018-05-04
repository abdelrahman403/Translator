const gulp = require('gulp'),
  sass = require('gulp-ruby-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  watch = require('gulp-watch'),
  image = require('gulp-image');


// Error Function

function errorCheck(err) {
  console.log(err);
  this.emit('end');
}

// Watch Task

gulp.task('watch', () => {
  gulp.watch('sass/*.sass', ['sass']);
});

// Sass Task

gulp.task('sass', () => {
  sass('sass/*.sass', {
    sourcemap: true,
    style: 'expanded'
  })
  .on('error', sass.logError)
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(gulp.dest('assets/css'))
});

// Default Task

gulp.task('default', ['watch']);
