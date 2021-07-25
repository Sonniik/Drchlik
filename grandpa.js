class Grandpa extends FieldObject {

	calcPowDistance (xTarget, yTarget) {
		return (xTarget-this.xCoords)**2 + (yTarget-this.yCoords)**2
	}

	move(beers) {
		if (beers.length == 0) return;
		let closest = beers[0];
		let closestDist = this.calcPowDistance(beers[0].xCoords, beers[0].yCoords);
		for (let i = 1; i < beers.length; i++) {
			dist = this.calcPowDistance(beers[i].xCoords, beers[i].yCoords);
			if (dist >= closestDist) continue;
			closestDist = dist;
			closest = beers[i];
		}

		let xDiff = closest.xCoords-this.xCoords;
		let yDiff = closest.yCoords-this.yCoords;
		if (abs(yDiff) > abs(xDiff)) {
			this.yCoords += Math.sign(yDiff);
		} else {
			this.xCoords += Math.sign(xDiff);
		}
	}

}
