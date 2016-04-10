'use strict';

var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./component.json').appPath || yeomanConfig.app;
    } catch (e) {}

    grunt.initConfig({
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,*/}*.coffee'],
                tasks: ['coffee:dist']
            },
            // coffeeTest: {
            // 	files: ['test/spec/{,*/}*.coffee'],
            // 	tasks: ['coffee:test']
            // },
            // compass: {
            // 	files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
            // 	tasks: ['compass']
            // },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9001,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    port: 9000,
                    middleware: function(connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jsbeautifier: {
            files: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            options: {
                'keep_function_indentation': false,
                'space_before_conditional': true,
                'keep_array_indentation': false,
                'break_chained_methods': false,
                'max_preserve_newlines': 5,
                'preserve_newlines': true,
                'brace_style': 'collapse',
                'unescape_strings': false,
                'indent_with_tabs': true,
                'wrap_line_length': 0,
                'jslint_happy': false,
                'eval_code': false,
                'indent_size': 4
            }
        },
        markdown: {
            all: {
                files: [{
                    expand: true,
                    src: 'readme.md',
                    dest: '.',
                    ext: '.html'
                }],
                options: {
                    gfm: true,
                    codeLines: {
                        before: '<span>',
                        after: '</span>'
                    }
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ]
        },
        karma: {
            e2e: {
                configFile: 'karma-e2e.conf.js',
                singleRun: false,
                runnerPort: 9001
            },
            unit: {
                configFile: 'karma.conf.js',
                singleRun: false,
                runnerPort: 9002
            }
        },
        // coffee: {
        // 	dist: {
        // 		files: [{
        // 			expand: true,
        // 			cwd: '<%= yeoman.app %>/scripts',
        // 			src: '{,*/}*.coffee',
        // 			dest: '.tmp/scripts',
        // 			ext: '.js'
        // 		}]
        // 	},
        // 	test: {
        // 		files: [{
        // 			expand: true,
        // 			cwd: 'test/spec',
        // 			src: '{,*/}*.coffee',
        // 			dest: '.tmp/spec',
        // 			ext: '.js'
        // 		}]
        // 	}
        // },
        // compass: {
        // 	options: {
        // 		javascriptsDir: '<%= yeoman.app %>/scripts',
        // 		fontsDir: '<%= yeoman.app %>/styles/fonts',
        // 		importPath: '<%= yeoman.app %>/components',
        // 		imagesDir: '<%= yeoman.app %>/images',
        // 		sassDir: '<%= yeoman.app %>/styles',
        // 		cssDir: '.tmp/styles',
        // 		relativeAssets: true
        // 	},
        // 	dist: {},
        // 	server: {
        // 		options: {
        // 			debugInfo: true
        // 		}
        // 	}
        // },
        concat: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '.tmp/scripts/{,*/}*.js',
                        '<%= yeoman.app %>/scripts/{,*/}*.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= yeoman.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
					// https://github.com/yeoman/grunt-usemin/issues/44
					collapseBooleanAttributes: true,
					removeAttributeQuotes: true,
					removeOptionalTags: true*/
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: [
                        '*.html',
                        'views/*.html'
                    ],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/scripts',
                    src: '*.js',
                    dest: '<%= yeoman.dist %>/scripts'
                }]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ],
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,txt}',
                        '.htaccess',
                        'components/**/*',
                        'images/{,*/}*.{gif,webp}'
                    ]
                }]
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        // 'jsbeautifier',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'jsbeautifier',
        'connect:test',
        'karma'
    ]);
    grunt.registerTask('test:unit', [
        'clean:server',
        'jsbeautifier',
        'connect:test',
        'karma:unit'
    ]);
    grunt.registerTask('test:e2e', [
        'clean:server',
        'jsbeautifier',
        'livereload-start',
        'connect:livereload',
        'karma:e2e'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jsbeautifier',
        'jshint',
        'test',
        'useminPrepare',
        'imagemin',
        'cssmin',
        'htmlmin',
        'concat',
        'copy',
        'cdnify',
        'ngmin',
        'uglify',
        'rev',
        'usemin'
    ]);

    grunt.registerTask('default', ['build']);
};
