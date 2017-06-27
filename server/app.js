const express = require('express')
var fs = require('fs');
var http = require('http');
var gulp = require('gulp');
var url = require('url');
const app = express();
var dirPath = 'data';
var jsonfile = require('jsonfile')

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

	console.log("Pushing");
})

app.delete('/',function (req, res) {
	// res.send('Hello World! Test');

	console.log("popping");
})

app.use('/data', express.static(__dirname + '/data'));
app.use(express.static(__dirname + '/public'));

app.post('/', function(request, respond) {
    var body = '';
    console.log("writing File");
    i++;
    filePath = __dirname + '/data/data'+ i + '.json';
    request.on('data', function(data) {
        body += data;
    });
    request.on('end', function (){
        // fs.appendFile(filePath, body, function() {

        // });
        jsonfile.writeFile(filePath, body, function (err) {
          console.error(err)
        })
        console.log(body);
        respond.end('Wrote file data' + i + '.json');
        console.log("File" + i);
    });
});

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})
