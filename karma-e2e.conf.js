// Karma E2E configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
	ANGULAR_SCENARIO,
	ANGULAR_SCENARIO_ADAPTER,

	'test/e2e/**/*.js'
];

// list of files to exclude
exclude = [];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;

// level of logging

//shared = require('./karma.shared.conf').shared;

// enable / disable colors in the output (reporters and logs)
colors = true;

// Continuous Integration mode
singleRun = false; // if true, it capture browsers, run tests and exit

// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;

// test results reporter to use
reporters = ['progress']; // possible values: dots || progress || growl

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['ChromeCanary'];

proxies = {
	'/': 'http://localhost:8000'
};