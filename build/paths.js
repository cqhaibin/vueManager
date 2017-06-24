var path = require("path");

module.exports = {
    simple: {
        source: path.join(__dirname, "../src/simple/index.js"),
        dest: path.join(__dirname, "../dest/simple.js")
    },
    master:{
        source: path.join(__dirname, "../src/master/app.js"),
        dest: path.join(__dirname, "../dest/app.js")
    },
    layout:{
        source: path.join(__dirname, "../src/layout/index.js"),
        dest: path.join(__dirname, "../dest/layout.js")
    }
}