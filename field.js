class Field {
	constructor(fieldTeams, teamColors, tileSize) {
		this.tiles = new Array(fieldTeams.length);
		for (let i = 0; i < this.tiles.length; i++) {
			this.tiles[i] = new Array(fieldTeams[i].length);
			for (let j = 0; j < this.tiles[i].length; j++) {
				this.tiles[i][j] = new Tile (i,j,fieldTeams[i][j],teamColors[fieldTeams[i][j]+1]);
			}
		}

		this.tileSize = tileSize;
		this.beerIcon = beerIcon;
		this.beers = []
	}
	
	show(tileSize) {
		for (let i = 0; i < this.tiles.length; i++) {
			for (let j = 0; j < this.tiles[i].length; j++) {
				this.tiles[i][j].show(this.tileSize);
			}
		}

		this.beers.forEach((beer) => {beer.show()});
	}

	addBeer(xCoords, yCoords, teamIndex) {
		for (let i = 0; i < this.beers.length; i++) {
			if(this.beers[i].xCoords == xCoords && this.beers[i].yCoords == yCoords) {
				return false;
			}
		}
		this.beers.push(new Beer(xCoords,yCoords, this.beerIcon, this.tileSize, teamIndex));
        return true;
	}

	deleteBeer(xCoords,yCoords) {
		for (let i = 0; i < this.beers.length; i++) {
			if (xCoords == this.beers[i].xCoords && yCoords == this.beers[i].yCoords) {
				let beer = this.beers.splice(i,1);
				return beer[0];
			}
		}
	}
}

class Tile {
	constructor(xCoords, yCoords, teamIndex, color) {
		this.xCoords = xCoords;
		this.yCoords = yCoords;
		this.teamIndex = teamIndex;
		this.color = color;
	}

	show(tileSize) {
		fill(this.color);
		square((this.xCoords)*tileSize,(this.yCoords)*tileSize,tileSize);
	}
}
