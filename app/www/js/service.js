angular.module('starter.factory', [])

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


  
.service('mysocket' , function(){
    var socket;
	var alive_timeout;
	this.connect = function(token) {
		socket = io.connect('http://10.18.113.209:3000/', { query: "token="+token });
		//socket = io('http://localhost:3000');
		
		socket.on('KeepAlive',function(data){
			console.log('Connected:' + data);
			alive_timeout = setInterval(function(){ 
				// disconnect
				socket.disconnect();
			}, 5*60*1000);
		})
		
		socket.on('RevertCmd',function(){
			console.log('Command received');
		})
	}
	this.disconnect = function(){
		socket.disconnect();
		clearInterval(alive_timeout);
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
