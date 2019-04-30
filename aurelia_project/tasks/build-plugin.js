import gulp from 'gulp';
import del from 'del';
import {pluginMarkup} from './process-markup';
import {pluginCSS} from './process-css';
import {pluginJson} from './process-json';
import {buildPluginJavaScript} from './transpile';

function clean() {
  return del('dist');
}

export default gulp.series(
  clean,
  gulp.parallel(
    // package.json "module" field pointing to dist/native-modules/index.js
    pluginMarkup('dist/native-modules'),
    pluginCSS('dist/native-modules'),
    pluginJson('dist/native-modules'),
    buildPluginJavaScript('dist/native-modules', 'es2015'),

    // package.json "main" field pointing to dist/native-modules/index.js
    pluginMarkup('dist/commonjs'),
    pluginCSS('dist/commonjs'),
    pluginJson('dist/commonjs'),
    buildPluginJavaScript('dist/commonjs', 'commonjs'),
  ),
  () => console.log('Finish building Aurelia plugin to dist/commonjs and dist/native-modules')
);
