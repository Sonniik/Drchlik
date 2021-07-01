class UI {
	constructor(teams, teamColors) {
		for (let i = 0; i < teams.length; i++) {
			this.generateTeamDiv(teams[i], teamColors[i+1]);
		}
		this.messagesContainer = document.getElementById("messagesContainer");
		this.moveTimerElement = document.getElementById("moveTimer");
		this.roundTimerElement = document.getElementById("roundTimer");
		this.roundCounterElement = document.getElementById("roundCounter");

		this.updateUI();
	}

	generateTeamDiv(team, teamColor) {
		let container = createDiv();
		container.class("team");
		container.parent(document.getElementById("teamsContainer"));
		let teamHeader = createDiv().class("teamHeader").parent(container);
		let teamBeersContainer = createDiv().class("teamBeersContainer").parent(container);

		createDiv().parent(teamHeader).class("teamName").html("Tým "+(teams.indexOf(team)+1)).style("background-color:"+teamColor);
		createDiv().parent(teamHeader).class("teamPoints").html(team.points);

		//let availableBeersElement = createDiv([team.availableBeers]);
		//let unavailableBeersElement = createDiv([team.unavailableBeers]);
		let availableBeersElement = createDiv();
		let unavailableBeersElement = createDiv();
		availableBeersElement.parent(createElement('fieldset').parent(teamBeersContainer).class("teamBeers")
			.child(createElement('legend').html("Volná piva")));
		unavailableBeersElement.parent(createElement('fieldset').parent(teamBeersContainer).class("teamBeers")
			.child(createElement('legend').html("Nedostupná piva")));
		team.availableBeersElement = availableBeersElement;
		team.unavailableBeersElement = unavailableBeersElement;
		team.updateStats();
	}

	updateUI() {
		teams.forEach(team => team.updateStats());
		this.moveTimerElement.innerHTML = moveTimerLength-moveTimerCounter;
		this.roundTimerElement.innerHTML = roundTimerLength-roundTimerCounter;
		this.roundCounterElement.innerHTML = roundCounter;
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
