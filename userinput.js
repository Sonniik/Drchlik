function executeInput() {
	// validate command length
	let commandInput = document.getElementById("command_input").value;
	if (commandInput.length != 4) {
		console.warn('Invalid input length');
		return;
	}

	// validate inputed team index
	let inputTeamIndex = parseInt(commandInput.slice(0,1),10)-1;
	if (isNaN(inputTeamIndex) || inputTeamIndex < 0 || inputTeamIndex > teamCount-1) {
		console.warn('Invalid input, team does not exist');
		return;
	}

	// validate inputed coordinates
	let inputXCoords = parseCoords(commandInput.slice(1,2));
	let inputYCoords = parseCoords(commandInput.slice(2,3));
	if (isNaN(inputXCoords) || isNaN(inputYCoords)) {
		console.warn('Invalid input coordinates');
		return;
	}

	// validate and perform valid action
	switch (commandInput.slice(-1)) {
		case '+': // add beer to field
			if (field.addBeer(inputXCoords,inputYCoords,inputTeamIndex) == true) {
				console.log('beer added');
				teams[inputTeamIndex].usedBeers++;
				break;
			}
			console.warn('You cannot place a beer here')
			break;

		case '-': // remove beer from field
			let beer = field.getBeer(inputXCoords,inputYCoords); // get beer on tile

			// check if tile has a beer
			if (beer == null) {
				console.warn("fuck you");
				break;
			}

			// do not delete your own beer
			if (beer.teamIndex == inputTeamIndex) {
				console.warn("fuck you team");
				break;
			}

			teams[beer.teamIndex].usedBeers -= 1; // subtract from used beers
			field.deleteBeer(inputXCoords,inputYCoords); // remove beer from field
			console.log("beer removed");
			break;

		default: // not a valid action
			console.warn('Invalid input, last character must be + or -');
			break;
	}
}

function parseCoords(coords) {
    if (coords.toLowerCase() == 'a') {
        return 10;
    } else {
        return parseInt(coords);
    }
}
