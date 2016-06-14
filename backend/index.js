var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var pubnub = require("pubnub")({
ssl : true, // <- enable TLS Tunneling over TCP
publish_key : "pub-c-78b8d4b5-5db4-4ebe-95a8-93f02d810b27",
subscribe_key : "sub-c-5ba0ec30-110c-11e6-8c3e-0619f8945a4f"
});


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
<<<<<<< HEAD
	
=======
		
		
>>>>>>> b35445178191624f2d2672712413f5c5818bb624
	});
  res.jsonp({OTP : rs});


  
})
// http://<ip>:<port>/Pairing?ChannelId
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

// http://<ip>:<port>/KeepAlive?ChannelId&STBName
app.get('/KeepAlive', function (req, res) {
    var channelId = req.query.ChannelId;
	
	//publish
	var message = { ChannelId : channelId };
	pubnub.publish({
	channel :  channelId + "_RC",
	message : 'alive',
	callback  : function(Command) { 
        console.log( "SUCCESS!", Command );
    },
    error     : function(Command) { 
        console.log( "FAILED! RETRY PUBLISH!", Command );
    }
	});
	
	//subscribe
    pubnub.subscribe({
    channel : channelId,
    message : function(Command) {
		res.jsonp(Command);
		
		// Unsubscribe from 'channelId_RC,'
	 
		pubnub.unsubscribe({
			channel : channelId,
		});
	}
	});



	


		
		
})

//socket.io

//The query member of the options object is passed to the server on connection and parsed as a CGI style Querystring.

var io = require('socket.io')(http);

io.use(function(socket, next){
    console.log("Query: ", socket.handshake.query);
    //return the result of next() to accept the connection.
    if (socket.handshake.query.Token) {
		// decode token -- CHannelId
		
		var jwt = require('jsonwebtoken');
		var decoded = jwt.decode(token);
		
		var ChannelId;
        return next(socket, ChannelId);
    }
    //call next() with an Error if you need to reject the connection.
    next(new Error('Authentication error'));
});

io.on('connection', function(socket, ChannelId){
	
	socket.on('disconnect', function(){
		pubnub.unsubscribe({ 
			channel : channelId + "_RC",
		});
	})
	
  console.log('front end connected');
  // Subscribe to ChannelId_RC
  	//subscribe
    pubnub.subscribe({
    channel : channelId + "_RC",
    message : function(Command) {
		socket.emit(Command);
	}
	});
});




















