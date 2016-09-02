angular.module('starter.controllers', [])

.controller('OTPCtrl',function($scope,$http, mysocket , myTimeout) {
	
	
	$scope.showOTPMatch = myTimeout.showOTPMatch;
	$scope.Connections = mysocket.Connections;
	$scope.CurrentConnections = mysocket.CurrentConnections;
	$scope.SubmitOTP = function(otp, stb_name) {
		mysocket.Pairing(otp, stb_name, function(data) {
			$scope.showOTPMatch();
			console.log(mysocket.Connections);
			$scope.Connections = mysocket.Connections;
			
			
		})
	}
})
 
 
.controller('FavouriteCtrl', function($window, $scope, GetEPGService, $state, $ionicActionSheet, $ionicScrollDelegate, $ionicHistory){
	 	
	$scope.GetFavouriteArr = ($window.localStorage.getItem('FavouriteArr')!==null) ? JSON.parse($window.localStorage.getItem('FavouriteArr')) : [];
	console.log($scope.GetFavouriteArr);
	GetEPGService.getEPG().then(function(response) {
		$scope.epgs = response.data;
	})
	
	$scope.ToggleDelete = function() {
		$scope.ShowDeleteButton  = !$scope.ShowDeleteButton;
		}
		
	$scope.doRefresh = function() {
		console.log('Refreshing!');
		$scope.GetFavouriteArr = ($window.localStorage.getItem('FavouriteArr')!==null) ? JSON.parse($window.localStorage.getItem('FavouriteArr')) : [];
		$scope.$broadcast('scroll.refreshComplete');
	}
		
	$scope.showActionSheet = function() {
		var hideSheet = $ionicActionSheet.show({
			buttons: [
			],
			
			destructiveText: 'Delete',
			cancelText: 'Cancel',
			cancel: function() {
				$scope.ShowDeleteButton = false;
			},
			
			buttonClicked: function(index) {
			},
			
			destructiveButtonClicked: function() {
				$scope.ToggleDelete();	
				return true;
			}
		});
	}
	
	$scope.RemoveFavourite = function(index) {
		$scope.GetFavouriteArr.splice(index, 1);    
		localStorage.removeItem($scope.GetFavouriteArr);
		localStorage.setItem("FavouriteArr", JSON.stringify($scope.GetFavouriteArr));
		console.log("Deleted");
		console.log($scope.GetFavouriteArr)
	}
		
	$scope.previousPage = function() {
		$ionicHistory.goBack();
	};
	
		
	$scope.scrollToTop = function() {
		$ionicScrollDelegate.scrollTop();
	}
  
 })
 
 
 
 
