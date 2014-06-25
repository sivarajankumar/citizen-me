gameApp.service ('TooltipService', function() {
	this.position = {
		x : 0,
		y : 0
	};

	this.srcElement = null;
	this.tooltipHtml = null;
	oThis = this;

	this.init = function(event) {
		oThis.position.x = event.clientX;
		oThis.position.y = event.clientY;	 
 		oThis.srcElement = event.target;
		oThis.imgDownArrow = angular.element(document.querySelector('#downTooltip'));
		oThis.tooltipHtml = angular.element(document.querySelector('#tooltipElement'));
	};

	this.showTooltip = function() {
		oThis.tooltipHtml.css('width', 200 + "px");
		oThis.tooltipHtml.css('height', 60  + "px");
		oThis.tooltipHtml.css('left', (oThis.srcElement.offsetLeft + (parseInt(oThis.srcElement.width) / 2)) - (parseInt(oThis.tooltipHtml[0].style.width) / 2) + "px");
		oThis.tooltipHtml.css('top', oThis.srcElement.offsetTop - (parseInt(oThis.tooltipHtml[0].style.height)) - 10 + "px");
		oThis.tooltipHtml.css('display','block');
		oThis.imgDownArrow.css('left', (oThis.srcElement.offsetLeft + (parseInt(oThis.srcElement.width) / 2)) - 15 + "px");
		oThis.imgDownArrow.css('top', oThis.srcElement.offsetTop - 20 + "px")
		oThis.imgDownArrow.css('display', 'block')
	};

	this.unshowTooltip = function() {
		oThis.tooltipHtml.css('display','none');
		oThis.imgDownArrow.css('display', 'none')
	};

	this.addHtmlInTooltip = function(html) {	
		oThis.tooltipHtml[0].innerHTML = html;
	};
});																											