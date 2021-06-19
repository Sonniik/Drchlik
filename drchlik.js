class Team {
	constructor(name,color,score,beersInHand,beersDrunk) {
		this.name = name;
		this.color = color;
		this.score = score;
		this.beersInHand = beersInHand;
		this.beersDrunk = beersDrunk;
	}
	
	doBeer(xCoords,yCoords,teams,beers,grandpa) {
		let beerPlaced = false;
		for (let beer in beers) {
			if (beers[beer].xCoords == xCoords && beers[beer].yCoords == yCoords) {
				beerPlaced = true;
				switch (beers[beer].team == teams.indexOf(this)) {
					case true:
						document.write('You can not take your own beer! <br/>'); //TODO -- output on screen
						break;
					case false:
						teams[beers[beer].team].beersInHand++;
						delete beers[beer];
						break;
				};
				break;
			};
		};
		if (beerPlaced == false) {
			switch (this.beersInHand > 0) {
				case true:
					switch ((((grandpa.xCoords-xCoords)**2+(grandpa.yCoords-yCoords)**2)**0.5) >= 2) {
						case true:
							this.beersInHand--;
							beers.push(new Beer(xCoords,yCoords,teams.indexOf(this),undefined));
							beers[beers.length-1].countGrandpaDistance(grandpa);
							break;
						case false:
							document.write('You can not place a beer here, grandpa would see! <br/>'); //TODO -- output on screen
							break;
					};
					break;
				case false:
					document.write('You do not have enough beers! <br/>'); //TODO -- output on screen
					break;
			};
		};
	}
}

class Field {
	constructor(xCoords,yCoords,team,beer,points) {
		this.xCoords = xCoords;
		this.yCoords = yCoords;
		this.team = team;
		this.points = points;
	}
	givePoints(teams) {
		teams[this.team].score+=this.points;
/* Bulletproof, but not nescessary variant
		for (let team in teams) {
			if (teams[team].id == this.team) {
				teams[team].score+=this.points;
				break;
			}
		}; */
	}
}

class Grandpa {
	constructor(xCoords,yCoords) {
		this.xCoords = xCoords;
		this.yCoords = yCoords;
	}
	
	move(beers) {
		switch (beers.every(beer => beer == undefined)) {
			case false:
				var minDistance=100, minXCoords, minYCoords;
				for (let beer in beers) {
					if (beers[beer].grandpaDistance < minDistance) {
						minDistance = beers[beer].grandpaDistance;
						minXCoords = beers[beer].xCoords;
						minYCoords = beers[beer].yCoords;
						if (minDistance == 1) {
							teams[beers[beer].team].beersDrunk++
							delete beers[beer];
							break;
						};
					};
				};
				switch (Math.sign(Math.abs(minXCoords - this.xCoords) - Math.abs(minYCoords - this.yCoords))) {
					case 1:
						this.xCoords+=Math.sign(minXCoords - this.xCoords);
						break;
					case -1:
						this.yCoords+=Math.sign(minYCoords - this.yCoords);
						break;
					default:
						switch (Math.random() < 0.5) {
							case true:
								this.xCoords+=Math.sign(minXCoords - this.xCoords);
								break;
							case false:
								this.yCoords+=Math.sign(minYCoords - this.yCoords);
								break;
						};
				};
				beers.forEach(beer => beer.countGrandpaDistance(this));
				break;
			case true:
				return;
		};
	}
	
	pointsTime(teams,fields) {
		for (let field in fields) {
			if (fields[field].xCoords == this.xCoords && fields[field].yCoords == this.xCoords) {
				fields[field].givePoints(teams);
				break;
			};
		};
		teams.forEach(function(team) {team.beersInHand+=team.beersDrunk; team.beersDrunk=0;})
	}
}

class Beer {
	constructor(xCoords,yCoords,team,grandpaDistance) {
	this.xCoords = xCoords;
	this.yCoords = yCoords;
	this.team = team;
	this.grandpaDistance = grandpaDistance;
	}
	
