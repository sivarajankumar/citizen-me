var gameApp = angular.module('gameApp', []);

gameApp.controller('gameAreaCtrl', function ($scope, $http) {
	var number = 50;
	
	// Initialization of the grid from grid.json file
	$http.get('files/grid.json').
		success(function(data) {
			$scope.game = angular.fromJson(data);
			var cpt = 0;
			$scope.game.grid.tiles = new Array;
			for (var i = 0; i < number; ++i) {
				for (var j = 0; j < number; ++j) {
					// TO DO
				}
			}
	    }).
	    error(function(data) {
	    	alert('no');
	    });
	
	$scope.range = function(number) {
		return new Array(number);
	};
	
	$scope.showCoordinates = function (x, y) {
		// alert (x + ';' + y);
	};

});