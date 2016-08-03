var express = require("express");
var moment = require("moment");
var app=express();
app.get('/', function(req, res){
    var myipaddress = req.headers["x-forwarded-for"];
    var mylanguage = req.headers["accept-language"].split(",")[0];
    var mysoftware_pre = req.headers["user-agent"];
    var mysoftware = mysoftware_pre.slice(mysoftware_pre.indexOf('(') +1,mysoftware_pre.indexOf(')'));
    var jsonoutput = JSON.stringify({
                 ipaddress: myipaddress,
                 language: mylanguage,
                 software: mysoftware });
    res.send(jsonoutput);
})

app.listen(process.env.PORT, function(){
    console.log("Listening on port "+process.env.PORT+"!")
})