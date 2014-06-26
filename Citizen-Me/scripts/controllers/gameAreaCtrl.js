gameApp.controller('gameAreaCtrl', function ($scope, $http, $timeout, PriceService, MoneyService, GridService, TooltipService) {
	
	// --------------- BEGIN INITIALIZATIONS --------------- //
	
	$scope.menuCategories = ["residential", "commercial", "industrial", "misc"];

	$scope.residentialTiles = ["house", "hopital"];
	$scope.commercialTiles = [];
	$scope.industrialTiles = [];
	$scope.miscTiles = ["police", "bulldozer"];

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

	$scope.elementToAdd = "";

	$scope.saveArea = false;
	$scope.loadArea = false;

	$scope.saveJSON = "Test";

	$scope.tooltip = [];
	
	// --------------- END INITIALIZATIONS --------------- //
	
	$scope.selectCategory = function (category) {
		if ($scope.selectedTile != null) {
			angular.element(document.querySelector("#menu_tile_" + $scope.selectedTile)).css('border', '3px outset blue');
		}
		this.resetCursor();
		if (category != $scope.menuSelectedCategory) {
			var tmpCategory = $scope.menuSelectedCategory;
			$scope.menuSelectedCategory = category;
			angular.element(document.querySelector("#menuCategory" + category)).removeClass('menuCategory').addClass('menuCategorySelected');
			angular.element(document.querySelector("#menuCategory" + tmpCategory)).removeClass('menuCategorySelected').addClass('menuCategory');
		}
	};
	
	$scope.selectedCategory = function (category) {
		return category == $scope.menuSelectedCategory;
	};
	
	$scope.range = function(number) {
		return new Array(number);
	};
	
	$scope.resetCoordinates = function () {
		$scope.coordinates = "";
	};
	
	$scope.noCategorySelected = function () {
		return this.menuSelectedCategory == '';
	};
	
	$scope.showCoordinates = function (x, y) {
		$scope.coordinates = x + ' ; ' + y;
	};

	$scope.mouseDownTile = function (x, y, event) {
		event.preventDefault();
		// Right click
		if (event.which != 3) {
			angular.element(document.querySelector('#tile_' + x + '_' + y)).addClass('tmpTile');
			$scope.elementToAdd = x.toString() + ';' + y.toString();
		}
	};

	$scope.resetSelectedTile = function () {
		var split = $scope.elementToAdd.split(";");
		angular.element(document.querySelector('#tile_' + split[0] + '_' + split[1])).removeClass('tmpTile');
		$scope.elementToAdd = "";
	};

	$scope.mouseHoverTile = function (x, y) {
		if ($scope.selectedTile != null) 
		{
			if ($scope.elementToAdd != "") {
				var split = $scope.elementToAdd.split(";");
				angular.element(document.querySelector('#tile_' + split[0] + '_' + split[1])).removeClass('tmpTile');
				if ($scope.selectedTile != 'police' && $scope.selectedTile != 'bulldozer') {
					$scope.elementToAdd = "";
				} else {
					this.clickTile(split[0], split[1]);
					angular.element(document.querySelector('#tile_' + x + '_' + y)).addClass('tmpTile');
					$scope.elementToAdd = x.toString() + ';' + y.toString();
				}
			}
		} else {
			GridService.showPopup(x, y);
		}
		
	};
	
	$scope.mouseUpTile = function (x, y, event) {
		if (event.which != 3) {
			if ($scope.elementToAdd == x.toString() + ';' + y.toString()) {
				angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tmpTile');
				this.clickTile (x, y);
			} 
		} else {
			if ($scope.elementToAdd != "") {
				angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tmpTile');
			}
		}
		$scope.elementToAdd = "";
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
			// Display tile's popup
		}
	};
	
	$scope.selectElementToAdd = function (tile) {
		var url_cursor = "'" + "img/" + tile + ".jpg" + "'";
		document.body.style.cursor = "url(" + url_cursor + "), auto";
		angular.element(document.querySelector("#menu_tile_" + tile)).css('border', '3px inset blue');
		if ($scope.selectedTile != null) {
			angular.element(document.querySelector("#menu_tile_" + $scope.selectedTile)).css('border', '3px outset blue');
		}
		$scope.selectedTile = tile;
	};
	
	$scope.resetCursor = function () {
		$scope.selectedTile = null;
		document.body.style.cursor = 'auto';
	};
	
	$scope.createToolTip = function(event, category) {
		this.tooltip.name = category.toUpperCase();
		this.tooltip.price = PriceService.priceOf(category);
		this.tooltip.income = PriceService.incomeOf(category);
		TooltipService.init(event);
		TooltipService.showTooltip();
	};

	$scope.unshowToolTip = function(event) {
		TooltipService.unshowTooltip();
	}

	$scope.showSaveArea = function () {
		if (this.saveArea) {
			this.saveArea = false;
		} else {
			this.saveArea = true;
			this.loadArea = false;
			GridService.showSaveJSON($scope);
		}
	};

	$scope.showLoadArea = function () {
		if (this.loadArea) {
			this.loadArea = false;
		} else {
			$scope.loadArea = true;
			$scope.saveArea = false;
			GridService.showLoadJSON($scope);
		}
	};
	
	$scope.save = function () {
		return this.saveArea;
	};

	$scope.load = function () {
		return this.loadArea;
	};

});