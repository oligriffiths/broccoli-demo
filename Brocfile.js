const funnel = require('broccoli-funnel');
const merge = require('broccoli-merge-trees');
const compileSass = require('broccoli-sass-source-maps');
const babel = require('broccoli-babel-transpiler');
const Rollup = require('broccoli-rollup');
const LiveReload = require('broccoli-livereload');
const resolve = require('rollup-plugin-node-resolve');
const babelRollup = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

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
    // external: external,
    entry: 'app.js',
    dest: 'assets/app.js',
    sourceMap: 'inline',
    format: 'iife',
    plugins: [
      commonjs(),
      resolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      babelRollup({
        exclude: 'node_modules/**'
      }),
    ],
  }
});

// Transpile to ES5
// js = babel(js, {
//   browserPolyfill: true,
//   sourceMap: 'inline',
// });

// Copy CSS file into assets
const css = compileSass(
  [appRoot],
  'styles/app.scss',
  'assets/app.css',
  {
    sourceMap: true,
    sourceMapContents: true,
    sourceMapEmbed: true,
  }
);

// Merge the html, js and css trees
let tree = merge([html, js, css]);

// Include live reaload server
tree = new LiveReload(tree, {
  target: 'index.html',
});

module.exports = tree;