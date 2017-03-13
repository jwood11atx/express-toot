var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var multer = require("multer");
var cookieParser = require("cookie-parser");
var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({dest: "./tmp/"}).single("test"));
app.use(cookieParser());

app.get("/index.html", function(req, res){
  res.sendFile(__dirname + "/" + "index.html");
});

app.post("/file_upload", function(req, res){
  console.log(req.file.name);
  console.log(req.file.path);
  console.log(req.file.type);
  var file = __dirname + "/" + req.file.name;

  fs.readFile(req.file.path, function(err, data){
    fs.writeFile(file, data, function(err){
      if(err){
        console.log(err);
      } else {
        response = {
          messsage: "file uploaded successfully",
          filename: req.file.name
        };
      }
      console.log(response);
      res.end(JSON.stringify(response));
    })
  })
})

app.get("/process_get", function(req, res){
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

app.post("/process_post", urlencodedParser, function(req, res){
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

app.get("/", function(req, res){
  console.log("got a GET req for homepage");
  console.log("cookies! : ", req.cookies);
  res.send("hello GET");
});

app.post("/", function(req, res){
  console.log("got a POST req for homepage");
  res.send("hello POST")
});

app.delete("/del_user", function(req, res){
  console.log("got a DELETE req for /del_user");
  res.send("hello DELETE")
});

app.get("/list_user", function(req, res){
  console.log("got a GET req for /list_user");
  res.send("page listing");
});

app.get("/ab*cd", function(req, res){
  console.log("got a GET req for /ab*cd");
  res.send("page pattern match");
});

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("example app listening at http://%s:%s", host, port);
});
