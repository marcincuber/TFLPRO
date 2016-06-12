var app = angular.module('App', ['ui.bootstrap', 'ngCookies']);

app.factory('ItemsService', ['$window', function($window) {
     var storageKey = 'items',
        _sessionStorage = $window.sessionStorage;

     return {
        // Returns stored items array if available or return undefined
        getItems: function() {
            var itemsStr = _sessionStorage.getItem(storageKey);

            if(itemsStr) {
                return angular.fromJson(itemsStr);
            }         

            return ['name1', 'name2', 'name3']; // return default value when there is nothing stored in sessionStore                
        },
        // Adds the given item to the stored array and persists the array to sessionStorage
        putItem: function(item) {
            var itemsStr = _sessionStorage.getItem(storageKey),
            items = [];

            if(itemStr) {
                items = angular.fromJson(itemsStr);
            }

            items.push(item);

            _sessionStorage.setItem(storageKey, angular.toJson(items));
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

app.controller('MainCtrl', ['$scope', 'filterFilter', function ($scope, filterFilter, ItemsService) {
	
	//$scope.items = ['name1', 'name2', 'name3'];
	$scope.items = ItemsService.getItems();
	
	$scope.WriteCookie = function () {
        ItemsService.putItem($scope.items);
    };
	$scope.ReadCookie = function () {
    	$window.alert(ItemsService.getItems($scope.items));
    };
	
	<!-- $scope.items = ["name 1", "name 2", "name 3", "name 4", "name 5", "name 6", "name 7", "name 8", "name 10", "custom", "custom 2"]; 
	
	$scope.addLink = function () {
        $scope.errortext = "";
        if (!$scope.newItem) {return;}
        if ($scope.items.indexOf($scope.newItem) == -1) {
            $scope.items.push($scope.newItem);
			ItemsService.put($scope.items);
			$scope.errortext = "Thank you for your submition";
        } else {
            $scope.errortext = "Link already in the list";
        }
    };
	
	$scope.removeItem = function(item) {
    	$scope.items.splice($scope.items.indexOf(item), 1);
		$scope.resetFilters;
		$cookies.put('allItems', $scope.items)
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