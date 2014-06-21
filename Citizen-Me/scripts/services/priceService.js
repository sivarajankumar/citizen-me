gameApp.service('PriceService', function() {
	var prices = {
			house:"1000",
			hopital:"5000",
			police:"2000",
			bulldozer:"0"
		};

	var incomes = {
			house:50,
			hopital:-200,
			police:-50,
			bulldozer:0
	};
	
	this.priceOf = function (element) {
		return prices[element];
	};

	this.incomeOf = function (element) {
		return incomes[element];
	};
});