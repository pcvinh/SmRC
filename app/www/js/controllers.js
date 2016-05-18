angular.module('starter.controllers', [])

.controller('PostCtrl', function($scope,$http){
	$scope.OTP = {};
	$scope.SubmitOTP = function() {
	$http({
        url: 'http://localhost:3000/Pairing',
        method: "POST",
        data: $scope.OTP
    })
    .then(function(response) {
            $scope.msg = "Post Data Submitted Successfully!";
    }, 
    function(response) { 
	        $scope.msg = "Service not Exists";
			$scope.statusval = response.status;
			$scope.statustext = response.statusText;
			$scope.headers = response.headers();
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
.controller('PushCtrl', function($scope){
	$scope.Token= "";
	$scope.TokenArr = [];	
	$scope.PushToken = function(){
    $scope.TokenArr.push($scope.Token);
	localStorage.setItem("TokenArr", JSON.stringify($scope.TokenArr));
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
