'use strict';

var planApp = {};

planApp.dueToday = 0;
planApp.dueMonthly = 0;

var doc = document;
var form = document.querySelector('form');

//updates price for today
planApp.updateToday = function (price) {
	planApp.dueToday = price;
	doc.querySelector('.dueToday').innerHTML = '$ ' + planApp.dueToday;
};

//updates price for monthly
planApp.updateMonthy = function (price) {
	planApp.dueMonthly = price;
	doc.querySelector('.dueMonthly').innerHTML = '$ ' + planApp.dueMonthly;
};

planApp.changeEvents = function () {

	//execute when user makes any selection
	form.addEventListener('change', function (e) {
		var gb = parseInt(e.target.dataset.gb);
		var gbText = e.target.dataset.text;
		var price = parseInt(e.target.value);

		//executes only if there is data text 
		if (gbText) {
			doc.getElementById('gb').innerHTML = '' + gbText;
		}
		//executes only if element with data-gb attr is selected
		if (gb !== undefined) {

			if (gb === 200) {
				doc.getElementById('outright').checked = true;
				doc.getElementById('monthlyLabel').classList.add("remove");
			} else if (gb === 0) {
				doc.getElementById('monthly').checked = true;
				doc.getElementById('monthlyLabel').classList.remove("remove");
			}
		}
		//making sure to update the appropriate due time for each step
		if (e.target.name === "step1" || e.target.name === "step2") {
			planApp.updateToday(price);
		} else {
			planApp.updateMonthy(price);
			doc.querySelector('button').classList.add('show');
		}
	});
};

planApp.buyPlan = function () {
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		doc.querySelector('.modal').classList.add('show');
	});
};

planApp.init = function () {
	planApp.buyPlan();
	planApp.changeEvents();
};

// self executing function here / document ready
(function () {
	planApp.init();
})();