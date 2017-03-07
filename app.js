//todo

//1.0 - build game board

//1.1 - pick tiles/2 icons
function pickRandomPairs(dimension, source) {
	let randomArray = [];
	for (let i = 0; i < dimension; i++){
		let randomNum = Math.floor(Math.random()*(source.length));
		randomArray[i] = source[randomNum];
	}
	return randomArray;
}

//1.2 - assign pairs of icons randomly across the board

function createAssignments(input) {
	let pairArray = input.concat(input);
	let outputArray = [];
	console.log(pairArray.length);
	while (pairArray.length > 0){
		let randomExtract = Math.floor(Math.random()*(pairArray.length));
		outputArray.push(pairArray.splice(randomExtract, 1).toString());
	}
	return outputArray;
}

function createIconTiles(targetElements, iconSource){
	for(let i = 0; i < targetElements.length; i++){
		targetElements[i].innerHTML = "<p>" + iconSource[i] + "</p>"
	}
}

//2.0 - track player moves
//3.0 - track player score
//4.0 - track game state

//run
//console.log(initialTiles);
let gameBoardElements = document.getElementById("game-grid").children;
let gameCells = gameBoardElements.length/2;
let initialTiles = pickRandomPairs(gameCells, allCodes);
let tileAssignments = createAssignments(initialTiles);
createIconTiles(gameBoardElements, tileAssignments);