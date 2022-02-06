var express = require('express');  
var bodyParser = require('body-parser');
var app     = express(); 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

require('./routes/routes.js')(app);

var server = app.listen(8000, function () {  
  var host = server.address().address  
  var port = server.address().port  
 console.log("Example app listening at http://%s:%s", host, port)  
})  