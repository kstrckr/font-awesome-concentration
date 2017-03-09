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
	let outputArray = pairArray.sort(function(a, b){return 0.5 - Math.random()});
	/*console.log(pairArray.length);
	while (pairArray.length > 0){
		let randomExtract = Math.floor(Math.random()*(pairArray.length));
		outputArray.push(pairArray.splice(randomExtract, 1).toString());
	} */
	return outputArray;
}

function createIconTiles(targetElements, iconSource){
	for(let i = 0; i < targetElements.length; i++){
		targetElements[i].innerHTML = "<p>" + iconSource[i] + "</p>"
	}
}

//2.0 - track player moves

function bindOnClick(bindTo){
	for (let i = 0; i < bindTo.length; i++){
		bindTo[i].addEventListener("click", clickTile);
	}
}

let clickTile = function(){
	let move = this.innerHTML;
	gameState.tileCompare.push(move);
	if (gameState.tileCompare.length > 2){
		gameState.tileCompare.shift();
	}
	gameState.scoreCheck();
	gameState.guessPlus();
}

const gameState = {
	matchesLeft: 6,
	tries: 0,
	tileCompare: [],
	guessPlus: function(){
		this.tries++;
		document.getElementById("tryCount").innerHTML = this.tries;
	},
	scoreCheck: function(){
		if (this.tileCompare[1] === this.tileCompare[0]){
			this.matchesLeft--;
			document.getElementById("leftCountdown").innerHTML = this.matchesLeft;
		}
		console.log(this.matchesLeft);
	}
	
}
//3.0 - track player score
//4.0 - track game state

//run
//console.log(initialTiles);
let gameBoardElements = document.getElementById("game-grid").children;
let gameCells = gameBoardElements.length/2;
let initialTiles = pickRandomPairs(gameCells, allCodes);
let tileAssignments = createAssignments(initialTiles);
createIconTiles(gameBoardElements, tileAssignments);

bindOnClick(gameBoardElements);

