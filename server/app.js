const express = require('express')
var gulp = require('gulp');
const app = express()

app.get('/', function (req, res) {
	console.log('Test');
})

app.listen(4000, function () {
  console.log('Example app listening on port 3000!')
})
