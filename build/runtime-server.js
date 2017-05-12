var masterConfig = require('./rollup.dev.conf');
var rollup = require('rollup');
var path = require('path');
debugger
rollup.rollup(masterConfig).then(function(bundle){
    bundle.write({
        format: 'amd',
        dest: path.resolve(__dirname, '../dest/test.js')
    });
});
