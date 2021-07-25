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
		this.beers = [];
	}
	
	show(tileSize) {
		// draw tiles
		for (let i = 0; i < this.tiles.length; i++) {
			for (let j = 0; j < this.tiles[i].length; j++) {
				this.tiles[i][j].show(this.tileSize);
			}
		}

		// draw beers
		this.beers.forEach((beer) => {beer.show()});
	}

	showCoords() {
		// draw coords
		textSize(this.tileSize*0.45);
		rectMode(CORNER);
		fill(34,34,34);
		noStroke();
		for (let i = 0; i < this.tiles.length; i++) {
			textAlign(LEFT,BOTTOM);
			text(i.toString(16).toUpperCase(),(i+0.03)*this.tileSize,(this.tiles.length-1+0.05)*this.tileSize,
				this.tileSize,this.tileSize);
			textAlign(RIGHT,TOP);
			text(i.toString(16).toUpperCase(),(this.tiles.length-1)*this.tileSize,(i+0.03)*this.tileSize,
				1.1*this.tileSize,this.tileSize);
		}
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
		return null;
	}

	getBeer(xCoords,yCoords) {
		for (let i = 0; i < this.beers.length; i++) {
			if (xCoords == this.beers[i].xCoords && yCoords == this.beers[i].yCoords) {
				return this.beers[i];
			}
		}
		return null;
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
		rectMode(CORNER);
		fill(this.color);
		stroke('#222222');
		strokeWeight(4);
		square((this.xCoords)*tileSize,(this.yCoords)*tileSize,tileSize);
	}
}
