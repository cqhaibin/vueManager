var masterConfig = require('./rollup.dev.conf');
var rollup = require('rollup');
var path = require('path');
var paths = require("./paths");
var type = process.env.TYPE;
rollup.rollup(masterConfig).then(function(bundle){
    bundle.write({
        format: 'amd',
        dest: path.resolve(__dirname, paths[type].dest)
    });
});
