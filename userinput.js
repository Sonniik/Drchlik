function executeInput() {
	// validate command length
	let commanField = document.getElementById("command_input");
	let commandInput = commanField.value;
	commanField.value = '';

	// parse start/stop commands
	if (commandInput.toLowerCase() == "start") {
		runFlag = true;
		ui.log("Hra spuštěna");
		return;
	}
	if (commandInput.toLowerCase() == "stop") {
		runFlag = false;
		ui.log("Hra zastavena");
		return;
	}

	if (commandInput.length != 4) {
		ui.error('Neplatný příkaz');
		return;
	}

	// validate inputed team index
	let inputTeamIndex = parseInt(commandInput.slice(0,1),10)-1;
	if (isNaN(inputTeamIndex) || inputTeamIndex < 0 || inputTeamIndex > teamCount-1) {
		ui.error('Neplatný příkaz, tým neexistuje');
		return;
	}

	// validate inputed coordinates
	let inputXCoords = parseCoords(commandInput.slice(1,2));
	let inputYCoords = parseCoords(commandInput.slice(2,3));
	if (isNaN(inputXCoords) || isNaN(inputYCoords)) {
		ui.error('Neplatné hodnoty souřadnic');
		return;
	}

	// validate and perform valid action
	switch (commandInput.slice(-1)) {
		case '+': // add beer to field
			if (field.addBeer(inputXCoords,inputYCoords,inputTeamIndex) == true) {
				ui.log('Tým ' + (inputTeamIndex+1) + ' položil pivo na poli ' + printCoords(inputXCoords,inputYCoords));
				teams[inputTeamIndex].usedBeers++;
				break;
			}
			ui.warn('Na poli '+printCoords(inputXCoords,inputYCoords)+' již pivo leží.')
			break;

		case '-': // remove beer from field
			let beer = field.getBeer(inputXCoords,inputYCoords); // get beer on tile

			// check if tile has a beer
			if (beer == null) {
				ui.warn('Nelze oddělat pivo z pole '+printCoords(inputXCoords,inputYCoords)+'. Žádné zde není.');
				break;
			}

			// do not delete your own beer
			if (beer.teamIndex == inputTeamIndex) {
				ui.warn('Tým ' + (inputTeamIndex+1) + ': Nelze odstranit své vlastní pivo.');
				break;
			}

			teams[beer.teamIndex].usedBeers -= 1; // subtract from used beers
			field.deleteBeer(inputXCoords,inputYCoords); // remove beer from field
			ui.log('Pivo odebráno z pole '+printCoords(inputXCoords,inputYCoords)+' týmem '+(inputTeamIndex+1)+'.');
			break;

		default: // not a valid action
			ui.warn('Neplatný příkaz');
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

function printCoords(xCoords, yCoords) {
	return '['+xCoords+';'+yCoords+']';
}
