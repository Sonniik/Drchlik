class Field {
	constructor(fieldTeams, teamColors) {
		this.tiles = new Array(fieldTeams.length);
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i] = new Array(fieldTeams[i].length);
			for (let j = 0; j < this.tiles[i].length; j++) {
				this.tiles[i][j] = new Tile (i,j,fieldTeams[i][j],teamColors[fieldTeams[i][j]+1]);
			}
		}
	}
	
	draw(tileSize) {
		this.tiles.forEach(
			tiles => tiles.forEach(function(tile) {
				tile.draw(tileSize);
			}
		));
	}
}

class Tile {
	constructor(xCoords, yCoords, teamIndex, color) {
		this.xCoords = xCoords;
		this.yCoords = yCoords;
		this.teamIndex = teamIndex;
		this.color = color;
	}

	draw(tileSize) {
		fill(this.color);
		square((this.xCoords)*tileSize,(this.yCoords)*tileSize,tileSize);
	}
}
