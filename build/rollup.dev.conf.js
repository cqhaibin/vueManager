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
    plugins: [VueLoader(), babel({
      exclude: 'node_modules/**' // only transpile our source code
    }), Resolve({
    // pass custom options to the resolve plugin
    customResolveOptions: {
      moduleDirectory: 'node_modules'
    },
    jsnext: true,
    main: true,
    browser:true
  }), Commonjs()]
}