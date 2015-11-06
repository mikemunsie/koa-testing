// Custom Middleware

var koa = require('koa');
var fs = require("fs");
var parse = require('co-body');
var app = koa();
var port = process.argv[2] ? process.argv[2] : 3000;

app.use(responseTime());
app.use(upperCase());

app.use(function* () {
  this.body = 'hello koa';
});


function responseTime() {
  return function* (next) {
    var timeStart = new Date;
    yield next;
    this.set("X-Response-Time", new Date - timeStart);
  };
}

function upperCase() {
  return function* (next) {
    yield next;
    this.body = this.body.toUpperCase();
  };
}

app.listen(port);