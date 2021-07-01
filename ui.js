class UI {
	constructor(teams) {
		teams.forEach(team => {
			this.generateTeamDiv(team);
		});
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

	generateTeamDiv(team) {
		let container = createDiv();
		container.class("team");
		container.parent(document.getElementById("teamsContainer"));
		let teamHeader = createDiv().class("teamHeader").parent(container);
		let teamBeersContainer = createDiv().class("teamBeersContainer").parent(container);

		createDiv().parent(teamHeader).class("teamName").html("Tým "+(teams.indexOf(team)+1));
		createDiv().parent(teamHeader).class("teamPoints").html(team.points);

		createDiv().parent(teamBeersContainer).class("teamBeers availableBeers").html(team.availableBeers);
		createDiv().parent(teamBeersContainer).class("teamBeers unavailableBeers").html(team.unavailableBeers);
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
