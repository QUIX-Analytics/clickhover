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
var nodemon = require('gulp-nodemon');
var postcss = require('gulp-postcss');
var sourcemaps  = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var path = require('path');

// DECLARE FILE PATHS
// ============================================================
var paths = {
  jsSource: ['./src/client/app/quix.module.js', './src/client/app/core/core.module.js', './src/client/app/layout/layout.module.js', './src/client/app/user/user.module.js', './src/client/app/site/site.module.js', './src/client/app/**/*.js'], // We need to change where the fil paths according to our file structure.
  sassSource: ['./src/client/styles/main.scss'],
	sassWatchSource: ['./src/client/styles/*.scss', './src/client/styles/**/*.scss'],
  bundleSource: ['./src/dist'] // Add to array or change current path to './public/styles/**/*.scss' to use Scss
  //lessSource: ['./public/styles/**/*.less'] //Uncomment if using Less
};
// DEFINE TASKS
// ============================================================
gulp.task('js', function() {
  return gulp.src(paths.jsSource)
  .pipe(sourcemaps.init())
  .pipe(babel()) //Uncomment if using ES6
  .pipe(concat('bundle.js'))
  .pipe(annotate())
  //.pipe(uglify()) //Uncomment when code is production ready
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('./src/dist'));
});
gulp.task('start', function () {
  nodemon({
    script: './src/server/app.js'
  , ext: 'js html scss'
  , env: { 'NODE_ENV': 'development' }
  , ignore: ['dist/*.*']
  , tasks: function(files) {
      const tasks = [];
      files.forEach(function(file) {
        if (path.extname(file) === '.js' && !tasks.includes('js')) {
          tasks.push('js')
        }
        if (path.extname(file) === '.scss' && !tasks.includes('.scss')) {
          tasks.push('sass')
        }
      })
      return tasks;
    }
  })
});
gulp.task('sass', function () {
  return gulp.src(paths.sassSource)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(concat('bundle.css'))
    .pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./src/dist'));
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
  // gulp.watch(paths.jsSource, ['js']);
  // gulp.watch(paths.sassWatchSource, ['sass']);
  // gulp.watch(paths.bundleSource, ['start']);
// gulp.watch(paths.sassSource, ['sass']); //Uncomment if using Less
});
// RUN DEFAULT TASK - first thing to run when gulp is called
// ============================================================
gulp.task('default', ['js', 'sass', 'watch', 'start']); //Add 'sass' to array if using sass and less or replace 'sass' with 'less' if only using Less
