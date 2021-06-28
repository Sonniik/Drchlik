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
    console.log(document.getElementById("command_input").value)
}
