class Team {
	constructor(beers) {
		this.beers = beers;
		this.points = 0;
		this.usedBeers = 0;
		this.unavailableBeers = 0;
		this.availableBeersElement;
		this.unavailableBeersElement;
	}

	get availableBeers() {
		return this.beers-this.usedBeers-this.unavailableBeers;
	}

	updateStats() {
		this.availableBeersElement.html(this.availableBeers);
		this.unavailableBeersElement.html(this.unavailableBeers);
	}
}
