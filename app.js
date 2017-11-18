// Game variables
var originalArray = ["one", "one", "two", "two", "three", "three", "four", "four", "five", "five", "six", "six", "seven", "seven", "eight", "eight"];
var tempArray = [];
var gameArray = [];
var initialMove = null;
var gameWon = 0;
var resetGame = document.getElementById("new-game");

// Rating variables
var count = 0;
var time = 0;
var timeStart = 0;
var timeEnd = 0;
var numberOfStars = 0;

// Modal variables
var modal = document.getElementById("game-modal");

// Creates an object which describes the each grid's behavior
function Box(grid, number) {
    this.grid = grid;
    this.available = false;
    this.match = false;
    this.grid.addEventListener('click', this, false);
    this.hasNumber = number;
}

// Creates a working array with the Box objects and the randomized pairs
function buildGameArray() {
    var boxArray = $('div.grid');
    for (var i = 0; i < boxArray.length; i++) {
        gameArray.push(new Box(boxArray[i], tempArray[i]));
    }
}

// Flips the box when clicked and checks whether or not it's a match, stops when winning condition is met
Box.prototype.handleEvent = function(event) {
    switch (event.type) {
        case 'click':
            if (time === 0) {
                timeStart = Date.now();
                time = 1;
            }
            if (this.available || this.match) {
                return;
            }
            this.available = true;
            this.grid.classList.add('flip');
            isMatched(this);
            document.getElementById("moves").innerHTML = "Moves: " + count;
            starRating();
            if (gameWon === 8) {
                timeEnd = Date.now();
                time = 0;
                console.log('Time took: ' + Math.round((timeEnd - timeStart) / 1000) + ' seconds!');
                // Switch with modal
                setTimeout(function () {
                    alert('Congratulations!');
                    restartGame();
                    document.getElementById("moves").innerHTML = "Moves: " + count;
                    starRating();
                }, 1000); 
            }
    }
}

// Sets the 'matching' behavior for the object
Box.prototype.matched = function() {
    this.match = true;
    this.available = true;
}

// Resets the object to the default values
Box.prototype.reset = function() {
    this.available = false;
    this.match = false;
    this.grid.classList.remove('flip');
}

// Allows the user to choose a box and if they are not 'matched', then reset their values and refresh attempt
function isMatched(currentMove) {
    if (initialMove === null) {
        initialMove = currentMove;
        return;
    }
    if (JSON.stringify(initialMove) === JSON.stringify(currentMove)) {
        initialMove.matched();
        currentMove.matched();
        countMoves();
        gameWon++;
    } else {
        var initial = initialMove;
        var current = currentMove;
        setTimeout(function() {
            initial.reset();
            current.reset();
        }, 400);
        countMoves();
    }
    initialMove = null;
}

// Creates a 4x4 grid
function createGrid() {
    var containerBox = $("#main-container")
    for (var box = 0; box < 16; box++) {
        containerBox.append('<div class="grid"></div>');
    }
}

// Removes all boxes within the container
function clearGrid() {
    $('div.grid').removeClass('one two three four five six seven eight flip');
}

// Random assigns classes to all boxes within the container
function shuffle() {
    for (var i = originalArray.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * originalArray.length);
        var newIndex = originalArray.splice(randomIndex, 1);
        tempArray.push(newIndex[0]);
    }
    $('div.grid').each(function (index) {
        $(this).addClass(tempArray[index]);
    });
}

// Empties out the tempArray and returns all values back into the originalArray
function newGame() {
    for (var i = 0; i < 16; i++) {
        var returnElement = tempArray.pop();
        originalArray[i] = returnElement;
    }
}

// Keeps track of the count when the player makes an attempt at matching
function countMoves() {
    count++;
    return count;
}

function starRating() {
    if (count < 14) {
        document.getElementById("star-rating").innerHTML = "Rating: * * *"; 
        numberOfStars = 3;       
    } else if (count >= 14 && count <= 19) {
        document.getElementById("star-rating").innerHTML = "Rating: * *";
        numberOfStars = 2;
    } else {
        document.getElementById("star-rating").innerHTML = "Rating: *";
        numberOfStars = 1;
    }
}

function startGame() {
    shuffle();
    buildGameArray();
}

function restartGame() {
    clearGrid();
    newGame();
    startGame();
    gameWon = 0;
    count = 0;
    initialMove = null;
}

$(document).ready(function() {
    createGrid();
    startGame();
});