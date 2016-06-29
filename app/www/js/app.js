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
  

	
  .state('VOD', {
		url: '/VOD',
		abstract: true,
		templateUrl: 'templates/VOD.html',
		controller:'VODCtrl'
    })

	
  .state('Settings',{
		url:'/Settings',
		abstract:true,
		templateUrl: 'templates/Settings.html',
    })
	
  .state('EPG', {
		url: '/EPG',
		abstract:true,
		templateUrl: 'templates/EPG.html',
		controller: 'EPGCtrl'
	})

		
	.state('login',{
		url:'/login',
		templateUrl:'templates/login.html',
		controller:'LoginCtrl'
	})
	
 
  .state('EPG.EPGList', {
		url: '/EPGList',
			views: {
			    'menuContent': {
					templateUrl: 'templates/EPGList.html',
					controller: 'EPGCtrl'
				}
			}
		})
		
  .state('VOD.VODsList',{
		url: '/VODsList',
			views:{
				'menuContent':{
					templateUrl:'templates/VODsList.html',
					controller:'VODCtrl'
				}
			}
		})
	
  .state('Settings.Socket',{
	  url:'/Socket',
	  views:{
		  'menuContent':{
			  templateUrl:'templates/Socket.html',
			  controller:'SocketCtrl'
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

