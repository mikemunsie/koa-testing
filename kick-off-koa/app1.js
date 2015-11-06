// Returning JSON

var koa = require('koa');
var fs = require("fs");
var parse = require('co-body');
var app = koa();
var port = process.argv[2] ? process.argv[2] : 3000;

// Checks Content Type (* route)
app.use(function* (next) {
  this.body = this.request.is('json') 
    ? { message: "hi! "}
    : "ok";
});

app.listen(port);