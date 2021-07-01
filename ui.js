class UI {
	constructor(teams, teamColors) {
		for (let i = 0; i < teams.length; i++) {
			this.generateTeamDiv(teams[i], teamColors[i+1]);
		}
		this.messagesContainer = document.getElementById("messagesContainer");
	}

	updateUI() {
		let text = ""
		teams.forEach(team => text += ("Tým "+(teams.indexOf(team)+1)+" <br/> Points: " + team.points +
		"<br/>Available beers: " + team.availableBeers + "<br/>Used beers: " + team.usedBeers + "<br/>Drunk beers: " + team.unavailableBeers + "<br/>"));
		document.getElementById("teamstats").innerHTML = text;
		
		let moveTimer = moveDelayLength - moveCounter;
		let roundTimer = roundLength - roundTimeCounter;
		let timersText = "Next move in: " + moveTimer + "<br/>Next round in: " + roundTimer;
		document.getElementById("timers").innerHTML = timersText;
	}

	generateTeamDiv(team, teamColor) {
		let container = createDiv();
		container.class("team");
		container.parent(document.getElementById("teamsContainer"));
		let teamHeader = createDiv().class("teamHeader").parent(container);
		let teamBeersContainer = createDiv().class("teamBeersContainer").parent(container);

		createDiv().parent(teamHeader).class("teamName").html("Tým "+(teams.indexOf(team)+1)).style("background-color:"+teamColor);
		createDiv().parent(teamHeader).class("teamPoints").html(team.points);

		let availableBeersElement = createDiv([team.availableBeers]);
		let unavailableBeersElement = createDiv([team.unavailableBeers]);
		availableBeersElement.parent(createElement('fieldset').parent(teamBeersContainer).class("teamBeers")
			.child(createElement('legend').html("Volná piva")));
		unavailableBeersElement.parent(createElement('fieldset').parent(teamBeersContainer).class("teamBeers")
			.child(createElement('legend').html("Nedostupná piva")));
	}

	log(message) {
		createDiv().parent(this.messagesContainer).class("message log").html(message);
	}
	warn(message) {
		createDiv().parent(this.messagesContainer).class("message warn").html(message);
	}
	error(message) {
		createDiv().parent(this.messagesContainer).class("message error").html(message);
	}
}
