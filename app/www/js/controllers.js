angular.module('starter.controllers', [])

.controller('PostCtrl',function($scope,$http){
	function _serialize(obj) {
		var str = [];
		for(var p in obj){
		if (Array.isArray( obj[p])) {
		for(var i in obj[p])
		str.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(obj[p][i]));
		} else {
		str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
		}
		}
		return str.join('&');
	}
	
	    $scope.OTP;
	    $scope.SubmitOTP = function() {	
		var url;
		url = '/Pairing';

		$http({
			method  : 'POST',
			url     : url,
			data    : _serialize({OTP : $scope.OTP}),  // pass in data as strings    
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function(response) {
			console.log(response.data);
			if(response.data) {
			$scope.TokenArr = [];  	
			localStorage.getItem("TokenArr",response.data.token);       
			$scope.TokenArr.push(response.data.token);
		    localStorage.setItem("TokenArr", response.data.token);
			$scope.msg = "Service Exists";
			$scope.statusval = response.status;
			$scope.statustext = response.statusText;
			}
		},
		function(response) { 
				$scope.msg = "Service not Exists";
				$scope.statusval = response.status;
				$scope.statustext = response.statusText;
		});

	}
})
.controller('ReturnCtrl', function($scope, ReturnService) {
	    ReturnService.getChannels().then(function(response){
		$scope.epgs = response.data;
	});
})
.controller('ReturnVODCtrl', function($scope, ReturnVodService) {
	    ReturnVodService.getVODs().then(function(response){
	    $scope.vods = response.data;
    });
})
.controller('RatingsArrCtrl', function($scope){
		$scope.ratingArr = [
		{value: 1,icon: 'ion-ios-star-outline'},
		{value: 2,icon: 'ion-ios-star-outline'}, 
		{value: 3,icon: 'ion-ios-star-outline'},
		{value: 4,icon: 'ion-ios-star-outline'},
		{value: 5,icon: 'ion-ios-star-outline'}
		];
		$scope.setRating = function(val) {
		var rtgs = $scope.ratingArr;
		for (var i = 0; i < rtgs.length; i++) {
		    if (i < val) {
			rtgs[i].icon = 'ion-ios-star';
		} else {
			rtgs[i].icon = 'ion-ios-star-outline';
		}
    };
  }
})
.controller('LoginCtrl',function($scope,LoginService,$ionicPopup, $state){
	  $scope.data = {};
	  $scope.login = function() {
	      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
	      $state.go('ChannelsC.Channels');
	  }).error(function(data) {
	      var alertPopup = $ionicPopup.alert({
		  title: 'Login failed!',
		  template: 'Please check your credentials!'
	   });
	});
   }
})

.controller('globalCtrl',function($scope,$ionicSideMenuDelegate){
	$scope.selectChannel = function(channel, index){
    $scope.activeChannel = channel;
	$ionicSideMenuDelegate.toggleLeft(false);
	};
    $scope.selectVOD = function(VOD, index) {
    $scope.activeVOD = VOD;
	$ionicSideMenuDelegate.toggleLeft(false);
    };
})
