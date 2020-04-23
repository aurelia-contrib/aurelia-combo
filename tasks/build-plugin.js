const gulp = require('gulp');
const gulpSourcemaps = require('gulp-sourcemaps');
const {buildJs} = require('./build');
const {pluginOutputDir} = require('./_env');

function buildPlugin() {
  return buildJs('src/**/*.js')
    // Use gulp-sourcemaps instead of default gulp v4
    // to bypass a gulp issue.
    // https://github.com/gulpjs/gulp/issues/2288#issuecomment-506953894
    .pipe(gulpSourcemaps.write('.', {
      includeContent: true,
      sourceRoot: '../src/'
    }))
    .pipe(gulp.dest(pluginOutputDir));
}

module.exports = buildPlugin;
