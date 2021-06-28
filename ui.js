function updateUI() {
	let text = ""
	teams.forEach(team => text += ("Tým "+(teams.indexOf(team)+1)+" <br/> Points: " + team.points +
	"<br/>Available beers: " + team.availableBeers + "<br/>Used beers: " + team.usedBeers + "<br/>Drunk beers: " + team.unavailableBeers + "<br/>"));
	document.getElementById("teamstats").innerHTML = text;
	
	let moveTimer = moveDelayLength - moveCounter;
	let roundTimer = roundLength - roundTimeCounter;
	let timersText = "Next move in: " + moveTimer + "<br/>Next round in: " + roundTimer;
	document.getElementById("timers").innerHTML = timersText;
}

function executeInput() {
    let commandIinput = document.getElementById("command_input").value;
    if (commandIinput.length != 4) {
        console.warn('Invalid input length');
        return;
    };
    let inputTeamIndex = parseInt(commandIinput.slice(0,1),10)-1;
    if (isNaN(inputTeamIndex) || inputTeamIndex < 0 || inputTeamIndex > teamCount-1) {
        console.warn('Invalid input, team does not exist');
        return;
    };
    let inputXCoords = commandIinput.slice(1,2);
    let inputYCoords = commandIinput.slice(2,3);
    inputXCoords = parseCoords(inputXCoords);
    inputYCoords = parseCoords(inputYCoords);
    if (isNaN(inputXCoords) || isNaN(inputYCoords)) {
        console.warn('Invalid input coordinates');
        return;
    };
    switch (commandIinput.slice(-1)) {
        case '+':
            console.log('+');
            break;
        case '-':
            console.log('-');
            break;
        default:
            console.log('Invalid input, last character must be + or -');
            return;
    };
}

function parseCoords(coords) {
    if (coords.toLowerCase() == 'a') {
        return 10;
    } else {
        return parseInt(coords);
    };
}