.controller('EPGCtrl', function($scope, GetEPGService, $window, $state, mysocket, $ionicScrollDelegate, $ionicActionSheet, myTimeout) {
	
	
	// $scope.channels = epg.channels;
	$scope.changeChannels = function(channelId) {
		mysocket.changeChannel(channelId);
	}
	$scope.showConnecting = myTimeout.showConnecting;
	$scope.showDisconnecting = myTimeout.showDisconnecting;
	
    GetEPGService.getEPG().then(function(response) {
        $scope.epgs = response.data;
		var channel = [];
		for(var i = 0; i < $scope.epgs.ChannelList.Series.length; i++) {
			for(var j = 0; j < $scope.epgs.ChannelList.Series[i].Service.length; j++) {
				var temp = {
					channelId : $scope.epgs.ChannelList.Series[i].Service[j].ChannelID,
					ChannelName : $scope.epgs.ChannelList.Series[i].Service[j].ChannelName.content
				}
			channel.push(temp);
			
			//console.log(channel);
			}
		}
	})
	
	$scope.Connections = mysocket.Connections;
	$scope.CurrentConnections = mysocket.CurrentConnections;
	$scope.GetFavouriteArr = ($window.localStorage.getItem('FavouriteArr')!==null) ? JSON.parse($window.localStorage.getItem('FavouriteArr')) : [];
	// $scope.GetConnectionsArr = ($window.localStorage.getItem('Connections')!==null) ? JSON.parse($window.localStorage.getItem('Connections')) : [];
	$scope.GetObjectData = ($window.localStorage.getItem('ObjectData')!==null) ? JSON.parse($window.localStorage.getItem('ObjectData')) : [];
	
			
	
	// $scope.CheckMatch = function() {
	// var i, t;
		// for(i = 0 ; i < $scope.GetConnectionsArr.length ; i++) {
			// for(t = 0 ; t < $scope.GetObjectData.length; t++) {
	// angular.equals($scope.GetConnectionsArr[i], $scope.GetObjectData[t]);
			// }
		// }
	// }
	$scope.CheckConnected = function() {
		if(connected = true) {
			return true;
		}
		else {
			return false;
		}
	}
	
	$scope.doRefresh = function() {
		console.log('Refreshing!');
			$scope.Connections = ($window.localStorage.getItem('Connections')!==null) ? JSON.parse($window.localStorage.getItem('Connections')) : [];
		$scope.$broadcast('scroll.refreshComplete');
	}
		
	$scope.checkLocalStorageToken = function() {
		for(var i=0; i < $scope.Connections.length; i++) {
			if($scope.Connections[i].alive) {
				return true
			}
			else {
				return false;
			}
		}
	}
		
	$scope.TestArr = 	
	{NumOfWord: 'Breaking Bad'},
		
	
	

	$scope.AddFavoriteMessage = ""
	$scope.AddToFavourite = function() {
		var Favourite = localStorage.getItem("FavouriteArr");
		var FavouriteArr;
		if(Favourite == null || Favourite == undefined){
			FavouriteArr  = [];
		}
		else {
			FavouriteArr = JSON.parse(Favourite);
		}
		FavouriteArr.push($scope.TestArr);
		localStorage.setItem("FavouriteArr", JSON.stringify(FavouriteArr));
		$scope.AddFavoriteMessage = "Successfully added to Favorite List"
		console.log(FavouriteArr);
		}
	
		
	$scope.scrollToTop = function() {
		$ionicScrollDelegate.scrollTop();
	}
  

	var connected;
	var TokenId;
		//$scope.$watch('connected', function() {
		
        // alert('hey, connected has changed!');
		//console.log(connected);
    //});
	// $scope.$apply(function () {
            // connected;
        // });
	$scope.showActionSheet = function() {
		if(connected == true) {
			//if($scope.activeChannel) { 
				// var hideSheet = $ionicActionSheet.show({
					// buttons:[
						// { text:'Favourite'},
						
						// { text:'Record By Time' },
						// { text:'Launch the RC'},
						// { text:'Disconnect STB'}
					// ],
					
		// destructiveText:'Power Off',
		// cancelText: 'Cancel',
		// cancel: function() {
		// },
		
		// buttonClicked: function(index) {
			// if(index == 0) {
				// $state.go("EPG.Favourite");
			// }
			
			// if(index == 1) {
			// }
			
			// if(index == 3) {
				// mysocket.disconnect($scope.Connections[TokenId].token);	
				// connected = false;
				// $scope.showDisconnecting();
			
			// }
			
			// return true;
			// },
			
			// destructiveButtonClicked: function() {
				// return true;
			// }
				// });
			// }
			
			//else {
				var hideSheet = $ionicActionSheet.show({
					buttons: [ 	
						{text:'Favourites'},
						{text:'Switch To This Channel' },
						{text:'Record By Time'},
						{text:'Launch the RC'},
						{text:'Disconnect STB'}
					],
					
		destructiveText:'Power Off', 
		cancelText: 'Cancel',
		cancel: function() {
		},
		
		buttonClicked: function(index, channelId) {
			
			if(index == 0) {
				$state.go("EPG.Favourite");
			}
			
			if(index == 1) {
				console.log($scope.activeChannel);
				$scope.changeChannels($scope.activeChannel.ChannelID);
				
			}
			
			if(index == 2) {	
			}
			
			if(index == 4) {
				mysocket.disconnect($scope.Connections[TokenId].token);
				$scope.showDisconnecting();
				connected = false;
							
			}
			return true;
			},
			
		destructiveButtonClicked: function() {
			return true;
		}
				});
		//	}
		}
		
		else {
			if($scope.checkLocalStorageToken == true){
			return true;
		}
			
		
		
		else if($scope.Connections.length == 1) {
			
			mysocket.connect($scope.Connections[0].token);
			connected = true;
			TokenId = 0;
			$scope.showConnecting();
		}
		
		else if($scope.Connections.length == 2 ) {
			$scope.buttons = [];
			for(var i=0; i < $scope.Connections.length; i++) {
			
				if($scope.Connections[i].alive) {
					$scope.buttons.push({ text: $scope.Connections[i].stb.toString() });
				}				
			}
			
			var hideSheet = $ionicActionSheet.show({
			buttons:$scope.buttons,				
			cancelText: 'Cancel',
			cancel: function() {
			},
			
			buttonClicked: function(index) {
				if(index == 0) {
					
					mysocket.connect($scope.Connections[0].token);
					connected = true;	
					TokenId = 0;
					$scope.showConnecting();
					
				}
				
				if(index == 1) {
				
					mysocket.connect($scope.Connections[1].token);
					connected = true;
					TokenId = 1;
					$scope.showConnecting();
					
				}
			return true;
			},
			})
			
		}
		
		else if($scope.Connections.length == 3) {
			$scope.buttons = [];
			console.log($scope.Connections);
			for(var i=0; i < $scope.Connections.length; i++) {
			
				if($scope.Connections[i].alive) {
					$scope.buttons.push({ text: $scope.Connections[i].stb.toString() });
				}				
			}
			var hideSheet = $ionicActionSheet.show({
			buttons:$scope.buttons,	
			cancelText: 'Cancel',
			cancel: function() {
			},
			
			buttonClicked: function(index) {
				if(index == 0) {
					mysocket.connect($scope.Connections[0].token);
					connected = true;
					TokenId = 0;
					$scope.showConnecting();
					
				}
				
				if(index == 1) {
					mysocket.connect($scope.Connections[1].token);
					TokenId = 1;
					$scope.showConnecting();					
					connected = true;
				}
				
				if(index == 2) {
					mysocket.connect($scope.Connections[2].token);
					connected = true;
					TokenId = 2;
					$scope.showConnecting();
					
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

	 
	 
	 
.controller('VODCtrl', function($scope, $rootScope,  GetVodService, $window, $state, mysocket, $ionicScrollDelegate, $ionicActionSheet, $ionicSlideBoxDelegate, $ionicHistory, $stateParams, myTimeout ) {
	
	$scope.Connections = mysocket.Connections;
	$scope.showConnecting = myTimeout.showConnecting;
	$scope.showDisconnecting = myTimeout.showDisconnecting;
	
    GetVodService.getVODs().then(function(response) {
	    $scope.vods = response.data;
		$ionicSlideBoxDelegate.update();
	})
	
	
	
	$scope.checkLocalStorageToken = function() {
		for(var i=0; i < $scope.Connections.length; i++) {
			if($scope.Connections[i].alive) {
				return true
			}
			else {
				return false;
			}
		}
	}
		
		
	$scope.previousPage = function() {
		$ionicHistory.goBack();
	};
	
	
	$scope.activate_Letter = function(letter, index) {
		$rootScope.activeLetter = letter;
		
	}
		
	$scope.active_Artist = function (Artist, index) {
		$rootScope.activeArtist = Artist;
	}
	
	$scope.active_Word = function (NumberOfWords, index) {
		$rootScope.activeWord = NumberOfWords;
	}
		
	$scope.GoToVODArtistPage = function() {
	
		if($scope.activeLetter.T == 'A'){
			$state.go("VOD.VODsArtistList",{ letter : 1});
		}
			
		else if($scope.activeLetter.T == 'B'){
			$state.go("VOD.VODsArtistList",{ letter: 2});
		}
			
		else if($scope.activeLetter.T == 'C'){
			$state.go("VOD.VODsArtistList",{ letter: 3});
		}
			
		else if($scope.activeLetter.T == 'D'){
			$state.go("VOD.VODsArtistList",{ letter: 4});
		}
			
		else if($scope.activeLetter.T == 'E'){
			$state.go("VOD.VODsArtistList", {letter : 5});
		}	
			
		else if($scope.activeLetter.T == 'F'){
			$state.go("VOD.VODsArtistList",{ letter: 6});
		}
	 
		else if($scope.activeLetter.T == 'G'){
			$state.go("VOD.VODsArtistList",{ letter: 7});
		}
	 
		else if($scope.activeLetter.T == 'H'){
			$state.go("VOD.VODsArtistList",{ letter: 8});
		}
	 
		else if($scope.activeLetter.T == 'I'){
			$state.go("VOD.VODsArtistList", {letter : 9});
		}
	 
		else if($scope.activeLetter.T == 'J'){
			$state.go("VOD.VODsArtistList",{ letter: 10});
		}
	 
		else if($scope.activeLetter.T == 'K'){
			$state.go("VOD.VODsArtistList",{ letter: 11});
		}
	 
		else if($scope.activeLetter.T == 'L'){
			$state.go("VOD.VODsArtistList",{ letter: 12});
		}
	 
		else if($scope.activeLetter.T == 'M'){
			$state.go("VOD.VODsArtistList", {letter : 13});
		}
	 
		else if($scope.activeLetter.T == 'N'){
			$state.go("VOD.VODsArtistList",{ letter: 14});
		}
	 
		else if($scope.activeLetter.T == 'O'){
			$state.go("VOD.VODsArtistList",{ letter: 15});
		}
	 
		else if($scope.activeLetter.T == 'P'){
			$state.go("VOD.VODsArtistList",{ letter: 16});
		}

		else if($scope.activeLetter.T == 'Q'){
			$state.go("VOD.VODsArtistList", {letter : 17});
		}
	 
		else if($scope.activeLetter.T == 'R'){
			$state.go("VOD.VODsArtistList",{ letter: 18});
		}
	 
		else if($scope.activeLetter.T == 'S'){
			$state.go("VOD.VODsArtistList",{ letter: 19});
		}
	 
		else if($scope.activeLetter.T == 'T'){
			$state.go("VOD.VODsArtistList",{ letter: 20});
		}
	 
		else if($scope.activeLetter.T == 'U'){
			$state.go("VOD.VODsArtistList", {letter : 21});
		}
	
		else if($scope.activeLetter.T == 'V'){
			$state.go("VOD.VODsArtistList",{ letter: 22});
		}
	 
		else if($scope.activeLetter.T == 'W'){
			$state.go("VOD.VODsArtistList",{ letter: 23});
		}
		
		else if($scope.activeLetter.T == 'X'){
			$state.go("VOD.VODsArtistList",{ letter: 24});
		}
	 
		else if($scope.activeLetter.T == 'Y'){
			$state.go("VOD.VODsArtistList", {letter : 25});
		}
	 
		else if($scope.activeLetter.T == 'Z'){
			$state.go("VOD.VODsArtistList", {letter : 26});
		}
	
		else{
			$state.go("VOD.VODsArtistList", { letter: 0});
		}
	}
  
	
	
	
	$scope.doRefresh = function() {
		console.log('Refreshing!');
		$scope.Connections = ($window.localStorage.getItem('Connections')!==null) ? JSON.parse($window.localStorage.getItem('Connections')) : [];
		$scope.$broadcast('scroll.refreshComplete');
    }
	
	$scope.scrollToTop = function() {
		$ionicScrollDelegate.scrollTop();
	}	
  
   var connected;
   var TokenId;
   $scope.showActionSheet = function() {
		if(connected == true) {
			// if($scope.activeVOD) { 
				// var hideSheet = $ionicActionSheet.show({
					// buttons: [
						// { text:'Record By Time' },
						// { text:'Launch the RC'},
						// { text:'Disconnect STB'}
					// ],
					
		// destructiveText:'Power Off',
		// cancelText: 'Cancel',
		// cancel: function() {
		// },
		
		// buttonClicked: function(index) {
			// if(index == 0) {
			// }
			
			// if(index == 1) {
			// }
			
			// if(index == 2) {
				// mysocket.disconnect($scope.Connections[TokenId].token);
				// $scope.showDisconnecting();
				// connected = false;
			// }
			
			// return true;
			// },
			
		// destructiveButtonClicked: function() {
			// return true;
		// }
	// });
			// }
		// else {
			var hideSheet = $ionicActionSheet.show({
				buttons: [
					
					{text:'Record By Time'},
					{text:'Launch the RC'},
					{text:'Disconnect STB'}
				],
				
		destructiveText:'Power Off', 	
		cancelText: 'Cancel',
		cancel: function() {
		},
		
		buttonClicked: function(index, objectArr) {
			if(index == 0) {
			}
			
			if(index == 1) {
			}
			
			if(index == 2) {	
			}
			
			if(index == 3) {
				mysocket.disconnect($scope.Connections[TokenId].token);
				$scope.showDisconnecting();
				connected = false;
			}
			
			return true;
			},
			
		destructiveButtonClicked: function() {
			return true;
		}
			});
		//}
		}
		
		else{
			if($scope.checkLocalStorageToken == true){
			return true;
		}
		
		
		else if($scope.Connections.length == 1) {
			 mysocket.connect($scope.Connections[0].token);
			 TokenId = 0;
			 $scope.showConnecting();
			 connected = true;
		}
		
		else if($scope.Connections.length == 2 ) {
			$scope.buttons = [];
			for(var i=0; i < $scope.Connections.length; i++) {
			
				if($scope.Connections[i].alive) {
					$scope.buttons.push({ text: $scope.Connections[i].stb.toString() });
				}				
			}
			var hideSheet = $ionicActionSheet.show({
			buttons:$scope.buttons,
			cancelText: 'Cancel',
			cancel: function() {
			},
			                             
			buttonClicked: function(index) {
				if(index == 0) {
					mysocket.connect($scope.Connections[0].token);
					TokenId = 0;
					$scope.showConnecting();
					connected = true;
				}
				if(index == 1) {
					mysocket.connect($scope.Connections[1].token);
					TokenId = 1;
					$scope.showConnecting();
					connected = true;
				}
				return true;
			},
			})	
		}
		
		else if($scope.Connections.length == 3) {
			$scope.buttons = [];
			console.log($scope.Connections);
			for(var i=0; i < $scope.Connections.length; i++) {
			
				if($scope.Connections[i].alive) {
					$scope.buttons.push({ text: $scope.Connections[i].stb.toString() });
				}				
			}
			var hideSheet = $ionicActionSheet.show({
			buttons: $scope.buttons,
			cancelText: 'Cancel',
			cancel: function() {
			},
			
			buttonClicked: function(index) {
				if(index == 0) {
					mysocket.connect($scope.Connections[0].token);
					TokenId = 0;
					$scope.showConnecting();
					connected = true;
				}
				
				if(index == 1) {
					mysocket.connect($scope.Connections[1].token);
					TokenId = 1;
					$scope.showConnecting();
					connected = true;
				}
				
				if(index == 2) {
					mysocket.connect($scope.Connections[2].token);
					TokenId = 2;
					$scope.showConnecting();
					connected = true;
				}
				
			return true;
			},
			})	
		}
		else {
			$state.go('Settings.Socket');
		}
		}
	}
})

.controller('SocketCtrl',function($scope, $window, mysocket, myTimeout, $ionicActionSheet, $ionicScrollDelegate) {


	$scope.Connections = mysocket.Connections;
	$scope.CurrentConnections = mysocket.CurrentConnections;
	
	mysocket.ObjectData = JSON.parse($window.localStorage.getItem('ObjectData'))
	$scope.ObjectData = mysocket.ObjectData;
	// console.log($scope.ObjectData);
	// console.log($scope.GetConnectionsArr[1].stb_id);
	// console.log($scope.ObjectData[0].cid);

	
	
	 $scope.CheckAlive = function() {
			for(var i=0; i < $scope.Connections.length; i++) {
				if($scope.Connections[i].alive) {
					return true
				}		
				else {
					return false;
				}
			}
	 }

	
	$scope.showConnecting = myTimeout.showConnecting;
	$scope.showDisconnecting = myTimeout.showDisconnecting;
	
	$scope.doRefresh = function() {
		console.log('Refreshing!');
		$scope.Connections = ($window.localStorage.getItem('Connections')!==null) ? JSON.parse($window.localStorage.getItem('Connections')) : [];
		$scope.$broadcast('scroll.refreshComplete');
	}
      
	// $scope.OpenSocket = function(token) {
		// if($scope.GetTokenArr.length == 1) {
			// mysocket.connect($scope.GetTokenArr[0].token.toString() );
			// console.log('Connected');
		// }
		// else {
			// mysocket.connect($scope.GetTokenArr[0].token.toString() );
			// console.log('Connected');
		// }
	// }
	
	
	$scope.OpenSocket = function(index) { 
	var connected;
		if(index == mysocket.CurrentConnections.index) { 
			mysocket.disconnect(index);
			// console.log(connected);
				//$scope.$watch('connected', function() {
				connected = false;
			console.log(connected);
			
			$scope.showDisconnecting();
				//})
		}
		else {
			mysocket.connect(index);
			
			$scope.showConnecting();	
			//$scope.$watch('connected', function() {
				connected = true;
			console.log(connected);
		//})
	
    };
	}
	

	
	
	$scope.moveItem = function(ObjectArr, fromIndex, toIndex) {
		$scope.Connections.splice(fromIndex, 1);
		$scope.Connections.splice(toIndex, 0, ObjectArr );
	}
	
	$scope.Delete = function($index) {
		$scope.Connections.splice($index, 1);    
		localStorage.removeItem($scope.Connections);
		localStorage.setItem("Connections", JSON.stringify($scope.Connections));
		console.log("Deleted");
}
	
	
	$scope.showActionSheet = function() {

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
		for(var i=0; i < $scope.Connections.length; i++) {
			if($scope.Connections[i].alive) {
				return true
			}
			else {
				return false;
			}
		}
	}
	
	// $scope.CloseSocket = function() {
		// mysocket.disconnect();
		
	// }	
		
    // var CheckSocket = true;
	// $scope.SuccessMessage = "";
	// $scope.ToggleSocket = function() {
		// if(CheckSocket) {
			// $scope.OpenSocket();
			// $scope.SuccessMessage = "Connected";
		// }
		// else {
			// $scope.CloseSocket();
			// $scope.SuccessMessage = "Disconnected";
		// }
		// CheckSocket = !CheckSocket;
	// }

	$scope.scrollToTop = function() {
    $ionicScrollDelegate.scrollTop();
	}
})


// .controller('PushCommandCtrl', function($scope){
	// $scope.Push = function() {			
		// var url;
		//url = '/Pairing';
		// $http({
			// method  : 'POST',
			// url     : url,
			//data    : 
			// headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		// }).then(function(response) {
			// if(response.data) { 
			// console.log("response.data");
			
			// }
		// },
		// function(response) { 
		    
			
		// });
	// }
// })

// .controller('PullCommandCtrl', function($scope) {
	// $scope.Pull = function() {	
		// var url;
		// url = '/Pairing';
		// $http({
			// method  : 'POST',
			// url     : url,
			// data    : 
			// headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
		// }).then(function(response) {
			// if(response.data) { 
			
			
			// }
		// },
		// function(response) { 
			
		// });
	// }
// })



.controller('RatingsController', ['$scope', function ($scope) {
 
    $scope.starRating = 0;
    $scope.click = function (param) {
        console.log('Click');
    };
}])

.directive('starRating', function () {
    return {
        scope: {
            rating: '=',
            maxRating: '@',
            click: "&",
           
        },
        restrict: 'EA',
        template:
            "<div style='display: inline-block; margin: 0px; padding: 0px; cursor:pointer;' ng-repeat='idx in maxRatings track by $index'> \
                    <img ng-src='{{((hoverValue + _rating) <= $index) && \"http://www.codeproject.com/script/ratings/images/star-empty-lg.png\" || \"http://www.codeproject.com/script/ratings/images/star-fill-lg.png\"}}' \
                    ng-Click='isolatedClick($index + 1)' \
                    ng-mouseenter='isolatedMouseHover($index + 1)' \
                    ng-mouseleave='isolatedMouseLeave($index + 1)'></img> \
            </div>",
        compile: function (element, attrs) {
            if (!attrs.maxRating || (Number(attrs.maxRating) <= 0)) {
                attrs.maxRating = '5';
            };
        },
		
		
        controller: function ($scope, $element, $attrs) {
            $scope.maxRatings = [];
				
            for (var i = 1; i <= $scope.maxRating; i++) {
                $scope.maxRatings.push({});
            };

            $scope._rating = $scope.rating;
			
			$scope.isolatedClick = function (param) {
				if ($scope.readOnly == 'true') return;

				$scope.rating = $scope._rating = param;
				
				$scope.click({
					param: param
				});
			};

        }
    };
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
