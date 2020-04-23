export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature('../src')
    .developmentLogging('warn');

  aurelia.start().then(() => aurelia.setRoot());
}
