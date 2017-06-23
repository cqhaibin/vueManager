var VueLoader = require('rollup-plugin-vue');
var Resolve = require('rollup-plugin-node-resolve');
var Commonjs = require("rollup-plugin-commonjs");
var path = require('path');
var babel = require('rollup-plugin-babel');

module.exports = {
    entry: path.resolve(__dirname, '../src/simple/index.js'),
    external: ['vue'],
    plugins: [VueLoader(), babel(), Resolve(), Commonjs()]
}