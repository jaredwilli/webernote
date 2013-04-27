var shared = {};

// enable / disable colors in the output (reporters and logs)
shared.colors = true;

// Continuous Integration mode
shared.singleRun = false; // if true, it capture browsers, run tests and exit

// enable / disable watching file and executing tests whenever any file changes
shared.autoWatch = true;

// test results reporter to use
shared.defaultReporters = ['progress']; // possible values: dots || progress || growl

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
shared.browsers = ['ChromeCanary'];

shared.defaultProxies = {
	'/': 'http://localhost:8000'
};

exports.shared = shared;