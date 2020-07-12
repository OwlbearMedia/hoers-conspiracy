const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();

app.use(serve(__dirname + '/dist'));

app.listen(process.env.PORT || 1917);
