var gameApp = angular.module('gameApp', []);

gameApp.controller('gameAreaCtrl', function ($scope, $http) {
	
	$scope.menuCategories = ["residential", "commercial", "industrial", "misc"];
	$scope.menuTiles = ["house", "hopital", "police", "bulldozer"];
	$scope.menuSelectedCategory = "";
	
	// Initialization of the grid from grid.json file
	$http.get('files/grid.json').
		success(function(data) {
			$scope.game = angular.fromJson(data);
			var number = 50;
			$scope.game.grid.tiles = new Array;
			for (var i = 0; i < number; ++i) {
				$scope.game.grid.tiles[i] = new Array;
				for (var j = 0; j < number; ++j) {
					$scope.game.grid.tiles[i][j] = $scope.game.grid.initTiles[i * number + j];
					if ($scope.game.grid.tiles[i][j] != 'grass') {
						angular.element(document.querySelector('#tile_' + i + '_' + j)).removeClass('tile').addClass('tile_' + $scope.game.grid.tiles[i][j]);
					}
				}
			}
	    }).
	    error(function(data) {
	    	// If using the web app locally, some browsers won't allow to $http.get files from different folders
	    	// Mozilla Firefox should allow it though
	    	alert('Grid cannot be loaded.');
	    });
	
	$scope.selectCategory = function (category) {
		if (category != $scope.menuSelectedCategory) {
			var tmpCategory = $scope.menuSelectedCategory;
			$scope.menuSelectedCategory = category;
			angular.element(document.querySelector("#menu_category_" + category)).removeClass('menu_tile').addClass('tile_highlighted_blue');
			angular.element(document.querySelector("#menu_category_" + tmpCategory)).removeClass('tile_highlighted_blue').addClass('menu_tile');
		}
	};
	
	$scope.selectedCategory = function (category) {
		return category == $scope.menuSelectedCategory;
	};
	
	$scope.range = function(number) {
		return new Array(number);
	};
	
	$scope.highlight = function(x, y) {
		angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tile').addClass('tile_highlighted');
	};
	
	$scope.resetCoordinates = function () {
		$scope.coordinates = "";
	};
	
	$scope.noCategorySelected = function () {
		return this.menuSelectedCategory == "";
	};
	
	$scope.showCoordinates = function (x, y) {
		$scope.coordinates = x + " ; " + y;
	};
	
	$scope.clickTile = function (x, y) {
		if ($scope.selectedTile != null) {
			if ($scope.selectedTile == 'bulldozer') {
				if (this.isBuilding(x, y)) {
					alert ('You destroyed a building');
					angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tile_' + $scope.game.grid.tiles[x][y]).addClass('tile');
					$scope.game.grid.tiles[x][y] = 'grass';
				}				
			} else {
				if (this.isBuilding(x, y)) {
					alert ('There is already a building on this tile, destroy it first !');
				} else {
					$scope.game.grid.tiles[x][y] = $scope.selectedTile;
					angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tile').addClass('tile_' + $scope.selectedTile);
				}
			}
		} else {
			// TO DO
		}
	};
	
	$scope.isBuilding = function (x, y) {
		if ($scope.game.grid.tiles[x][y] != 'grass') {
			return true;
		} else {
			return false;
		}
	};
	
	$scope.selectElementToAdd = function (tile) {
		var url_cursor = "'" + "img/" + tile + ".jpg" + "'";
		document.body.style.cursor = "url(" + url_cursor + "), auto";
		$scope.selectedTile = tile;
	};
	
	$scope.resetCursor = function () {
		$scope.selectedTile = null;
		document.body.style.cursor = 'auto';
	};
	
});

gameApp.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                fn(scope, {$event:event});
            });
        });
    };
});