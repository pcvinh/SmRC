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
.controller('LocalStorageCtrl',function($scope,$window){
	// $scope.GetStorage = function(){
	// $scope.GetTokenArr = (localStorage.getItem('TokenArr')!==null) ? JSON.parse(localStorage.getItem('TokenArr')) : [];
	// }
    // console.log($window.localStorage);

	})
  .controller('SocketInitCtrl', function($scope){
	 // $scope.checkLocalStorageToken = function(storage) {
     // $scope.storage = JSON.parse(localStorage.getItem("TokenArr"));
	 // console.log("asdasd");
	// if($scope.storage.length > 0 ){
		// console.log(true);
		// return true
	// }
	// else{
		// return false;
		
	// }
	 // }
	 // console.log("checkLocalStorageToken(storage)" + localStorage.getItem("TokenArr"));
	 // console.log(JSON.parse(localStorage.getItem("TokenArr")));
	 // console.log();
	 
  })
	 
	 // $scope.OpenSocket = function(){
		 
		// if(TokenArr.length == 1){
		// mysocket.connect(token);
		//}
		// else{
		// var selectedValue = document.getElementByName("multipleSelect").value;
		// then mysocket.connect(token);
		
	 // }
	 //}
 
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
	 $state.go('ChannelsC.Channels');
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
  }, 5000);
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
