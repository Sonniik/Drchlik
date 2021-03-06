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

const teamNames = [
	"Akošov",
	"Šakali",
	"Odborníci",
	"Amaronauti"
];

let tileSize = 75;
let grandpaIcon;
let beerIcon;
let field;
let grandpa;
let ui;
let teams = [];
let teamColors = [];

function preload() {
	beerIcon = loadImage('assets/beer.svg');
	grandpaIcon = loadImage('assets/man.svg');
}

function setup() {
	createCanvas(fieldTeams.length*tileSize, fieldTeams.length*tileSize)
		.parent(document.getElementById('board'));
	teamColors = [
		color(255, 0, 0),
//		color(220, 245, 200),
//		color(254, 209, 212),
//		color(216, 230, 254),
//		color(248, 208, 243)
		color(193, 255, 193),
		color(255, 192, 203),
		color(191, 239, 255),
		color(255, 246, 143)
//		color(183, 179, 202)
// Amar - fialová
// Ako -- zelená
// Šak -- červená
// Odb -- modrá
	]

	field = new Field(fieldTeams,teamColors,tileSize,beerIcon);
	grandpa = new Grandpa(5,5,grandpaIcon,tileSize);

	// Create teams
	for (let i = 0; i < teamCount; i++) {
		teams.push(new Team(maxBeerCount));
	}

	ui = new UI(teams, teamColors);
}

function draw() {
	field.show();
	grandpa.show();
	field.showCoords();
}

function addPoints() {
	let teamIndex = field.tiles[grandpa.xCoords][grandpa.yCoords].teamIndex;
	if (teamIndex == -1) return;
	teams[teamIndex].points++;
	teams.forEach(team => {team.unavailableBeers = 0});
}

function drinkBeer() {
	for (let i = 0; i < field.beers.length; i++) {
		if (field.beers[i].xCoords == grandpa.xCoords && field.beers[i].yCoords == grandpa.yCoords) {
			let [x,y] = [grandpa.xCoords, grandpa.yCoords];
			let beer = field.deleteBeer(x,y);
			if ((beer.teamIndex < 0) || (beer.teamIndex > (teams.length-1))) {
				console.warn('Index out of bounds');
				return;
			}
			teams[beer.teamIndex].unavailableBeers += 1;
			teams[beer.teamIndex].usedBeers -= 1;
			break;
		}
	}
}

window.addEventListener("beforeunload", function(e){
    e.preventDefault();
    e.returnValue='';
});
