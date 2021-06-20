function setup() {
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

	const teamColors = [
		color(255, 0, 0),
		color(191, 239, 255),
		color(255, 192, 203),
		color(255, 246, 143),
		color(193, 255, 193)
	]

	let tileSize = 50;

	field = new Field(fieldTeams,teamColors);

	createCanvas(fieldTeams.length*tileSize, fieldTeams.length*tileSize);
	field.draw(tileSize);
}
