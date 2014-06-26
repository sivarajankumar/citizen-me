gameApp.service ('GridService', function ($http, PriceService, MoneyService) {
	
	var GRASS = "0";
	var HOUSE = "1";
	var HOPITAL = "2";
	var POLICE = "3";
	
	var grid;
	
	this.initGrid = function () {
		var oThis = this;
		// Initialization of the grid from grid.json file
		$http.get('files/grid.json').
			success(function(data) {
				var tmpGrid = angular.fromJson(data);
				grid = tmpGrid.grid;
				var gridWidth = 50;
				for (var i = 0; i < gridWidth; ++i) {
					for (var j = 0; j < gridWidth; ++j) {
						// Default grid tiles are grass, unneeded class changes are avoided
						if (grid[i][j]['id'] != GRASS) {
							angular.element(document.querySelector('#tile_' + i + '_' + j)).removeClass('tile').addClass('tile_' + oThis.getTileName(grid[i][j]['id']));
						}
					}
				}
				var gridAreaHtml = angular.element(document.querySelector('#game'));
				var centerTopGrid = (gridAreaHtml[0].scrollTopMax)/2;
				var centerLeftGrid = (gridAreaHtml[0].scrollLeftMax)/2;
				gridAreaHtml[0].scrollTop = centerTopGrid;
				gridAreaHtml[0].scrollLeft = centerLeftGrid;
		    }).
		    error(function(data) {
		    	// If using the web app locally, some browsers won't allow to $http.get files from different folders
		    	// Mozilla Firefox should allow it though
		    	alert('Grid cannot be loaded.');
		    });	
	};
	
	this.changeTile = function (x, y, actionTile) {
		if (this.isBuilding (x, y)) {
			if (actionTile == 'bulldozer') {
				var tileRemoved = this.getTileName(grid[x][y]['id']);
				angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tile' + tileRemoved).addClass('tile');
				grid[x][y]['id'] = GRASS;
				MoneyService.changeIncomeValue (PriceService.incomeOf(tileRemoved), '-');
				return 1;
			}
		} else {
			if (actionTile != 'bulldozer') {
				if (PriceService.canPurchase(actionTile)) {
					grid[x][y]['id'] = this.getTileId (actionTile);
					angular.element(document.querySelector('#tile_' + x + '_' + y)).removeClass('tile').addClass('tile' + actionTile);
					MoneyService.changeIncomeValue (PriceService.incomeOf(actionTile), '+');
					return 1;
				} else {
					return 0;
				}
			}
		}
		return 0;
	};
	
	this.updateGrid = function () {
		return grid;
	};
	
	this.isBuilding = function (x, y) {
		if (grid[x][y]['id'] != "0") {
			return true;
		} else {
			return false;
		}
	};
	
	this.getTileName = function (tileId) {
		switch (tileId) {
			case GRASS:
				return "grass";
			case HOUSE:
				return "house";
			case HOPITAL:
				return "hopital";
			case POLICE:
				return "police";
			default:
				return "grass";
		}
	};
	
	this.getTileId = function (tileName) {
		switch (tileName) {
			case "grass":
				return GRASS;
			case "house":
				return HOUSE;
			case "hopital":
				return HOPITAL;
			case "police":
				return POLICE;
			default:
				return GRASS;
		}
	};

	this.showPopup = function (x, y) {
		
	};
	
	this.showSaveJSON = function ($scope) {
		$scope.saveJSON = angular.toJson(grid, true);
	};

	this.showLoadJSON = function ($scope) {
		$scope.saveJSON = "Not ready yet."
	};

});