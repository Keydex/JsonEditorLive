var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;
console.log("Front-End server running on " + port);

app.listen(process.env.PORT || port);
