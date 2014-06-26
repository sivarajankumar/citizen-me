gameApp.service ('MoneyService', function () {
	var money = {
			value:50000,
			income:1000,
			incomeSign:"+"
	};
	
	this.updateMoney = function () {
		return money;
	};
	
	this.calcMoneyIncome = function () {
		this.updateIncome();
		money.value += money.income;
	};

	this.getMoneyValue = function () {
		return money.value;
	};

	this.changeIncomeValue = function (val, sign) {
		if (sign == '+') {
			money.income += val;
		} else {
			money.income -= val;
		}
		money.incomeSign = (money.income < 0) ? "" : "+";
	}
	
	this.changeMoneyValue = function (val, sign) {
		if (sign == '+') {
			money.value += val;
		} else {
			money.value -= val;
		}
	};
	
	this.updateIncome = function () {
		money.income += 0;
	};
});