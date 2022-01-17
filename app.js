var express = require('express');
var path = require('path');
const Sentry = require('@sentry/node');
const Tracing = require("@sentry/tracing");

var app = express();


Sentry.init({
	dsn: "https://a11377cfc8e3491da52ad8c1f2d42711@o673219.ingest.sentry.io/6152272",
	integrations: [
	  // enable HTTP calls tracing
	  new Sentry.Integrations.Http({ tracing: true }),
	  // enable Express.js middleware tracing
	  new Tracing.Integrations.Express({ app }),
	],
  
	// Set tracesSampleRate to 1.0 to capture 100%
	// of transactions for performance monitoring.
	// We recommend adjusting this value in production
	tracesSampleRate: 1.0,
  });
  
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
  
  // All controllers should live here
  //app.get("/", function rootHandler(req, res) {
	//res.end("Hello world!");
  //});
  
  // The error handler must be before any other error middleware and after all controllers
  app.use(Sentry.Handlers.errorHandler());
  
  // Optional fallthrough error handler
  app.use(function onError(err, req, res, next) {
	// The error id is attached to `res.sentry` to be returned
	// and optionally displayed to the user for support.
	res.statusCode = 500;
	res.end(res.sentry + "\n");
  });
  
  app.listen(3000);

//sentry error test  
app.get("/debug-sentry", function mainHandler(req, res) {
	throw new Error("My first Sentry error!");
});

app.use('/assets',express.static(__dirname + '/assets'));

//for /index page
app.get('/', function(request,response){
	response.sendFile('index.html',{root:path.join(__dirname,'./views')});
});

//for /home page
app.get('/home', function(request,response){
	response.sendFile('home.html',{root:path.join(__dirname,'./views')});
});

//for /about page
app.get('/about', function(request,response){
	response.sendFile('about.html',{root:path.join(__dirname,'./views')});
});

//for /contact page
app.get('/contact', function(request,response){
	response.sendFile('contact.html',{root:path.join(__dirname,'./views')});
});

app.listen(8080,function(){
	console.log('Listening at port 8080...');
});

module.exports = app;
