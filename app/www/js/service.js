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

.factory('ReturnService', function($http) {
	 var factory = {};
	 factory.getChannels = function(){
	 return $http.get('Data/epg.json');
		};
	 return factory;
 })
 .factory('ReturnVodService', function($http){
	 var factory = {};
	 factory.getVODs = function(){
     return $http.get('Data/vod_catalog.json');
	 };
	 return factory;
 });
