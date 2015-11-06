// Custom Error Handling with Koa

var port = process.argv[2] ? process.argv[2] : 3000;
var koa = require('koa');
var app = koa();

app.use(errorHandler());

app.use(function* () {
  if (this.path === '/error') throw new Error('internal server error');
  this.body = 'OK';
});

function errorHandler() {
  return function* (next) {
   try {
      yield next;
    } catch (err) {
      this.status = err.status || 500;
      this.body = err.message;
      this.app.emit('error', err, this);
    }
  };
}

app.listen(port);
