// Rollup plugins
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const babel = require('rollup-plugin-babel');

export default {
  entry: 'app/app.js',
  dest: 'dist/rollup.js',
  format: 'iife',
  sourceMap: 'inline',
  plugins: [
    resolve({ jsnext: true, main: true }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};