'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time

    require('time-grunt')(grunt);

    // Configurable paths for the app
    var appConfig = {
        app: 'app', // base path for application
        compile: 'compile', // compiled js/css (not minified)
        dist: 'dist' // compile and minified js/css
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        app: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ).use(
                                '/node_modules',
                                connect.static('./node_modules')
                            ),
                            connect.static(appConfig.app)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= app.dist %>'
                }
            }
        },

        // Watch for changes in live edit
        watch: {
            // js: {
            //     files: ['<%= app.app %>/src/**/*.js'],
            //     tasks: ['jshint'],
            //     options: {
            //         livereload: '<%= connect.options.livereload %>'
            //     }
            // },
            ts: {
                files: ['<%= app.app %>/src/**/*.ts'],
                tasks: ['ts'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= app.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= app.app %>/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        ts: {
            default: {
                src: ['<%= app.app %>/**/*.ts', "!node_modules/**"]
            }
        },

        // Clean folders
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= app.dist %>/{,*/}*',
                        '!<%= app.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            live: {
                files: [
                    {
                        dot: true,
                        src: [
                            {

                            }]
                    }]
            },
            compile: {
                files: [
                    {
                        dot: true,
                        src: [
                            '<%= app.compile %>/{,*/}*',
                            '.tmp'
                        ]
                    }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            build: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= app.app %>',
                    src: [
                        '**/*.html',
                        '**/*.{ico,png,jpg,txt,svg}'
                    ],
                    dest: '<%= app.dist %>'
                }, {
                        expand: true,
                        dot: true,
                        cwd: '.tmp/concat',
                        src: [
                            '**/*.{annotated.js,css}',
                            '**/vendor.js'
                        ],
                        dest: '<%= app.dist %>'
                    }, {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome/fonts',
                        src: '*.*',
                        dest: '<%= app.dist %>/assets/fonts'
                    }]
            },
            compile: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= app.app %>',
                    dest: '<%= app.compile %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'src/**/**/*.html'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= app.app %>/assets/styles',
                dest: '.tmp/styles/',
                src: '*.*'
            }
        },

        uglify: {
            build: {
                files: [{
                    '<%= app.dist %>/scripts/scripts.js': '.tmp/scripts/scripts.annotated.js'
                }]
            },
            options: {
                mangle: true,
                preserveComments: false
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= app.dist %>/src/{,*/}*.js',
                    '<%= app.dist %>/assets/styles/{,*/}*.css',
                    '<%= app.dist %>/assets/styles/fonts/*'
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true,
                    removeComments: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= app.dist %>',
                    src: ['**/*.html'],
                    dest: '<%= app.dist %>'
                }]
            }
        },

        useminPrepare: {
            html: '<%= app.app %>/index.html',
            options: {
                dest: '.tmp',
                flow: {
                    steps: {
                        js: ['concat'],
                        css: ['concat', 'cssmin']
                    },
                    post: {}
                }
            }
        },

        usemin: {
            html: ['<%= app.dist %>/index.html']
        },

        'string-replace': {
            compile: {
                files: [{
                    src: '<%= app.dist %>/src/login/login.html',
                    dest: '<%= app.dist %>/src/login/login.html'
                }, {
                        src: '<%= app.dist %>/styles/vendor.css',
                        dest: '<%= app.dist %>/styles/vendor.css'
                    }]
            }
        },

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            compile: {
                files: [{
                    '.tmp/scripts/scripts.annotated.js': '.tmp/scripts/scripts.js'
                }, {
                        '<%= app.dist %>/scripts/vendor.js': '.tmp/scripts/vendor.js'
                    }]
            }
        },

        jshint: {
            files: {
                src: ['<%= app.app %>/src/**/*.js'],
                options: {
                    '-W030': true,
                    '-W069': true
                }
            }
        }
    });

    grunt.registerTask('live', [
        'clean:server',
        'copy:styles',
        'ts',
        'connect:livereload',
        'watch'
    ]);

    grunt.registerTask('server', [
        'build',
        'connect:dist:keepalive'
    ]);

    grunt.registerTask('compile', [
        'clean:compile',
        'useminPrepare',
        'concat:generated',
        'copy:compile',
        'cssmin',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    //This is the task to run to obtain a version of js/html/css that can be used on the live site
    grunt.registerTask('build', [
        'clean:build',
        'useminPrepare',
        'concat:generated',
        'ngAnnotate',
        'copy:build',
        'usemin',
        'cssmin',
        'string-replace',
        'htmlmin',
        'uglify:build'
    ]);
};