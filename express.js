// node server

var http = require('http');
var url = require('url');

const express = {
    matchPatterns: {
        get: {},
        post: {}
    },
    get(urlPattern, callback){
        this.matchPatterns.get[urlPattern] = callback
    },
    post(){
        this.matchPatterns.post[urlPattern] = callback
    }
}

var server = http.createServer(function (req, res) {
    const method = req.method
    const reqUrl = req.url
    const matchMethod = express.matchPatterns[method.toLowerCase()]
    const route = url.parse(req.url, true)

    const callback = matchMethod[reqUrl]
    if(callback) callback(req, res)
    else res.end(`Cannot ${req.method} ${reqUrl}`)
});

server.listen(2000, function () {
    console.log('server created successfuly!');
})

module.exports = express