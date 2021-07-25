class Beer extends FieldObject {
	constructor(xCoords, yCoords, icon, size, teamIndex){
		super(xCoords,yCoords,icon,size);
		this.teamIndex = teamIndex;
	}

	show() {
		rectMode(CENTER);
		stroke(teamColors[this.teamIndex+1]);
		noFill();
		strokeWeight(6);
		square((this.xCoords+0.5)*this.tileSize, (this.yCoords+0.5)*this.tileSize, 0.85*this.tileSize);
		super.show();
	}
}
