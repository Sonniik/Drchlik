class Field {
	constructor(fieldTeams) {
		this.tiles = new Array(fieldTeams.length);
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i] = new Array(fieldTeams[i].length);
			for (let j = 0; j < this.tiles[i].length; j++) {
				this.tiles[i][j] = new Tile (i,j,fieldTeams[i][j]);
			}
		}
		console.table(this.tiles);
	}
}

class Tile {
	constructor(xCoords, yCoords, teamIndex) {
		this.xCoords = xCoords;
		this.yCoords = yCoords;
		this.teamIndex = teamIndex;
	}
}
