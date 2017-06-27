const express = require('express')
var fs = require('fs');
var http = require('http');
var gulp = require('gulp');
const app = express()
var dirPath = 'data';


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

var fileNames = fs.readdirSync(dirPath);	//Load file names on startup
var i = 0;

app.get('/', function (req, res) {
	// res.send('Hello World! Test');
  fileNames.push(i);
  i++;
	res.send(fileNames);

	console.log("Pushing");
})

app.delete('/',function (req, res) {
	// res.send('Hello World! Test');
  fileNames.pop();
  i++;
	res.send(fileNames);

	console.log("popping");
})

app.get('filelist.json')

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})
