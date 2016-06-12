var app = angular.module('App', ['ui.bootstrap', 'ngCookies']);

app.factory('ItemsService', ['$cookies', function($cookies) {
    var cookieName = 'items'
    return {
      get: function(defaults) {
        return $cookies.get(cookieName).split(',') || defaults
      },
      put: function(items) {
        var expireDate = new Date()
        expireDate.setDate(expireDate.getDate() + 1);
        $cookies.put(cookieName, items.join(','), { expires: expireDate } )
      }
    }
}]);

app.filter('startFrom', function () {
	return function (input, start) {
		if (input) {
			start = +start;
			return input.slice(start);
		}
		return [];
	};
});

app.controller('MainCtrl', ['$scope', 'filterFilter', 'ItemsService', function ($scope, filterFilter, ItemsService) {
	var itemscookie = ItemsService.get($scope.items);
	if (itemscookie.length == 0) {
		$scope.items = ["name 1", "name 2", "name 3", "name 4", "name 5", "name 6", "name 7", "name 8", "name 10", "custom", "custom 2"];
	}
	else {
	$scope.items = ItemsService.get($scope.items);
	};
	<!--$scope.items = ["name 1", "name 2", "name 3", "name 4", "name 5", "name 6", "name 7", "name 8", "name 10", "custom", "custom 2"];
	
	$scope.addLink = function () {
        $scope.errortext = "";
        if (!$scope.newItem) {return;}
        if ($scope.items.indexOf($scope.newItem) == -1) {
            $scope.items.push($scope.newItem);
			$scope.errortext = "Thank you for your submition";
			ItemsService.put($scope.items)
        } else {
            $scope.errortext = "Link already in the list";
        }
    };
	
	$scope.removeItem = function(item) {
    	$scope.items.splice($scope.items.indexOf(item), 1);
		ItemsService.put($scope.items)
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
	$scope.$watch('search', function (Val) {
		$scope.filtered = filterFilter($scope.items, Val);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
	}, true);
	
}]);