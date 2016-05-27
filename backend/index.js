var app = require('express')();
var bodyParser = require('body-parser');


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/starhub';

var db;

app.use(bodyParser.json({strict: false})); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing 

// Initialize connection once
MongoClient.connect(url, function(err, database) {
  if(err) throw err;
 
  db = database;

  // Start the application after the database connection is ready
  app.listen(3000);
  console.log("Listening on port 3000");
});

var randomString = function(length) {
    var text = "";
    var possible = "0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}



// http://<ip>:<port>/PairingInit?ChannelId&STBName
app.get('/PairingInit', function (req, res) {
  
  var channelId= req.query.ChannelId, STBName = req.query.STBName;
  var rs = randomString(6);  
  
	db.collection("testCollection").insert({
		ChannelId : channelId,
		STBName : STBName,
		OTP : rs
	
	});
  res.jsonp({OTP : rs}); 
  
})
// http://<ip>:<port>/Pairing?ChannelId&STBName
app.post('/Pairing', function (req, res) {
  var rs = req.body.OTP, user = req.body.Username;
  
  var collection = db.collection("testCollection");
  if(user == null || user == undefined) {
	  user = "Anonymous";
  }
  console.log(user);
   collection.findAndModify(
   {OTP: rs}, //query
   [['_id','asc']],  // sort order
   {$set: {username : user}}, //update statement
   {new: true}, // modified document
   {}, //options
	function (err , item) {
		if(err) {
			console.log(err);
			res.jsonp('error');
			return;
		}
	   console.log(item);
	  var channelId = item.ChannelId, stbname = item.STBName;
		  
	  var jwt = require('jsonwebtoken');
	  var token = jwt.sign({ ChannelId: channelId },'asdasd');
	  
	  res.jsonp({token : token, stb : stbname}); 
	  
	 
	})

})

