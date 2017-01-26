const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');
const compileSass = require('broccoli-sass-source-maps');
const babel = require('broccoli-babel-transpiler');
const Rollup = require('broccoli-rollup');

const appRoot = 'app';

// Copy HTML file from app root to destination
const html = funnel(appRoot, {
  files : ['index.html'],
  destDir : '/'
});

// Copy JS file into assets
let js = funnel(appRoot, {
  include: ['**/*.js'],
});

// Rollup dependencies
js = new Rollup(js, {
  inputFiles: ['**/*.js'],
  rollup: {
    entry: 'app.js',
    dest: 'assets/app.js',
    sourceMap: 'inline'
  }
});

// Transpile to ES5
js = babel(js, {
  browserPolyfill: true,
  sourceMap: 'inline',
});

// Copy CSS file into assets
const css = compileSass(
  [appRoot],
  'styles/app.scss',
  'assets/app.css',
  {
    sourceMap: true,
    sourceMapContents: true,
  }
);

module.exports = merge([html, js, css]);