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
		let teamHeader = createDiv().class("teamHeader").parent(container).style("background-color:"+teamColor);
		let teamBeersContainer = createDiv().class("teamBeersContainer").parent(container);

		createDiv().parent(teamHeader).class("teamName").html("Tým "+(teams.indexOf(team)+1)+" - "+(teamNames[teams.indexOf(team)]));
		team.pointsElement = createDiv().parent(teamHeader).class("teamPoints").html(team.points);

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
		this.moveTimerElement.innerHTML = this.secToMin(moveTimerLength-moveTimerCounter);
		this.roundTimerElement.innerHTML = this.secToMin(moveTimerLength*roundTimerMult-roundTimerCounter);
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

	get lastmessage() {
		return this.messagesContainer.lastChild.innerHTML;
	}

	secToMin(sec) {
		return floor(sec/60) + ":" + (sec%60).toLocaleString("cs-CZ",{
			minimumIntegerDigits: 2,
			useGrouping: false
		});
	}
}
