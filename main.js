const teamCount = 4;
const maxBeerCount = 6;
const fieldTeams = [
	[0,0,1,1,1,2,2,0,0,3,3],
	[0,1,1,1,2,2,2,2,0,0,3],
	[1,1,3,2,2,0,2,2,2,0,0],
	[1,3,3,2,0,0,0,1,1,0,0],
	[3,3,3,1,1,0,0,3,1,1,0],
	[3,3,1,1,1,-1,3,3,3,1,1],
	[2,3,3,1,2,2,3,3,1,1,1],
	[2,2,3,3,2,2,2,0,1,1,3],
	[2,2,0,0,0,2,0,0,1,3,3],
	[1,2,2,0,0,0,0,3,3,3,2],
	[1,1,2,2,0,0,3,3,3,2,2]
]

let tileSize = 70;
let grandpaIcon;
let beerIcon;
let field;
let grandpa;
let teams = [];

function preload() {
	beerIcon = loadImage('assets/beer.svg');
	grandpaIcon = loadImage('assets/man.svg');
}

function setup() {
	createCanvas(fieldTeams.length*tileSize, fieldTeams.length*tileSize);
	const teamColors = [
		color(255, 0, 0),
		color(191, 239, 255),
		color(255, 192, 203),
		color(255, 246, 143),
		color(193, 255, 193)
	]

	field = new Field(fieldTeams,teamColors,tileSize,beerIcon);
	grandpa = new Grandpa(0,0,grandpaIcon,tileSize);

	// Create teams
	for (let i = 0; i < teamCount; i++) {
		teams.push(new Team(maxBeerCount));
	}
}

function draw() {
	field.show();
	grandpa.show();

	if (frameCount%50 == 0)
		grandpa.move(field.beers);

	for (let i = 0; i < field.beers.length; i++) {
		if (field.beers[i].xCoords == grandpa.xCoords && field.beers[i].yCoords == grandpa.yCoords) {
			let [x,y] = [grandpa.xCoords, grandpa.yCoords];
			let beer = field.deleteBeer(x,y);
			teams[beer.teamIndex].unavailableBeers += 1;
			break;
		}
	}
}
