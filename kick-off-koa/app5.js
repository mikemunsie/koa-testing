// Sessions

var koa = require('koa');
var fs = require("fs");
var parse = require('co-body');
var app = koa();
var port = process.argv[2] ? process.argv[2] : 3000;
app.keys = ['secret', 'keys'];

app.use(function* (next) {
  
  // The double squiggly is a faster parseInt basically
  var n = ~~this.cookies.get('view', { signed: true }) + 1;
  this.cookies.set('view', n, { signed: true });
  this.body = n + ' views';
});

app.listen(port);