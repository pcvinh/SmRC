// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers','starter.factory'])
.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
}])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu2.html',
	cache:false,
	controller:'ReturnVODCtrl'
    })
	
  .state('Settings',{
	  url:'/Settings',
	  abstract:true,
	  templateUrl: 'templates/menu3.html',
	  cache: false,
    })
	
  .state('ChannelsC', {
    url: '/ChannelsC',
    abstract:true,
    templateUrl: 'templates/menu.html',
	cache:false,
    controller: 'ReturnCtrl'
	})
		
  .state('Settings.DisplayS',{
	  url:'/DisplayS',
		  views:{
			  'Settings-tab':{
				  templateUrl:'templates/menu3.html',
		    }
		}
    })
	
  .state('app.DisplayV',{
	  url:'/DisplayV',
	  views:{
		  'VOD-tab':{
			  templateUrl:'templates/menu2.html',	
		    }
	  }
  })
  
  .state('ChannelsC.DisplayC', {
    url: '/DisplayC',
    views: {
      'Channel-tab': {
       templateUrl: 'templates/menu.html',
            }
        }
    })
  
  .state('app.VODs', {
    url: '/VODs',
    views: {
      'menuContent': {
       templateUrl: 'templates/VODs.html',
	   controller:'ReturnVODCtrl'
            }
        }
    })
	
  .state('ChannelsC.Channels', {
    url: '/Channels',
    views: {
      'menuContent': {
       templateUrl: 'templates/Channels.html',
       controller: 'ReturnCtrl'
            }
        }
    })
	
  .state('app.VODSong',{
    url: '/VODsong',
	views:{
	  'menuContent':{
	   templateUrl:'templates/List.html',
			}
		}
	})
	
  .state('Settings.Login',{
	 url: '/Login',
	 views:{
	   'menuContent':{
	    templateUrl:'templates/login.html',
			}
		}
	})
	
  .state('Settings.OTP',{
     url: '/OTP',
	 views:{
	   'menuContent':{
		templateUrl:'templates/OTP.html',
			}
		}
	});
});