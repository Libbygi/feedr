var express = require("express");
var request = require("request");
var app = express();
app.use(function(req, res, next){
  res.set("Access-Control-Allow-Origin","*")
  next();
})
app.get("/mashable.json", function(req, res){
  request("http://mashable.com/stories.json", function(err,response,body){
    res.set("Content-type","application/json")
    res.send(body)
  })
})
app.get("/digg.json", function(req, res){
  request("http://digg.com/api/news/popular.json", function(err,response,body){
    res.set("Content-type","application/json")
    res.send(body)
  })
})

app.listen(3000)