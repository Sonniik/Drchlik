class Beer extends FieldObject {
	constructor(xCoords, yCoords, icon, size, teamIndex){
		super(xCoords,yCoords,icon,size);
		this.teamIndex = teamIndex;
	}
}
