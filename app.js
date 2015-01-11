var koa   = require('koa');
var route = require('koa-route');
var app   = module.exports = koa();
var serve = require('koa-static');

app.use(serve(__dirname + "/public"));

// Routes
var homeRoutes = require('./routes/homeRoutes');

app.use(route.get('/', homeRoutes.showHome));

app.listen(3000);
console.log("This app is listening on port 3000");
