gameApp.service('PriceService', function() {
	var prices = {
			house:"1000",
			hopital:"5000",
			police:"2000",
			bulldozer:"0"
		};
	
	this.priceOf = function (element) {
		return prices[element];
	};
});