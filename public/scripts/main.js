'use strict';

var planApp = {};

planApp.dueToday = 0;
planApp.dueMonthly = 0;

var form = doc.querySelector('form');

//updates price for today
planApp.updateToday = function (price) {
	planApp.dueToday = price;
	doc.querySelectorAll('.dueToday').forEach(function (item) {
		item.innerHTML = '$ ' + planApp.dueToday;
	});
};

//updates price for monthly
planApp.updateMonthy = function (price) {
	planApp.dueMonthly = price;
	doc.querySelectorAll('.dueMonthly').forEach(function (item) {
		item.innerHTML = '$ ' + planApp.dueMonthly;
	});
};

planApp.changeEvents = function () {
	//execute when user makes any selection
	form.addEventListener('change', function (e) {
		var gb = parseInt(e.target.dataset.gb);
		var gbText = e.target.dataset.text;
		var price = parseInt(e.target.value);

		//executes only if there is data text 
		if (gbText) {
			doc.querySelectorAll('.gb').forEach(function (item) {
				item.innerHTML = '' + gbText;
			});
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
			doc.querySelector('.button-buy').classList.add('show');
		}
	});

	planApp.closeModal();
};

//Executes when user clicks buy button
planApp.buyPlan = function () {
	form.addEventListener('submit', function (e) {
		e.preventDefault();
		doc.querySelector('.modal').classList.add('show');
	});
};

planApp.sweetAlert = function () {
	doc.querySelector('.button-confirm').addEventListener('click', function () {
		swal("Confirmed", "Great choices, you're ready to buy!", "success");
	});
};

planApp.closeModal = function () {
	doc.querySelector('.close-modal').addEventListener('click', function (e) {
		doc.querySelector('.modal').classList.remove('show');
	});
};

planApp.init = function () {
	planApp.buyPlan();
	planApp.changeEvents();
	planApp.sweetAlert();
};

// self executing function here / document ready
window.onload = planApp.init;