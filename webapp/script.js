var app = angular.module('App', ['ui.bootstrap']);

app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});

app.controller('MainCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter) {
	$scope.items = ["name 1", "name 2", "name 3", "name 4", "name 5", "name 6", "name 7", "name 8", "name 10", "custom", "custom 2"
	];
	
	$scope.addLink = function () {
        $scope.errortext = "";
        if (!$scope.newItem) {return;}
        if ($scope.items.indexOf($scope.newItem) == -1) {
            $scope.items.push($scope.newItem);
			$scope.errortext = "Thank you for your submittion";
        } else {
            $scope.errortext = "Link already in the list";
        }
    };
	
	$scope.removeItem = function(item) {
    	$scope.items.splice($scope.items.indexOf(item), 1);
		$scope.resetFilters;
  	};
	
	$scope.getResult = function($index, x) {
    	$scope.indexResult = $scope.items[$index];
    	$scope.itemResult = x;
	};
	

	// create empty search model (object) to trigger $watch on update
	$scope.search = {};
	
	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};

	// pagination controls
	$scope.currentPage = 1;
	$scope.totalItems = $scope.items.length;
	$scope.entryLimit = 10; // items per page
	$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

	// $watch search to update pagination
	$scope.$watch('search', function (term) {
		$scope.filtered = filterFilter($scope.items, term);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
	
}]);