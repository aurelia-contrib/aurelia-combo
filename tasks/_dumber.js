const dumber = require('gulp-dumber');
const auDepsFinder = require('aurelia-deps-finder');
const {outputDir} = require('./_env');

// Read more in https://dumber.js.org
module.exports = dumber({
  baseUrl: '/' + outputDir,
  depsFinder: auDepsFinder
});
