gameApp.controller('gameAreaCtrl', function ($scope, $http, $timeout, PriceService, MoneyService, GridService) {
	
	// --------------- BEGIN INITIALIZATIONS --------------- //
	
	$scope.menuCategories = ["residential", "commercial", "industrial", "misc"];
	$scope.menuTiles = ["house", "hopital", "police", "bulldozer"];
	$scope.menuSelectedCategory = "";
	
	$scope.money = MoneyService.updateMoney();
	$scope.grid = GridService.initGrid();
	
	$scope.updateTime = 30;
	
	var updateGame = function () {
		$scope.updateTime -= 1;
		if ($scope.updateTime == 0) {
			$scope.updateTime = 30;
			MoneyService.calcMoneyIncome ();
			$scope.money = MoneyService.updateMoney();
		}
		$timeout(updateGame, 1000);
	};
	$timeout(updateGame, 1000);
	
	// --------------- END INITIALIZATIONS --------------- //
	
	$scope.selectCategory = function (category) {
		if (category != $scope.menuSelectedCategory) {
			var tmpCategory = $scope.menuSelectedCategory;
			$scope.menuSelectedCategory = category;
			angular.element(document.querySelector("#menu_category_" + category)).removeClass('menu_category').addClass('tile_highlighted_blue');
			angular.element(document.querySelector("#menu_category_" + tmpCategory)).removeClass('tile_highlighted_blue').addClass('menu_category');
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
			var actionDone = GridService.changeTile (x, y, $scope.selectedTile);
			$scope.grid = GridService.updateGrid();
			if (actionDone) {
				MoneyService.changeMoneyValue(PriceService.priceOf($scope.selectedTile), '-');
				$scope.money = MoneyService.updateMoney();
			}
		} else {
			// TO DO
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