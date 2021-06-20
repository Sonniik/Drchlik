class Team {
	constructor(beers) {
		this.beers = beers;
		this.points = 0;
		this.usedBeers = 0;
		this.unavailableBeers = 0;
	}

	get availableBeers() {
		return this.beers-this.usedBeers-this.unavailableBeers;
	}
}
