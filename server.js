// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get("/api",function(req,res){
  let datenow = new Date();
  res.json({"unix": datenow.getTime(),"utc": datenow.toUTCString()});
})
app.get("/api/:date", function (req, res) {
  let date = new Date(req.params.date)
  try {
    let unix = date.getTime();
    let utc = date.toUTCString();
    if(isNaN(unix)) {
      date = new Date(parseInt(req.params.date));
      unix = date.getTime();
      utc = date.toUTCString();
      if(date == 'Invalid Date') return res.json({error: "Invalid Date"});
    }
    res.json({"unix": unix,"utc": utc});
  } catch (error) {
    res.json({error: "Invalid Date"});
  }

});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({unix: 'hello API',});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
