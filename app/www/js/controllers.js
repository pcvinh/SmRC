angular.module('starter.controllers', [])

.controller('OTPCtrl',function($scope,$http) {
    function _serialize(obj) {
	    var str = [];
		for(var p in obj) {
		    if (Array.isArray( obj[p])) {
			    for(var i in obj[p])
			        str.push(encodeURIComponent(p) + '[]=' + encodeURIComponent(obj[p][i]));
            } 
			else {
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
			}
			else {
				TokenArr = JSON.parse(localStorageTokenString);
			}
			TokenArr.push({token : response.data.token, stb : response.data.stb});
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
 
.controller('EPGCtrl', function($scope, GetEPGService, $window, $state, mysocket, $ionicScrollDelegate, $ionicActionSheet) {
    GetEPGService.getEPG().then(function(response) {
        $scope.epgs = response.data;
	})
	
		$scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
		
		$scope.doRefresh = function() {
    console.log('Refreshing!');
    $scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
    $scope.$broadcast('scroll.refreshComplete');
    }
		
		$scope.checkLocalStorageToken = function() {
		    if($scope.GetTokenArr.length > 0 ) {
			    return true
			}
			else {
			    return false;
			
			}
		}
		
        // $scope.SwitchToSocket = function() {
			// if($scope.GetTokenArr.length == 1) {
			    // mysocket.connect($scope.GetTokenArr[0]);
				// console.log("Connected");
			// }
			// else {
				// $state.go('Settings.Socket');
			// }
		// }
		
	    $scope.scrollToTop = function() {
			$ionicScrollDelegate.scrollTop();
		}
  

  var connected;
  $scope.show = function() {
		if(connected == true) {
			if($scope.activeChannel) { 
				var hideSheet = $ionicActionSheet.show({
					buttons: [
							{ text:'Record By Time' },
							{ text:'Launch the RC'},
							{ text:'Disconnect STB'}
				
					],
			destructiveText:'Power Off',
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
				
			}
				if(index == 1) {
				
				}
				if(index == 2) {
					mysocket.disconnect();
					console.log("Disconnected");
					connected = false;
				}
			return true;
			},
			destructiveButtonClicked: function() {
			return true;
			}
		});
		}
			else {
				var hideSheet = $ionicActionSheet.show({
					buttons: [
								{text:'Switch To This Channel' },
								{text:'Record By Time'},
								{text:'Launch the RC'},
								{text:'Disconnect STB'}
				
					],
			destructiveText:'Power Off', 
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
			
				}
				if(index == 1) {
					
				}
				if(index == 2) {
					
				}
				if(index == 3) {
					mysocket.disconnect();
					console.log("Disconnected");
					connected = false;
				}
			return true;
			},
			destructiveButtonClicked: function() {
			
			return true;
			}
			});
			}
		}
		
		
		else{
			if($scope.GetTokenArr.length == 0) {
				$scope.checkLocalStorageToken = function() {
					return false;
				}
			}
		
		
		else if($scope.GetTokenArr.length == 1) {
			 mysocket.connect($scope.GetTokenArr[0].token.toString());
			 console.log("Connected");
			 connected = true;
		}
		
		else if($scope.GetTokenArr.length == 2 ) {
			var hideSheet = $ionicActionSheet.show({
				buttons: [
					{ text: $scope.GetTokenArr[0].stb.toString() },
					{ text: $scope.GetTokenArr[1].stb.toString() },
				],
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
					mysocket.connect($scope.GetTokenArr[0].token.toString() );
					console.log("connected");
					connected = true;
					
				}
				if(index == 1) {
					mysocket.connect($scope.GetTokenArr[1].token.toString() );
					console.log("connected");
					connected = true;
				}
			return true;
			},
		})	
		}
		
		else if($scope.GetTokenArr.length == 3) {
			var hideSheet = $ionicActionSheet.show({
				buttons: [
					{ text: $scope.GetTokenArr[0].stb.toString() },
					{ text: $scope.GetTokenArr[1].stb.toString() },
					{ text: $scope.GetTokenArr[2].stb.toString() }
				],
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
					mysocket.connect($scope.GetTokenArr[0].token.toString() );
					console.log("connected");
					connected = true;
					
				}
				if(index == 1) {
					mysocket.connect($scope.GetTokenArr[1].token.toString() );
					console.log("connected");
					connected = true;
				}
				if(index == 2) {
					mysocket.connect($scope.GetTokenArr[2].token.toString() );
					console.log("connected");
					connected = true;
				}
			return true;
			},
			
		})	
		}
		else{
			$state.go('Settings.Socket');
		}
		}
	}
	})
	
	
	
