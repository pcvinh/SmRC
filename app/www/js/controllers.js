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
			if(response.data) { 
				var localStorageTokenString = localStorage.getItem("TokenArr");
				var TokenArr;
			if(localStorageTokenString == null || localStorageTokenString == undefined){
				TokenArr  = [];
			} else {
				TokenArr = JSON.parse(localStorageTokenString);
			}
			TokenArr.push(response.data.token);
			localStorage.setItem("TokenArr", JSON.stringify(TokenArr));
			console.log(TokenArr);
			$scope.msg = "ServiceExists";
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
 
.controller('ReturnChannelCtrl', function($scope, ReturnService,$window,$location, mysocket) {
    ReturnService.getChannels().then(function(response){
		$scope.epgs = response.data;
	})
		$scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
		$scope.checkLocalStorageToken = function() {
			if($scope.GetTokenArr.length > 0 ){
				return true
			}
			else{
				return false;
			
			}
		}
		$scope.SwitchToSocket = function(){
			if($scope.GetTokenArr.length == 1){
				mysocket.connect($scope.GetTokenArr[0]);
		}
			else{
				$location.path('/Settings/Socket');
			}
		}
	})
	
.controller('ReturnVODCtrl', function($scope, ReturnVodService,$window,$location, mysocket) {
	ReturnVodService.getVODs().then(function(response){
		$scope.vods = response.data;
	})
		$scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
		$scope.checkLocalStorageToken = function() {
			if($scope.GetTokenArr.length > 0 ){
				return true
			}
			else{
				return false;
			}
		}
		$scope.SwitchToSocket = function(){
			if($scope.GetTokenArr.length == 1){
				mysocket.connect($scope.GetTokenArr[0]);
		}
			else{
				$location.path('/Settings/Socket');
			}
		}
	})

.controller('SocketCtrl',function($scope,$window, mysocket){
	$scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
	
	$scope.OpenSocket = function(){
		if($scope.GetTokenArr.length == 1){
		    mysocket.connect($scope.GetTokenArr[0]);
	}
		else{
			var token = $scope.GetTokenArr[0];
			mysocket.connect(token);
		
	 }
	 }
			

    $scope.checkLocalStorageToken = function() {
		if($scope.GetTokenArr.length > 0 ){
			return true
		}
		else{
			return false;
			
		}
	}
	$scope.data = {
    repeatSelect: null,
	}
	})

// .controller('SocketDisconnetCtrl', function($scope,mysocket,$timeout){
	// $scope.Timer = 180;
	// $scope.onTimeout = function(){
		// $scope.Timer--;
				// if($scope.Timer > 0)
			// {
			// mytimeout = $timeout($scope.onTimeout,1000);
        	// }
        		// else {
            // alert("You have been disconnected!");
        	// }
    // }
	// var mytimeout = $timeout($scope.onTimeout,1000);
	
	// $scope.reset= function(){
        // $scope.Timer = 180
        // mytimeout = $timeout($scope.onTimeout,1000);
    // }
    // console.log($scope.Timer);
   // if( KeepAlive() ){
	   // $scope.reset();
	   // mysocket.connect(token);
   // }
   // else{
	   // $scope.Timer = 0;
	   // mysocket.disconnect;
   // }
//})

.controller('PushCtrl', function($scope){
	$scope.Push = function() {			
		var url;
		// url = '/Pairing';
		$http({
			method  : 'POST',
			url     : url,
			// data    : 
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function(response) {
			if(response.data) { 
			console.log("response.data");
			
			}
		},
		function(response) { 
		    
			
		});
	}
})

.controller('PullCtrl', function($scope){
	$scope.Pull = function() {	
		var url;
		// url = '/Pairing';
		$http({
			method  : 'POST',
			url     : url,
			// data    : 
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		}).then(function(response) {
			if(response.data) { 
			
			
			}
		},
		function(response) { 
			
		});
	}
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
			 console.log("redirect");
			//$state.go('ChannelsC.Channels');
		}).error(function(data) {
		 var alertPopup = $ionicPopup.alert({
		 title: 'Login failed!',
		 template: 'Please check your credentials!'
			});
		 });
   }
})
.controller('LoadingCtrl',function($scope,$ionicLoading,$timeout){
$scope.showLoading = function() {
      $ionicLoading.show({
         template: 'Loading...'
      });
  $timeout(function () {
    $ionicLoading.hide();
  }, 1000);
} 
})


.controller('SelectCtrl',function($scope,$ionicSideMenuDelegate){
	$scope.selectChannel = function(channel, index){
    $scope.activeChannel = channel;
	$ionicSideMenuDelegate.toggleLeft(false);
	
	};
    $scope.selectVOD = function(VOD, index) {
    $scope.activeVOD = VOD;
	$ionicSideMenuDelegate.toggleLeft(false);
    };
})
