var express = require('express');
var app = express()
var port = 4000;

app.use(express.static("build"));

app.engine('html', require('ejs').renderFile);
app.set("views",process.cwd());

//require("./apply/index").route(app);

app.listen(port);
console.log("listening port "+port);