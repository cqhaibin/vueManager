var VueLoader = require('rollup-plugin-vue');
var Resolve = require('rollup-plugin-node-resolve');
var Commonjs = require("rollup-plugin-commonjs");
var path = require('path');
var babel = require('rollup-plugin-babel');
var paths = require("./paths");
var type = process.env.TYPE;

module.exports = {
    entry: path.resolve(__dirname, paths[type].source),
    external: ['vue'],
    plugins: [VueLoader(), babel(), Resolve(), Commonjs()]
}