	countGrandpaDistance (grandpa) {
		this.grandpaDistance = ((grandpa.xCoords-this.xCoords)**2+(grandpa.yCoords-this.yCoords)**2)**0.5;
	}
}

// test function

function test() {
	let command = document.getElementById("command_input").value;
	document.getElementById("output").innerHTML = command;
};

// TESTING PART

const teams = [new Team('Tým 1','pink',0,6,0),new Team('Tým 2','blue',0,6,0)];
const fields = [];

var i = 1, j = 1;
while (i<12) {
	while (j<12) {
		fields.push(new Field(i,j,Math.floor(Math.random()*2),0,1));
		j++;
	};
	j = 1;
	i++;
};

var grandpa = new Grandpa(1,1);
var beers = [new Beer(5,2,1,undefined), new Beer(6,4,1,undefined), new Beer(1,3,0,undefined)];
beers.forEach(beer => beer.countGrandpaDistance(grandpa));

// DO SOMETHING AND WRITE IT ON SCREEN


//fields[0].givePoints(teams);

teams[0].doBeer(1,3,teams,beers,grandpa);
teams[0].doBeer(1,4,teams,beers,grandpa);
teams[0].doBeer(5,2,teams,beers,grandpa);

teams.forEach(team => document.write(team.name, ": ", team.score, ", pivo: ", team.beersInHand, ', ', team.beersDrunk, "<br/>"));
document.write('<br/>');

document.write('Děda: ',grandpa.xCoords,',',grandpa.yCoords,'<br/>','Pivo:<br/>');
beers.forEach(beer => document.write(beer.xCoords,',',beer.yCoords,': ',beer.grandpaDistance,'<br/>'));
document.write('<br/>');

let k = 0
while (k < 10) {
	grandpa.move(beers);
	
	document.write('Děda: ',grandpa.xCoords,',',grandpa.yCoords,'<br/>','Pivo:<br/>');
	beers.forEach(beer => document.write(beer.xCoords,',',beer.yCoords,': ',beer.grandpaDistance,'<br/>'));
//	document.write('<br/>');
	teams.forEach(team => document.write(team.name, ": ", team.score, ", pivo: ", team.beersInHand, ', ', team.beersDrunk, "<br/>"));
	document.write('<br/>');
	k++;
};

teams[0].doBeer(1,3,teams,beers,grandpa);
	grandpa.move(beers);
	document.write('Děda: ',grandpa.xCoords,',',grandpa.yCoords,'<br/>','Pivo:<br/>');
	beers.forEach(beer => document.write(beer.xCoords,',',beer.yCoords,': ',beer.grandpaDistance,'<br/>'));
//	document.write('<br/>');
	teams.forEach(team => document.write(team.name, ": ", team.score, ", pivo: ", team.beersInHand, ', ', team.beersDrunk, "<br/>"));
	document.write('<br/>');
teams[0].doBeer(1,4,teams,beers,grandpa);
teams[0].doBeer(1,5,teams,beers,grandpa);
teams[0].doBeer(1,6,teams,beers,grandpa);
teams[0].doBeer(5,5,teams,beers,grandpa);
teams[0].doBeer(6,5,teams,beers,grandpa);
teams[0].doBeer(6,6,teams,beers,grandpa);
teams[0].doBeer(5,6,teams,beers,grandpa);
teams[0].doBeer(7,7,teams,beers,grandpa);
teams[0].doBeer(8,8,teams,beers,grandpa);
	grandpa.move(beers);
	grandpa.pointsTime(teams,fields)
	document.write('Děda: ',grandpa.xCoords,',',grandpa.yCoords,'<br/>','Pivo:<br/>');
	beers.forEach(beer => document.write(beer.xCoords,',',beer.yCoords,': ',beer.grandpaDistance,', ',beer.team,'<br/>'));
//	document.write('<br/>');
	teams.forEach(team => document.write(team.name, ": ", team.score, ", pivo: ", team.beersInHand, ', ', team.beersDrunk, "<br/>"));
	document.write('<br/>');

