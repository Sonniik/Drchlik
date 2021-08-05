let testNum = 1;

function testPassed() {
	console.log('%c ✓ Test '+testNum+' passed', 'color: #30C530');
	testNum++;
}

function testFailed() {
	console.log('%c ❌ Test '+testNum+' failed', 'color: #F63C3C');
	testNum++;
}

function executeTestCommand(command) {
	let commanField = document.getElementById("command_input");
	commanField.value = command;
	executeInput();
}

function autoMoveGradpa() {
	for (let i=0;i<moveTimerLength;i++) incrementCounters();
}

function test() {
	executeTestCommand('TEST');
	if (ui.lastmessage == "Hra pozastavena, příkaz ignorován") testPassed();
	else testFailed();

	executeTestCommand('start');
	if (ui.lastmessage == "Hra spuštěna") testPassed();
	else testFailed();

	executeTestCommand('TESTTEST');
	if (ui.lastmessage == "Neplatný příkaz") testPassed();
	else testFailed();

	executeTestCommand('TEST');
	if (ui.lastmessage == "Neplatný příkaz, tým neexistuje") testPassed();
	else testFailed();

	executeTestCommand('1bcT');
	if (ui.lastmessage == "Neplatné hodnoty souřadnic") testPassed();
	else testFailed();

	executeTestCommand('111A');
	if (ui.lastmessage == "Neplatný příkaz") testPassed();
	else testFailed();

	executeTestCommand('100+');
	if (ui.lastmessage == "Tým 1 položil pivo na poli [0;0].") testPassed();
	else testFailed();

	executeTestCommand('212+');
	if (ui.lastmessage == "Tým 2 položil pivo na poli [1;2].") testPassed();
	else testFailed();

	executeTestCommand('356+');
	if (ui.lastmessage == "Tým 3 položil pivo na poli [5;6].") testPassed();
	else testFailed();

	executeTestCommand('4a7+');
	if (ui.lastmessage == "Tým 4 položil pivo na poli [10;7].") testPassed();
	else testFailed();

	executeTestCommand('47a+');
	if (ui.lastmessage == "Tým 4 položil pivo na poli [7;10].") testPassed();
	else testFailed();

	executeTestCommand('4aa+');
	if (ui.lastmessage == "Tým 4 položil pivo na poli [10;10].") testPassed();
	else testFailed();

	executeTestCommand('27a+');
	if (ui.lastmessage == "Týme 2: Na poli [7;10] již pivo leží.") testPassed();
	else testFailed();

	executeTestCommand('100-');
	if (ui.lastmessage == "Týme 1: Nelze odstranit své vlastní pivo.") testPassed();
	else testFailed();

	executeTestCommand('200-');
	if (ui.lastmessage == "Pivo týmu 1 odebráno z pole [0;0] týmem 2.") testPassed();
	else testFailed();

	if (teams[0].usedBeers == 0 && teams[1].usedBeers == 1 &&
		teams[2].usedBeers == 1 && teams[3].usedBeers == 3) testPassed();
	else testFailed();

	for(let i=0;i<5;i++) autoMoveGradpa();
	if (grandpa.xCoords == 6 && grandpa.yCoords == 9) testPassed();
	else testFailed();

	for(let i=0;i<2;i++) autoMoveGradpa();
	if (teams[3].usedBeers == 2 && teams[3].unavailableBeers == 1 
		&& teams[3].availableBeers == 3) testPassed();
	else testFailed();

	//for(let i=0;i<3;i++) autoMoveGradpa();
	//if (teams[0].points==0 && teams[1].points==2
	//	&& teams[2].points==1 && teams[3].points==2) testPassed();
	//else testFailed();

	executeTestCommand('stop');
	if (ui.lastmessage == "Hra zastavena") testPassed();
	else testFailed();
}
