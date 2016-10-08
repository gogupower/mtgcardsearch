var express = require('express'),
	app = express(),
	bodyParser = require('body-parser');
	cons = require('consolidate');

var mtgApp = require('./app_modules/app.js')

app.engine('html', cons.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({ extended: true }));

//handle for internal server errors
function errorHandler(err, req, res, next){
	console.error(err.message);
	console.error(err.stack);
	res.status(500);
	res.render('error_template', {error : err});
}

app.use(errorHandler);

app.get('/', function(req, res, next){
	res.render('index');
});

app.post('/cardSearch', function(req, res, next){
    mtgApp.getCardPrices(req.body.cardName, res);
});

//Definição da porta de listen do servidor
var port = Number(process.env.PORT || 3000);
app.listen(port);
console.log('Express server listening on port 3000');