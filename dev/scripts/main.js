const planApp = {}

planApp.dueToday = 0;
planApp.dueMonthly = 0;

const doc = document;
const form = document.querySelector('form');

//updates price for today
planApp.updateToday = (price) => {
	planApp.dueToday = price;
	doc.querySelector('.dueToday').innerHTML = `$ ${planApp.dueToday}`;
}

//updates price for monthly
planApp.updateMonthy = (price) => {
	planApp.dueMonthly = price;
	doc.querySelector('.dueMonthly').innerHTML = `$ ${planApp.dueMonthly}`;
}

planApp.changeEvents = () => {

	//execute when user makes any selection
	form.addEventListener('change', function(e){
		const gb = parseInt(e.target.dataset.gb);
		const gbText = e.target.dataset.text;
		const price = parseInt(e.target.value);

		//executes only if there is data text 
		if(gbText) {
			doc.getElementById('gb').innerHTML = `${gbText}`;
		}
		//executes only if element with data-gb attr is selected
		if( gb !== undefined ) {
			
			if(gb === 200) {
				doc.getElementById('outright').checked = true;
				doc.getElementById('monthlyLabel').classList.add("remove");
			} else if (gb === 0) {
				doc.getElementById('monthly').checked = true;
				doc.getElementById('monthlyLabel').classList.remove("remove");
			}
		}
		//making sure to update the appropriate due time for each step
		if(e.target.name === "step1" || e.target.name === "step2") {
			planApp.updateToday(price);
		}
		else {
			planApp.updateMonthy(price);
			doc.querySelector('button').classList.add('show');
		} 
	});
}

planApp.buyPlan = () => {
	form.addEventListener('submit', function(e){
		e.preventDefault();
		doc.querySelector('.modal').classList.add('show');
	}); 
}

planApp.init = () => {
	planApp.buyPlan();
	planApp.changeEvents();
}

// self executing function here / document ready
(function() {
	planApp.init();

})();