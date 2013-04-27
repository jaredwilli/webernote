// Karma configuration

// base path, that will be used to resolve files and exclude
basePath = '';

// list of files / patterns to load in the browser
files = [
	JASMINE,
	JASMINE_ADAPTER,

	// 3rd party code
	'./app/components/angular/angular.js',

	// Firebase code
	'./app/components/firebase.js',
	'./app/components/firebase-auth-client.js',
	'./app/components/angularFire.js',

	// App specific code
	'./app/scripts/*.js',
	'./app/scripts/**/*.js',

	// App specific code
	'./app/components/angular-mocks/angular-mocks.js',

	// Test specs
	'./test/spec/**/*.js'
];

// list of files to exclude
exclude = [];

// web server port
port = 8080;

// cli runner port
runnerPort = 9100;

// level of logging
logLevel = LOG_DEBUG; // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG

// If browser does not capture in given timeout [ms], kill it
captureTimeout = 5000;


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
