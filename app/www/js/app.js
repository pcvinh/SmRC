// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers','starter.factory'])

.filter('startsWithAlphabet', function() {
  return function(items, Alphabet) {
  
    var filtered = [];
    var AlphabetMatch = new RegExp(Alphabet, 'i');
    for (var i = 0; i < items.length; i++) {
    var item = items[i];
      if (AlphabetMatch.test(item.name.substring(0, 1))) {
        filtered.push(item);
      }
    }
    return filtered;
  };
})

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
		
	.state('VOD.VODsWordList',{
		url: '/VODsWordList',
		views:{
			'menuContent':{
				templateUrl:'templates/VODsWordList.html',
				controller:'VODCtrl'
			}
		}
	})
		
	.state('VOD.VODsArtistList',{
		url: '/VODsArtistList',
		params:{
			Param1: null
		},
		views: {
			'menuContent': {
				templateUrl: 'templates/VODsArtistList.html',
				controller:'VODCtrl'
     
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
	.state('VOD.VODSlide',{
		trl: '/VODSlide',
		views:{
			'menuContent':{
				templateUrl:'templates/VODSlide.html',
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

