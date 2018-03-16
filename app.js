var express = require('express');
var path = require('path');

var app = express();


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

app.listen(3000,function(){
	console.log('Listening at port 3000...');
});

module.exports = app;