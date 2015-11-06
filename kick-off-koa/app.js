// Routes, Middleware, and Content Types

var koa = require('koa');
var fs = require("fs");
var parse = require('co-body');
var app = koa();
var port = process.argv[2] ? process.argv[2] : 3000;

// Regular Routes
app.use(function* (next) {
  if (this.method !== "GET") return yield next;
  switch (this.path) {
    case "/":
      this.body = "hello koa";
      break;
    case "/404":
      console.log("boom")
      this.body = "page not found";
      break;
    case "/500":
      this.body = "internal server error";
      break;
    case "/stream":
      if (process.argv[3]) {
        this.body = fs.createReadStream(process.argv[3]);
      }
      break;
    case "/json":
      this.body = {
        foo: "bar"
      };
      break;
    default:
      return yield next;
  }
});

// POST stuff
app.use(function* (next) {
  if (this.method !== "POST") return yield next;
  var body = yield parse(this);
  switch (this.path) {
    case "/":
      if (body.name) {
        this.body = body.name.toUpperCase();
      } else {
        this.throw(400, '.name required');
      }
      break;
    case "/json":

    default:
      return yield next;
  }
});

app.listen(port);