angular.module('webLinks', [])
.controller('MainCtrl', [
'$scope',
function($scope){
	$scope.links = ["www.google.com", "www.o2.co.uk", "www.three.co.uk"];
    
	$scope.addLink = function () {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        if ($scope.links.indexOf($scope.addMe) == -1) {
            $scope.links.push($scope.addMe);
			$scope.errortext = "Thank you for your submittion";
        } else {
            $scope.errortext = "Link already in the list";
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";    
        $scope.links.splice(x, 1);
    }

	
	
}]);

