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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// fs.writeFile('/data/', "Hey there!", function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// });

var i = 0;

app.get('/', function (req, res) {
	// res.send('Hello World! Test');
  var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
	res.send(fileNames);

	console.log("Sending File Names");
})

app.delete('/',function (req, res) {
	// res.send('Hello World! Test');
  del(['tmp/*.js', '!tmp/unicorn.js']).then(paths => {
      console.log('Deleted files and folders:\n', paths.join('\n'));
  });
	console.log("popping");
})

app.use('/data', express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/public'));

var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post('/', urlencodedParser, function(request, respond) {
  if (!request.body) return respond.sendStatus(400)
    var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
    console.log(request.body.filename);
    //Check if filename exists
    var body = '';
    console.log("writing File");
    i++;
    filePath = __dirname + '/data/data'+ i + '.json';
    request.on('data', function(data) {
        body += data
        console.log(body);
        console.log(data[1]);
    });
    request.on('end', function (){
        jsonfile.writeFile(filePath, body, function (err) {
          console.error(err)
        })
        // console.log(body);
        respond.end('Wrote file data' + i + '.json');
        console.log("File" + i);
    });
});
var port = 4000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port)
})
