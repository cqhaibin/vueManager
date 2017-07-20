var VueLoader = require('rollup-plugin-vue');
var Resolve = require('rollup-plugin-node-resolve');
var Commonjs = require("rollup-plugin-commonjs");
var replace = require('rollup-plugin-replace');
var path = require('path');
var babel = require('rollup-plugin-babel');
var paths = require("./paths");
var rollup = require('rollup');
var type = process.env.TYPE;

let config = {
    entry: path.resolve(__dirname, paths[type].source),
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
  }), Commonjs(), replace({
    'process.env.NODE_ENV': JSON.stringify('development'),
    'process.env.VUE_ENV': JSON.stringify('browser')
  })]
};
rollup.rollup(config).then(function(bundle){
    bundle.write({
        format: 'iife',
        moduleName: "tomato",
        sourceMap: true,
        dest: path.resolve(__dirname, paths[type].dest)
    });
});