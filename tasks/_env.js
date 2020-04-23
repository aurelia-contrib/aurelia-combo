const {NODE_ENV} = process.env;

module.exports = {
  isProduction: NODE_ENV === 'production',
  outputDir: 'scripts',
  pluginOutputDir: 'dist'
}
