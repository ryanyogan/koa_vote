var koa   = require('koa');
var route = require('koa-route');
var app   = module.exports = koa();
var serve = require('koa-static');

app.use(serve(__dirname + "/public"));

// Routes
var homeRoutes = require('./routes/homeRoutes');
var questionRoutes = require('./routes/questionRoutes');
var voteRoutes = require('./routes/voteRoutes');

app.use(route.get('/', homeRoutes.showHome));
app.use(route.get('/question', questionRoutes.showNewQuestion));
app.use(route.post('/question', questionRoutes.addQuestion));
app.use(route.get('/question/:id', questionRoutes.showQuestion));
app.use(route.post('/question/:id', questionRoutes.updateQuestion));
app.use(route.get('/vote', voteRoutes.showAddVote));

app.listen(3000);
console.log("This app is listening on port 3000");
