var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var rev = require('gulp-rev');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require('babelify');
var partialify = require('partialify');
var minifyify = require('minifyify');
var uglify = require('gulp-uglify');

var jsDir = 'public/js';
var cssDir = 'public/css';
var fontsDir = 'public/fonts';
var assetsDir = 'public/assets';
var manifestFile = 'public/assets/rev-manifest.json';

var dependencies = [
  'angular',
  'angular-route',
  'angular-sanitize',
  'angular-marked',
  'angular-ui-bootstrap',
  'ui-select',
  'lodash',
  'moment'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', ['clean'], function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js'
  ]).pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(concat({ path: 'vendor.js', cwd: '.' }))
      .pipe(rev())
    .pipe(sourcemaps.write('../assets'))
    .pipe(gulp.dest(jsDir))
    .pipe(rev.manifest(manifestFile, { base: assetsDir, merge: true }))
    .pipe(gulp.dest(assetsDir));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', function() {
  var sourceMap = assetsDir + '/vendor.js.map';

  return browserify({ debug: true })
    .require(dependencies)
    .plugin('minifyify', { map: sourceMap, output: sourceMap })
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on('error', swallowError)
      .pipe(rev())
    .pipe(sourcemaps.write('../assets'))
    .pipe(gulp.dest(jsDir))
    .pipe(rev.manifest(manifestFile, { base: assetsDir, merge: true }))
    .pipe(gulp.dest(assetsDir));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['clean-app'], function() {
  var sourceMap = assetsDir + '/app.js.map';

  return browserify('app/components/app', { debug: true })
    .external(dependencies)
    .transform(partialify)
    .transform(babelify.configure({ presets: ['es2015'], plugins: ['transform-object-assign'] }))
    .plugin('minifyify', { map: sourceMap, output: sourceMap })
    .bundle()
    .on('error', swallowError)
    .pipe(source('app.bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on('error', swallowError)
      .pipe(rev())
    .pipe(sourcemaps.write('../assets'))
    .pipe(gulp.dest(jsDir))
    .pipe(rev.manifest(manifestFile, { base: assetsDir, merge: true }))
    .pipe(gulp.dest(assetsDir));
});

/*
 |--------------------------------------------------------------------------
 | Compile SASS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', ['clean-styles'], function() {
  return gulp.src('app/stylesheets/main.scss', { base: 'app/stylesheets' })
    .pipe(plumber())
    .pipe(sourcemaps.init())
      .pipe(sass({ includePaths: ['node_modules'] }))
      .on('error', swallowError)
      .pipe(autoprefixer())
      .pipe(minifyCss())
      .pipe(rev())
    .pipe(sourcemaps.write('../assets'))
    .pipe(gulp.dest(cssDir))
    .pipe(rev.manifest(manifestFile, { base: assetsDir, merge: true }))
    .pipe(gulp.dest(assetsDir));
});

/*
 |--------------------------------------------------------------------------
 | Copy fonts.
 |--------------------------------------------------------------------------
 */
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest(fontsDir));
});

/*
 |--------------------------------------------------------------------------
 | Clean public directories.
 |--------------------------------------------------------------------------
 */
gulp.task('clean-styles', function() {
  return del([
    cssDir + '/*',
    assetsDir + '/styles*'
  ]);
});
gulp.task('clean-app', function() {
  return del([
    jsDir + '/app*',
    assetsDir + '/app*'
  ]);
});
gulp.task('clean', ['clean-styles'], function() {
  return del([
    jsDir + '/*',
    fontsDir + '/*',
    assetsDir + '/*'
  ]);
});

gulp.task('watch', ['build'], function() {
  gulp.watch('app/stylesheets/**/*.scss', ['styles']);
  gulp.watch([
    'app/**/*.js',
    'app/**/*.html'
  ], ['browserify']);
});

gulp.task('build', ['clean', 'fonts', 'styles', 'vendor', 'browserify-vendor', 'browserify']);
gulp.task('default', ['build', 'watch']);

function swallowError(error) {
  gutil.log(error.message, error.stack);
  this.emit('end');
}
