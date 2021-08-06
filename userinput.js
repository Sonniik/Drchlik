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

	if (runFlag == false) {
		ui.warn("Hra pozastavena, příkaz ignorován");
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
	let inputXCoords = parseInt(commandInput.slice(1,2).toLowerCase(),16);
	let inputYCoords = parseInt(commandInput.slice(2,3).toLowerCase(),16);

	if (isNaN(inputXCoords) || isNaN(inputYCoords)
		|| inputXCoords < 0 || inputXCoords >= field.tiles.length
		|| inputYCoords < 0 || inputYCoords >= field.tiles.length) {
		ui.error('Neplatné hodnoty souřadnic');
		return;
	}

	// validate and perform valid action
	switch (commandInput.slice(-1)) {
		case '+': // add beer to field
			if (teams[inputTeamIndex].availableBeers <= 0) {
				ui.warn('Týme ' + (inputTeamIndex+1) + ': Nemáte piva, která byste mohli položit.');
				break;
			}
			if (inputXCoords == grandpa.xCoords && inputYCoords == grandpa.yCoords) {
				ui.warn('Týme ' + (inputTeamIndex+1) + ': Na poli '+printCoords(inputXCoords,inputYCoords)+' stojí děda Drchlík.')
				break;
			}
			if (field.addBeer(inputXCoords,inputYCoords,inputTeamIndex) == false) {
				ui.warn('Týme ' + (inputTeamIndex+1) + ': Na poli '+printCoords(inputXCoords,inputYCoords)+' již pivo leží.')
				break;
			}

			ui.log('Tým ' + (inputTeamIndex+1) + ' položil pivo na poli ' + printCoords(inputXCoords,inputYCoords)+'.');
			teams[inputTeamIndex].usedBeers++;
			break;

		case '-': // remove beer from field
			let beer = field.getBeer(inputXCoords,inputYCoords); // get beer on tile

			// check if tile has a beer
			if (beer == null) {
				ui.warn('Týme ' + (inputTeamIndex+1) + ': Nelze odstranit pivo z pole '+printCoords(inputXCoords,inputYCoords)+'. Žádné zde není.');
				break;
			}

			// do not delete your own beer
			if (beer.teamIndex == inputTeamIndex) {
				ui.warn('Týme ' + (inputTeamIndex+1) + ': Nelze odstranit své vlastní pivo.');
				break;
			}

			teams[beer.teamIndex].usedBeers -= 1; // subtract from used beers
			deletedBeer = field.deleteBeer(inputXCoords,inputYCoords); // remove beer from field
			ui.log('Pivo týmu '+(deletedBeer.teamIndex+1)+' odebráno z pole '+
				printCoords(inputXCoords,inputYCoords)+' týmem '+(inputTeamIndex+1)+'.');
			break;

		default: // not a valid action
			ui.warn('Neplatný příkaz');
			break;
	}
}

function printCoords(xCoords, yCoords) {
	return '['+xCoords.toString(16)+';'+yCoords.toString(16)+']';
}
