// REQUIRE DEPENDENCIES
// ============================================================
var gulp = require('gulp');
var concat = require('gulp-concat');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
//var less = require('gulp-less'); //Uncomment if using Less
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon')
// DECLARE FILE PATHS
// ============================================================
var paths = {
  jsSource: ['./public/app/**/*.js', '!/public/bundle.js'], // We need to change where the fil paths according to our file structure.
  sassSource: ['./public/styles/**/*.{sass,scss}'], // Add to array or change current path to './public/styles/**/*.scss' to use Scss
  //lessSource: ['./public/styles/**/*.less'] //Uncomment if using Less
};
// DEFINE TASKS
// ============================================================
gulp.task('js', function() {
  return gulp.src(paths.jsSource)
  .pipe(babel()) //Uncomment if using ES6
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  //.pipe(uglify()) //Uncomment when code is production ready
  .pipe(gulp.dest('./public'));
});
gulp.task('start', function () {
  nodemon({
    script: './src/server/app.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  })
})
gulp.task('sass', function () {
  return gulp.src(paths.sassSource)
    .pipe(sass())
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./public'));
});
// gulp.task('less', function () {       // Uncomment if using Less
//   return gulp.src(paths.lessSource)
//     .pipe(less())
//     .pipe(concat('style.css'))
//     .pipe(gulp.dest('./public'));
// });
// WATCH TASKS
// ============================================================
gulp.task('watch', function() {
  gulp.watch(paths.jsSource, ['js']);
  gulp.watch(paths.sassSource, ['sass']);
//   gulp.watch(paths.sassSource, ['sass']); //Uncomment if using Less
});
// RUN DEFAULT TASK - first thing to run when gulp is called
// ============================================================
gulp.task('default', ['watch', 'js', 'sass', 'start']); //Add 'sass' to array if using sass and less or replace 'sass' with 'less' if only using Less
