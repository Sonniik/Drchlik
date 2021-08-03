let moveTimerLength = 60;
let roundTimerMult = 3;

// dodělat přepsání variables na timer
let moveTimerCounter = 0;
let roundTimerCounter = 0;

let roundCounter = 1;

let runFlag = false;

function incrementCounters() {
	if (runFlag == false) return;

	moveTimerCounter = (moveTimerCounter+1) % moveTimerLength;
	roundTimerCounter = (roundTimerCounter+1) % (moveTimerLength * roundTimerMult);
	
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

//window.setInterval(incrementCounters,1000);

let interval = 1000; // ms
let expected = Date.now() + interval;
setTimeout(step, interval);
function step() {
	let delta = Date.now() - expected; // the drift (positive for overshooting)
	
	incrementCounters();

	expected += interval;
	setTimeout(step, Math.max(0, interval - delta)); // take into account drift
}
