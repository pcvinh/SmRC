// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers','starter.factory'])


// .filter('startsWithLetter', function () {
  // return function (items, letter) {
	
    // var filtered = [];
    // var letterMatch = new RegExp(letter, 'i');
    // for (var i = 0; i < items.length; i++) {
      // var item = items[i];
      // if (letterMatch.test(item.T.substring(0, 1))){
        // filtered.push(item);
		
      // }
    // }
	// console.log(filtered);
	// console.log(items.length);
	// console.log(typeof items);
    // return filtered;
  // };
// })

// .filter('firstLetter', function () {
    // return function (input, letter) {
        // input = input || [];
        // var out = [];
        // input.forEach(function (item) {
            // console.log("current item is", item, item.charAt(0));
            // if (item.charAt(0).toLowerCase() == letter) {
                // out.push(item);
            // }
        // });
        // return out;
    // }
// })

	
.config(['$ionicConfigProvider', function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom'); // other values: top
	$ionicConfigProvider.scrolling.jsScrolling(false);
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
	
	.state('EPG.Favourite',{
			url:'/Favourite',
				views: { 
					'menuContent':{
						templateUrl: 'templates/Favourite.html',
						controller:'FavouriteCtrl'
					}
				}
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
				controller:function($scope, $stateParams) {
					
					$scope.wordArr = $scope.activeArtist;   
					
					$scope.wordArr = [	
					{Num: 1 , NumOfWord: 'One Word'},
					{Num: 2 , NumOfWord: 'Two Words'}, 
					{Num: 3 , NumOfWord: 'Three Words'},
					{Num: 4 , NumOfWord: 'Four Words'},
					{Num: 5 , NumOfWord: 'Five Words'},
					{Num: 6 , NumOfWord: 'Six Words'},
					{Num: 7 , NumOfWord: 'Seven Words'},
					{Num: 8 , NumOfWord: 'Eight Words'},
					{Num: 9 , NumOfWord: 'Nine Words And Above'}
				]
	
   				}	
			}
		}
	})
		
	.state('VOD.VODsArtistList',{
		url: '/VODsArtistList?letter',
		views: {
			'menuContent': {
				templateUrl: 'templates/VODsArtistList.html',
				controller:function($scope, $stateParams) {
					$scope.letter= $stateParams.letter;	
					$scope.artis_list = $scope.activeLetter;
					
				}	
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
				controller:function($scope){
					
					$scope.testArr = $scope.activeWord;
					
					
			
					$scope.testArr = [	
						{ title: 'Otherside' },
						{ title: 'Perfect Strangers'},
						{ title: 'Take on Me'}, 
						{ title: 'When We Were Young'},
						{ title: 'Why do You Only Call Me When You are High?'},
						{ title: 'The Less I Know the Better'},
						{ title: 'I Took A Pill In Ibiza'},
						{ title: 'Rolling in the Deep'}, 
						{ title: 'Take Me Out'},
						{ title: 'Fluorescent Adolescent'},
						{ title: 'The Numbers'},					
						]
				
				
				
				}
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

