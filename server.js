var express = require("express");
var moment = require("moment");
var app=express();

var jsonoutput;



app.get('/', function(req, res){
    jsonoutput = JSON.stringify({unix: null, natural: null});
    res.send(jsonoutput);
})
app.get('/:name', function(req,res){
    console.log("welcome");
    //console.log(req);
	//if it's not a valid name, then return null
    ///check if it's an integer aka unixtime
    arg = req.params.name;
    if (String(parseInt(arg)) == arg){
    	momentDate = moment(parseInt(arg, 10)*1000).utc();
		jsonoutput = JSON.stringify({
			         unix:parseInt(arg),
		             natural: momentDate.format('MMMM DD, YYYY')});
    }
	else if (Date.parse(arg)==null){
		jsonoutput = JSON.stringify({unix: null, natural: null});
	}
    else if (Date.parse(arg)!=null){
    	console.log("parsed");
    	var myDate = new Date(Date.parse(req.params.name));
    	console.log(myDate);
    	console.log(new Date(req.params.name));
    	offset = myDate.getTimezoneOffset() ; 
    	unixtime = myDate.getTime()   -  60000 * offset;
    	momentDate = moment(unixtime).utc();
		jsonoutput = JSON.stringify({
			         unix: parseInt(momentDate.format('X')),
		             natural: momentDate.format('MMMM D, YYYY')});
	}
    console.log("donezone");
	// res.send(Object.getOwnPropertyNames(req.headers));
    console.log(req.headers);
    var myipaddress = req.headers["x-forwarded-for"];
    var mylanguage = req.headers["accept-language"].split(",")[0];
    var mysoftware_pre = req.headers["User-Agent"];
    var mysoftware = mysoftware_pre.slice(mysoftware_pre.indexOf('(') +1,mysoftware_pre.indexOf(')'));
    jsonoutput = JSON.stringify({
                 // ip: req.headers["x-forwarded-for"],
                 ipaddress: myipaddress,
                 language: mylanguage,
                 software: "typehere" });
    res.send(jsonoutput);
})

app.listen(process.env.PORT, function(){
    console.log("Exxxample app listening on port 8080!")
})