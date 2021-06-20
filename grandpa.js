class Grandpa {
	constructor(xCoords, yCoords, icon, size){
		this.xCoords = xCoords;
		this.yCoords = yCoords;
		this.icon = icon;
		this.tileSize = tileSize;
	}

	show() {
		imageMode(CENTER);
		image(this.icon, (this.xCoords+0.5)*this.tileSize, (this.yCoords+0.5)*this.tileSize, 0.9*this.tileSize, 0.9*this.tileSize);
	}
}
