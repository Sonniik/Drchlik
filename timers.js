let moveDelayLength = 10;
let roundLength = 20;

let moveCounter = 0;
let roundTimeCounter = 0;
let roundCounter = 1;

function incrementCounters() {
	moveCounter = (moveCounter+1) % moveDelayLength;
	roundTimeCounter = (roundTimeCounter+1) % roundLength;
	
	if (moveCounter == 0){
		grandpa.move(field.beers, teams);
		drinkBeer();
	}
	if (roundTimeCounter == 0) {
		roundCounter++;
		addPoints();
	}
}

window.setInterval(incrementCounters,1000);