.controller('VODCtrl', function($scope, GetVodService, $window, $state, mysocket, $ionicScrollDelegate, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, $stateParams ) {
	
    GetVodService.getVODs().then(function(response) {
	    $scope.vods = response.data;
		$ionicSlideBoxDelegate.update();
	})
		$scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
		$scope.checkLocalStorageToken = function() {
		    if($scope.GetTokenArr.length > 0 ) {
			    return true
			}
			else {
				return false;
			}
		}
		
		$scope.myGoBack = function() {
			$ionicHistory.goBack();
		};
		
		
	

	$scope.activeAlphabet = '';
	$scope.activateAlphabet = function(Alphabet) {
		$scope.activeAlphabet = Alphabet;
	}
	
	// $scope.GoToPage = function(){
	
	 // if($scope.activeAlphabet == 'A'){
		 // $state.go("VOD.VODsArtistList",{ param1: Alphabet });
	 // }
	 // else{
		 // $state.go("VOD.VODsArtistList({ param2: Alphabet })");
	 // }
	 // }

  
  
	$scope.WordArr = [	
		{value: 0 , NumOfWord: 'One Word'},
		{value: 1 , NumOfWord: 'Two Words'}, 
		{value: 2 , NumOfWord: 'Three Words'},
		{value: 3 , NumOfWord: 'Four Words'},
		{value: 4 , NumOfWord: 'Five Words'},
		{value: 5 , NumOfWord: 'Six Words'},
		{value: 6 , NumOfWord: 'Seven Words'},
		{value: 7 , NumOfWord: 'Eight Words'},
		{value: 8 , NumOfWord: 'Nine Words And Above'}
	]
	

	
	$scope.doRefresh = function() {
    console.log('Refreshing!');
    $scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
    $scope.$broadcast('scroll.refreshComplete');
    }
	
		// $scope.SwitchToSocket = function() {
		    // if($scope.GetTokenArr.length == 1) {
			    // mysocket.connect($scope.GetTokenArr[0]);
				// console.log("Connected");
		// }
			// else{
				// $state.go('Settings.Socket');
			// }
		// }
		  $scope.scrollToTop = function() {
    $ionicScrollDelegate.scrollTop();
  }
  
   var connected;
   $scope.show = function() {
		if(connected == true) {
			if($scope.activeVOD) { 
				var hideSheet = $ionicActionSheet.show({
					buttons: [
							{ text:'Record By Time' },
							{ text:'Launch the RC'},
							{ text:'Disconnect STB'}
				
					],
			destructiveText:'Power Off',
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
				
			}
				if(index == 1) {
				
				}
				if(index == 2) {
					mysocket.disconnect();
					console.log("Disconnected");
					connected = false;
				}
			return true;
			},
			destructiveButtonClicked: function() {
			return true;
			}
		});
		}
			else {
				var hideSheet = $ionicActionSheet.show({
					buttons: [
								{text:'Switch To This Channel' },
								{text:'Record By Time'},
								{text:'Launch the RC'},
								{text:'Disconnect STB'}
				
					],
			destructiveText:'Power Off', 
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
				
				}
				if(index == 1) {
					
				}
				if(index == 2) {
					
				}
				if(index == 3) {
					mysocket.disconnect();
					console.log("Disconnected");
					connected = false;
				}
			return true;
			},
			destructiveButtonClicked: function() {
			
			return true;
			}
			});
			}
		}
		
		
		else{
			if($scope.GetTokenArr.length == 0) {
				$scope.checkLocalStorageToken = function() {
					return false;
				}
			}
		
		
		else if($scope.GetTokenArr.length == 1) {
			 mysocket.connect($scope.GetTokenArr[0].token.toString());
			 console.log("Connected");
			 connected = true;
		}
		
		else if($scope.GetTokenArr.length == 2 ) {
			var hideSheet = $ionicActionSheet.show({
				buttons: [
					{ text: $scope.GetTokenArr[0].stb.toString() },
					{ text: $scope.GetTokenArr[1].stb.toString() },
				],
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
					mysocket.connect($scope.GetTokenArr[0].token.toString() );
					console.log("connected");
					connected = true;
					
				}
				if(index == 1) {
					mysocket.connect($scope.GetTokenArr[1].token.toString() );
					console.log("connected");
					connected = true;
				}
			return true;
			},
		})	
		}
		
		else if($scope.GetTokenArr.length == 3) {
			var hideSheet = $ionicActionSheet.show({
				buttons: [
					{ text: $scope.GetTokenArr[0].stb.toString() },
					{ text: $scope.GetTokenArr[1].stb.toString() },
					{ text: $scope.GetTokenArr[2].stb.toString() }
				],
			cancelText: 'Cancel',
			cancel: function() {
				
			},
			buttonClicked: function(index) {
				if(index == 0) {
					mysocket.connect($scope.GetTokenArr[0].token.toString() );
					console.log("connected");
					connected = true;
					
				}
				if(index == 1) {
					mysocket.connect($scope.GetTokenArr[1].token.toString() );
					console.log("connected");
					connected = true;
				}
				if(index == 2) {
					mysocket.connect($scope.GetTokenArr[2].token.toString() );
					console.log("connected");
					connected = true;
				}
			return true;
			},
			
		})	
		}
		else{
			$state.go('Settings.Socket');
		}
		}
	}
	})

