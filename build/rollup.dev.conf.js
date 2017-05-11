var VueLoader = require('rollup-plugin-vue');
var Resolve = require('rollup-plugin-node-resolve');
var Commonjs = require("rollup-plugin-commonjs");
var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, '../src/master/index.js'),
    external: ['vue'],
    plugins: [VueLoader(), Resolve(), Commonjs()]
}