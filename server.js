//Depenndencies 
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var logger = require("morgan");

var Article = require('./models/article.js');

//PORT ENVIORNMENTS
var app = express();
var PORT = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

//Set the Public folder ass static
app.use(express.static('./public'));

//link to MongoDB
var link = 'mongodb://heroku_lz3m2753:4o0jjdtffl6gfr3m9a2vj2slgg@ds145312.mlab.com:45312/heroku_lz3m2753';
mongoose.Promise = Promise;
mongoose.connect(link);
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});

//Get route
app.get('/api/saved', function(req, res) {

  Article.find({}).exec(function(err, doc){
      if(err){
        console.log(err);
        res.send(err);
      }
      else {
        res.send(doc);
      }
    })
});

//Post route
app.post('/api/saved', function(req, res){

  var newArticle = new Article(req.body);

  newArticle.save(function(err, doc){
    if(err){
      console.log(err);
      res.send(err);
    } else {
      res.send(doc._id);
    }
  });
});

//Delete route
app.delete('/api/saved/', function(req, res){
  // console.log(req.body);

  var url = req.body.url;

  Article.remove({"url": url}).exec(function(err, data){
    if(err){
      console.log(err);
    }
    else {
      res.send("Deleted");
    }
  });
});

//Home route
app.get('*', function(req, res){
  res.sendFile('./public/index.html');
});

//APP LISTEN PORT
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
