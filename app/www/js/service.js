angular.module('starter.factory', [])


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