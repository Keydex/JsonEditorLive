const express = require('express')
var fs = require('fs');
var http = require('http');
var gulp = require('gulp');
var url = require('url');
const app = express();
var dirPath = 'data';
var jsonfile = require('jsonfile')
const del = require('del');
var bodyParser = require('body-parser')
var error = {"error":"API is not set"};
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var i = 0;

app.get('/', function (req, res) {
	// res.send('Hello World! Test');
  var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
	res.json(fileNames);

	console.log("Sending File Names");
})

var json1_filename = "";
var json2_filename = "";
var json3_filename = "";

app.get('/api/request_1', function (req, res) {
  if(json1_filename == ""){
    res.json(error);
  }
  else{
    var obj = JSON.parse(fs.readFileSync(__dirname + '/data/' + json1_filename, 'utf8'));
    console.log("Attempting to send " + json1_filename);
    res.json(obj);
  }
})

app.get('/api/request_2', function (req, res) {
  if(json2_filename == ""){
    res.json(error);
  }
  else{
    var obj = JSON.parse(fs.readFileSync(__dirname + '/data/' + json2_filename, 'utf8'));
    res.json(obj);
  }
})
app.get('/api/request_3', function (req, res) {
  if(json3_filename == ""){
    res.json(error);
  }
  else{
    var obj = JSON.parse(fs.readFileSync(__dirname + '/data/' + json3_filename, 'utf8'));
    res.json(obj);
  }
})


app.delete('/',function (req, res) {
	// res.send('Hello World! Test');
  del(['tmp/*.js', '!tmp/unicorn.js']).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
});

app.use('/data', express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/public'));

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.post('/', urlencodedParser, function(request, respond) {
  if (!request.body) return respond.sendStatus(400)
    var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
    console.log(request.body.filename);
    //Check if filename exists
    console.log("writing File");
    filePath = __dirname + '/data/' + request.body.filename + '.json';

        jsonfile.writeFile(filePath, request.body.jsonData, function (err) {
          console.error(err)
        })
        console.log(request.body.jsonData);
        // console.log(body);
        respond.end('Wrote file data' + request.body.filename + '.json at' + filePath);
});
app.post('/api/request_1', urlencodedParser, function(request, respond) {
  if (!request.body) return respond.sendStatus(400)
    var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
    filePath = __dirname + '/data/' + request.body.filename;
    console.log("Loading API 1 with " + request.body.filename);
    json1_filename = request.body.filename;
        respond.end('API ' + request.body.filename + ' at' + filePath);
});
app.post('/api/request_2', urlencodedParser, function(request, respond) {
  if (!request.body) return respond.sendStatus(400)
    var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
    filePath = __dirname + '/data/' + request.body.filename;
    console.log("Loading API 2 with " + request.body.filename + '.json');
    json2_filename = request.body.filename;
        respond.end('API ' + request.body.filename + ' at' + filePath);
});
app.post('/api/request_3', urlencodedParser, function(request, respond) {
  if (!request.body) return respond.sendStatus(400)
    var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
    filePath = __dirname + '/data/' + request.body.filename;
    console.log("Loading API 3 with " + request.body.filename + '.json');
    json3_filename = request.body.filename;
        respond.end('API ' + request.body.filename + ' at' + filePath);
});
app.post('/load', urlencodedParser, function(request, respond) {
  if (!request.body) return respond.sendStatus(400)
  var obj = JSON.parse(fs.readFileSync(__dirname + '/data/' + request.body.filename, 'utf8'));
  console.log(obj);
  respond.json(obj);
  respond.end("Post Load Success");
});
app.post('/delete', urlencodedParser, function(request, respond) {
  if (!request.body) return respond.sendStatus(400)
  fs.unlink(__dirname + '/data/' + request.body.filename, function(err){
    if(err) {
    console.log("File "+ request.body.filename + " does not exist!")}
    else{
      console.log("Deleted file " + request.body.filename);
    }
  });
  respond.json();
  respond.end("Deleted file success");
});
var port = 4000;
app.listen(port, function () {
  console.log('Server Back-end Running on ' + port)
});
