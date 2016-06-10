angular.module('flapperNews', [])
.controller('MainCtrl', [
'$scope',
function($scope){
 	$scope.posts = [
	];
	
	$scope.addPost = function(){
 		if(!$scope.title || $scope.title === '') { return; }
  		$scope.posts.push({
    		title: $scope.title,
    		link: $scope.link,
    		upvotes: 0
  		});
  		$scope.title = '';
  		$scope.link = '';
	};
	
}]);

