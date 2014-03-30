module.exports = function (config) {
    config.set({
        basePath: '..',
        frameworks: ['jasmine'],
        files: [
            'app/**/*.js',
            'test/**/*Test.js'
        ],
        exclude: [],
        preprocessors: {},
        plugins: ['karma-jasmine', 'karma-chrome-launcher'],
        reporters: ['progress'],
        port: 9878,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        captureTimeout: 60000,
        singleRun: false
    });
};
