let moveTimerLength = 10;
let roundTimerLength = 20;

// dodělat přepsání variables na timer
let moveTimerCounter = 0;
let roundTimerCounter = 0;

let roundCounter = 1;

function incrementCounters() {
	moveTimerCounter = (moveTimerCounter+1) % moveTimerLength;
	roundTimerCounter = (roundTimerCounter+1) % roundTimerLength;
	
	if (moveTimerCounter == 0){
		grandpa.move(field.beers, teams);
		drinkBeer();
	}
	if (roundTimerCounter == 0) {
		roundCounter++;
		addPoints();
	}
	ui.updateUI();
}

window.setInterval(incrementCounters,1000);
