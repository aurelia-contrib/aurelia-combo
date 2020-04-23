const gulp = require('gulp');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const gulpif = require('gulp-if');

const {isProduction, outputDir} = require('./_env');
const dr = require('./_dumber');

function buildJs(src) {
  const transpile = babel();
  return gulp.src(src, {sourcemaps: true, since: gulp.lastRun(build)})
  .pipe(transpile);
}

function build() {
  return buildJs('{src,dev-app}/**/*.js')
    .pipe(gulp.src('{src,dev-app}/**/*.html'))
    .pipe(dr())
    .pipe(gulpif(isProduction, terser({compress: false})))
    .pipe(gulp.dest(outputDir, {sourcemaps: true}));
}

module.exports = build;
module.exports.buildJs = buildJs;
