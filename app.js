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
	if (this.style.background === "rgb(255, 255, 255)"){
		return
	}
	gameState.boardReset();
	this.style.color = "rgba(0,0,0,1)";
	let move = this.innerHTML;
	gameState.matchTrack.push(this);
	if (gameState.matchTrack.length > 2){
		gameState.matchTrack.shift();
	}
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
	matchTrack: [],
	guessPlus: function(){
		this.tries++;
		document.getElementById("tryCount").innerHTML = this.tries;
	},
	
	scoreCheck: function(){
		if (this.tileCompare[1] === this.tileCompare[0]){
			this.matchesLeft--;
			document.getElementById("leftCountdown").innerHTML = this.matchesLeft;
			this.matchTrack[0].style.background = "rgba(255,255,255,1)";
			this.matchTrack[0].style.color = "rgba(0,0,0,1)";
			this.matchTrack[0].children[0].className = "matched"
			this.matchTrack[1].style.background = "rgba(255,255,255,1)";
			this.matchTrack[1].style.color = "rgba(0,0,0,1)";
			this.matchTrack[1].children[0].className = "matched"

		}
		return
	},
	boardReset: function(){
		let board = document.getElementById("game-grid").children;
		for (let i = 0; i < board.length; i++){
			if (board[i].children[0].className === "matched"){
				continue
			} 
			console.log(board[i].style.background);
			board[i].style.color = "rgba(0,0,0,0)";
			
		}
	}	
}


//run
//console.log(initialTiles);
let gameBoardElements = document.getElementById("game-grid").children;
let gameCells = gameBoardElements.length/2;
let initialTiles = pickRandomPairs(gameCells, allCodes);
let tileAssignments = createAssignments(initialTiles);
createIconTiles(gameBoardElements, tileAssignments);

bindOnClick(gameBoardElements);

