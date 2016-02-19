var del = require('del');
var gulp = require('gulp');
var rev = require('gulp-rev');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var minifyify = require('minifyify');
var uglify = require('gulp-uglify');

var jsDir = 'public/js';
var cssDir = 'public/css';
var fontsDir = 'public/fonts';
var assetsDir = 'public/assets';
var manifestFile = 'public/assets/rev-manifest.json';

var dependencies = [
  'alertify.js',
  'angular',
  'angular-dragula',
  'angular-marked',
  'angular-route',
  'angular-sanitize',
  'angular-ui-bootstrap',
  'angular-ui-switch',
  'angular-youtube-embed',
  'lodash',
  'moment',
  'satellizer',
  'seedrandom',
  'showdown',
  'ui-select'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', ['clean'], function() {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap-sass/assets/javascripts/bootstrap.min.js',
    'node_modules/medium-editor/dist/js/medium-editor.min.js'
  ]).pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(require('gulp-concat')({ path: 'vendor.js', cwd: '.' }))
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
    .transform(require('partialify'))
    .transform(require('babelify').configure({ presets: ['es2015'], plugins: ['transform-object-assign'] }))
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
    .pipe(require('gulp-plumber')())
    .pipe(sourcemaps.init())
      .pipe(require('gulp-sass')({ includePaths: ['node_modules'] }))
      .on('error', swallowError)
      .pipe(require('gulp-autoprefixer')())
      .pipe(require('gulp-minify-css')())
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
  require('gulp-util').log(error.message, error.stack);
  this.emit('end');
}
