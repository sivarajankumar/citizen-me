var gameApp = angular.module('gameApp', []);

gameApp.controller('gameAreaCtrl', function ($scope, $http) {
	
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
	    	// If using the web app locally, some browsers won't allow to $http.get files from different folders
	    	// Mozilla Firefox should allow it though
	    	alert('Grid cannot be loaded.');
	    });
	
	$scope.range = function(number) {
		return new Array(number);
	};
	
	$scope.highlight = function(x, y) {
		angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tile').addClass('tile_highlighted');
	};
	
	$scope.resetCoordinates = function () {
		$scope.coordinates = "";
	};
	
	$scope.showCoordinates = function (x, y) {
		$scope.coordinates = x + " ; " + y;
	};
	
	$scope.selectElementToAdd = function (tile) {
		var url_cursor = "'" + "img/" + tile + ".jpg" + "'";
		document.body.style.cursor = "url(" + url_cursor + "), auto";
	};
	
	$scope.resetCursor = function () {
		document.body.style.cursor = 'auto';
	};
	
});