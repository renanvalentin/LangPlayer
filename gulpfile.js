/*global -$ */
'use strict';

const gulp = require('gulp')
  , vfs = require('vinyl-fs')
  , nodemon = require('gulp-nodemon')
  , jshint = require('gulp-jshint')
  , jscs = require('gulp-jscs')
  , babel = require('gulp-babel')
  , plumber = require('gulp-plumber')
  , manifest = require('./package.json')
  , NwBuilder = require('node-webkit-builder')
  , config = manifest.babelOptions
  , mocha = require('gulp-mocha');

const scriptsSrc = [
  './app/scripts/**/*.js'
  , '!./app/scripts/nw/*.js'
  , '!./app/scripts/BubblesJS/*.js'
];

gulp.task('jscs', function () {
  vfs.src(scriptsSrc)
    .pipe(plumber())
    .pipe(jscs({
      esnext: true,
      configPath: '.jscsrc'
    }));
});

gulp.task('lint', function () {
  vfs.src(scriptsSrc)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('dev', ['jscs', 'lint'], function() {
  gulp.watch(scriptsSrc, ['jscs', 'lint']);
});

function test() {
  return gulp.src(['tests/setup/node.js', 'tests/spec/**/*.js'], {read: false})
    .pipe(mocha({reporter: 'dot', globals: config.mochaGlobals}));
}

gulp.task('test', function() {
  require('babel/register');
  return test();
});

gulp.task('nw', function() {
  var nw = new NwBuilder({
    files: './app/**/**', // use the glob format
    version: 'v0.12.1',
    platforms: ['osx32', 'osx64', 'win32', 'win64']
  });

  nw.on('log',  console.log);

  nw.build().then(function () {
    console.log('all done!');
  }).catch(function (error) {
    console.error(error);
  });

});