.controller('SocketCtrl',function($scope, $window, mysocket, $timeout, $ionicActionSheet, $ionicScrollDelegate) {

  $scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
	
	
  

  $scope.doRefresh = function() {
    console.log('Refreshing!');
    $scope.GetTokenArr = ($window.localStorage.getItem('TokenArr')!==null) ? JSON.parse($window.localStorage.getItem('TokenArr')) : [];
    $scope.$broadcast('scroll.refreshComplete');
    }
      
	$scope.OpenSocket = function(token) {
		if($scope.GetTokenArr.length == 1) {
		    mysocket.connect($scope.GetTokenArr[1].token.toString() );
			console.log('Connected');
	}
		else{
			mysocket.connect($scope.GetTokenArr[1].token.toString() );
			console.log('Connected');
		
		}
	}
	
	// $scope.selectedRow = null;  
	// $scope.setClickedRow = function(index){  //function that sets the value of selectedRow to current index
		// $scope.selectedRow = index;
	// }
	 
	$scope.moveItem = function(ObjectArr, fromIndex, toIndex) {
		$scope.GetTokenArr.splice(fromIndex, 1);
		$scope.GetTokenArr.splice(toIndex, 0, ObjectArr );
  }
	
	$scope.Delete = function($index) {
		$scope.GetTokenArr.splice($index, 1);    
		localStorage.removeItem($scope.GetTokenArr);
		localStorage.setItem("TokenArr", JSON.stringify($scope.GetTokenArr));
		console.log("Deleted");
}
	
	
	$scope.show = function() {

		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{ text:'Move' },
				
			],
			destructiveText: 'Delete',
			cancelText: 'Cancel',
			cancel: function() {
				$scope.ShowDeleteButton = false;
				$scope.ShowReOrderButton = false;
			},
			buttonClicked: function(index) {
				if(index == 0) {
				$scope.ToggleReOrder();
				}	
			return true;
			},
			destructiveButtonClicked: function() {
				$scope.ToggleDelete();
					
			return true;
			}
		});
	};

		$scope.ShowReOrderButton = false;
	$scope.ToggleReOrder = function() {
		$scope.ShowReOrderButton = !$scope.ShowReOrderButton;
		if($scope.ShowReOrderButton == true) {
			$scope.ShowDeleteButton = false;
		}
	}

		$scope.ShowDeleteButton = false;
	$scope.ToggleDelete = function() {
		$scope.ShowDeleteButton  = !$scope.ShowDeleteButton;
		if($scope.ShowDeleteButton == true) {
			$scope.ShowReOrderButton = false;
		}
	}
	
    $scope.checkLocalStorageToken = function() {
		if($scope.GetTokenArr.length > 0 ) {
			return true
		}
		else{
			return false;	
		}
	}
	
	$scope.CloseSocket = function() {
		mysocket.disconnect();
		console.log("Disconnected");
	}	
		
    var CheckSocket = true;
	$scope.ToggleSocket = function() {
		if(CheckSocket) {
			$scope.OpenSocket();
		}
		else {
			$scope.CloseSocket();
		}
		CheckSocket = !CheckSocket;
	}

	$scope.scrollToTop = function() {
    $ionicScrollDelegate.scrollTop();
	}
})


.controller('PushCommandCtrl', function($scope){
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

.controller('PullCommandCtrl', function($scope) {
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
.controller('RatingsArrCtrl', function($scope) {
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
		}
		else {
			rtgs[i].icon = 'ion-ios-star-outline';
		}
	};
	}
})

.controller('LoginCtrl',function($scope,LoginService,$ionicPopup, $state) {
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
