angular.module('starter.factory', [])
.service('config', function($window){
	this.is_localhost = false;
	this.is_device = false;
	this.smrc_backend_ip = (this.is_localhost == false) ? 'http://172.28.2.161:3000' : 'http://127.0.0.1:3000';
})
.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'starhub') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})

.service('myTimeout' , function($ionicLoading,$timeout) {
	
	this.showConnecting = function() {
		$ionicLoading.show({
			template: 'Connecting...'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 1000);
	} 
	this.showDisconnecting = function() {
		$ionicLoading.show({
			template:'Disconnecting...'
		})
		$timeout(function () {
			$ionicLoading.hide();
		}, 1000);
	} 
		
	this.showOTPMatch = function() {
		$ionicLoading.show({
			template: 'Matching OTP...'
		});
		$timeout(function () {
			$ionicLoading.hide();
		}, 1000);
	} 
})

// .service('epg', function(channels){
	// var self = this;
	// self.channels = [];
	// for(var i = 0; i < channels.ChannelList.Series.length; i++) {
		// for(var j = 0; j < channels.ChannelList.Series[i].Service.length; j++) {
			// var temp = {
				// ChannelId : channels.ChannelList.Series[i].Service[j].ChannelID,
				// ChannelName : channels.ChannelList.Series[i].Service[j].ChannelName.content
			// }
			// self.channels.push(temp);
		// }
	// }
// })
  
.service('mysocket' , function($window, config, $http, $rootScope){
	var self = this; 
	self.CurrentConnections = {index : null};
	self.Connections = [];
    var socket;
	var alive_timeout = {};
	self.ObjectData = [];
	var connected;
	
	
	
	function _serialize(obj) {
	    var str = [];
		for(var p in obj) {
		    if (Array.isArray( obj[p])) {
			    for(var i in obj[p])
			        str.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(obj[p][i]));
            } 
			else {
			    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
			}
		}	
			return str.join('&');
	}

	
	function SetAlive(cid, alive) {
		for(var i = 0 ; i < self.Connections.length ; i++) {
			if(self.Connections[i].stb_id == cid){
				self.Connections[i].alive = alive;
				
				if(!alive && self.CurrentConnections.index == i){
					self.CurrentConnections.index = null;
				}
				$rootScope.$apply();
				return i;
			}
		}
	}
	
	
	function socketInit() {
		if(socket) {
			socket.disconnect();
		}
		socket = io('http://172.28.2.161:3000', { query: "connections="  + JSON.stringify(self.Connections) });
		//socket = io('http://localhost:3000');
		
		socket.on('alive',function(data) {
			console.log(data);
			
			if(self.ObjectData == null) {
				self.ObjectData = [];				
			}
			for(var i=0; i< self.ObjectData.length; i++) {
				if(data.stb_id == self.ObjectData[i].stb_id) 
				self.ObjectData.splice(i,1);
			}
			self.ObjectData.push(data);
			$window.localStorage['ObjectData'] = JSON.stringify(self.ObjectData);
			
			
			if(typeof data.cmd != "undefined" && typeof data.cmd.disable != 'undefined' && data.cmd.disable != null) {
				
				SetAlive(data.cid , false);
			} 
			else { 
			var i = SetAlive(data.cid , true);
			
			if(alive_timeout[i]) {
				clearTimeout(alive_timeout[i]);
			}
				
			alive_timeout [i]= setTimeout(function(){ 
				// disconnect
			SetAlive(data.cid, false);
			}, 2*60*1000);
			;
			}
		})
	}

	
	// socket.on('RevertCmd',function(){
			// console.log('Command received');
			
	function init(){
		if(!$window.localStorage['Connections']) {
			$window.localStorage['Connections'] = '[]';
		}
		
		self.Connections = JSON.parse($window.localStorage['Connections']);
		socketInit();
	}
	init();
	this.connect = function(index){
		console.log("connect: " + index);
		//console.log(connected);
		self.CurrentConnections.index = index;
		connected = true;
	}	
	
	this.disconnect = function(index){
		console.log("disconnect: " + index);
		self.CurrentConnections.index = null;
		connected = false;
		//console.log(connected);
		}
	
	  
	function _push2Connections(data) {
		for(var i=0; i< self.Connections.length; i++) {
			if(data.stb_id == self.Connections[i].stb_id) {
				if(i == self.CurrentConnections.index) {
					self.CurrentConnections.index = null;
				}
				self.Connections.splice(i,1);
				break;
			}
		}
		self.Connections.push(data);
	}

	function _push2ConnectionsLocalStorage(data) {
		var temp_Connections = JSON.parse($window.localStorage['Connections']);
		for(var i=0; i< temp_Connections.length; i++) {
			if(data.stb_id == temp_Connections[i].stb_id) {
				temp_Connections.splice(i,1);
				break;
			}
		}
		temp_Connections.push(data);
		$window.localStorage['Connections'] = JSON.stringify(temp_Connections);
		
	}
		
		
	this.Pairing = function(otp, stb_name, callback) {	
       var url;
	   url = (!config.is_device) ? '/Pairing?' : config.smrc_backend_ip + '/Pairing'
	  	if(!stb_name || stb_name === '') {
			stb_name = 'STB_' + (self.Connections.length + 1);
		}
		$http({
		  method  : 'POST',
		  url     : url,
		  data    : _serialize({ OTP : otp }),  // pass in data as strings	
		  headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		 }).success(function(data) {
			if(typeof data === 'object') {
				console.log(data);
				var temp = {token : data.token, stb_id : data.cid, stb : stb_name};
				_push2Connections(temp);
				_push2ConnectionsLocalStorage(temp);
				
				socketInit();
				//self.connect(self.connections.length-1); // connect with the last one. 
				callback(data);
			} else {
				if(data != 'there is error') {
					alert(data);
				}
			}
		});
	}
	
	function Pull_Command(cmd , callback){
		if(typeof self.CurrentConnections.index == 'undefined' || self.CurrentConnections.index == null) return;
		console.log(cmd);
		var url = (!config.is_device) ? '/pullCommand' : config.smrc_backend_ip + '/pullCommand';
		url += "?token=" + self.CurrentConnections.index;
		

		
	
		$http({
		  method  : 'POST',
		  url     : url,
		  data    : cmd,  // pass in data as strings	
		  //headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		  headers : { 'Content-Type': 'application/json' }
		 }).success(function(data) {
			console.log(data);
			if(data.retcode === 0) {

			}
			callback(data);
		});	
	}
	console.log(self.Connections);
	
	
	
	this.changeChannel = function (channelId) {
		var command_pull = {
		"pull":{
			"cmd":1, // change channel
			"params": {
				"cid" : channelId
			}
		},
		"tag" : Math.floor((Math.random() * 1000) + 1) 
		}
		Pull_Command(command_pull, function(data) {
			
		});
	}	
})
 
	
	
.factory('GetEPGService', function($http) { // epg
	 var factory = {};
	 factory.getEPG = function(){
		return $http.get('Data/epg.json');
	
	};
		return factory;
 })
 
 .factory('GetVodService', function($http){
	 var factory = {};
	 factory.getVODs = function(){
		return $http.get('Data/vod_catalog.json');
	};
		return factory;
 });
