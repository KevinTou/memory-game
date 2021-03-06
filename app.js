// Game variables
let originalArray = ["one", "one", "two", "two", "three", "three", "four", "four", "five", "five", "six", "six", "seven", "seven", "eight", "eight"];
let tempArray = [];
let gameArray = [];
let initialMove = null;
let gameWon = 0;

// Rating variables
let count = 0;
let time = 0;
let timeStart = 0;
let timeEnd = 0;
let numberOfStars = 0;
let currentTime = 0;
let clock;

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
            // Starts both timers for the game
            if (time === 0) {
                timeStart = Date.now();
                time = 1;
                clock = setInterval(timer, 500);
            }
            // Checks to see if the box is already flipped or matched and if it isn't, then continue
            if (this.available || this.match) {
                return;
            }
            this.available = true;
            this.grid.classList.add('flip');
            isMatched(this);
            document.getElementById("moves").innerHTML = "Moves: " + count;
            starRating();
            // Checks for the winning condition, and stops the game by showing the modal
            if (gameWon === 8) {
                timeEnd = Date.now();
                time = 0;
                clearInterval(clock);
                document.getElementById("stats").innerHTML = "It took " + Math.round((timeEnd - timeStart) / 1000) + " seconds and " + count + " moves! You got " + numberOfStars + " stars!";
                setTimeout(function () {
                    document.getElementById("game-modal").style.display = "block";
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
    // Allows the initial move to be saved for comparison
    if (initialMove === null) {
        initialMove = currentMove;
        return;
    }
    // Compares the two objects' properties (converted to strings) and see if they match
    if (JSON.stringify(initialMove) === JSON.stringify(currentMove)) {
        initialMove.matched();
        currentMove.matched();
        countMoves();
        gameWon++;
    // Otherwise, reset the object's properties to their default values
    } else {
        var initial = initialMove;
        var current = currentMove;
        setTimeout(function() {
            initial.reset();
            current.reset();
        }, 400);
        countMoves();
    }
    // Resets the initial move for a new comparison
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
    // Random selects an index and removes it from the originalArray, then puts it into the tempArray
    for (var i = originalArray.length - 1; i >= 0; i--) {
        var randomIndex = Math.floor(Math.random() * originalArray.length);
        var newIndex = originalArray.splice(randomIndex, 1);
        tempArray.push(newIndex[0]);
    }
    // Adds the shuffled classes to each of the boxes
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

// Updates the star rating as the user clicks
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

// Called on by the setInterval for a live game timer
function timer() {
    currentTime = Date.now();
    document.getElementById("clock").innerHTML = "Time: " + Math.round((currentTime - timeStart) / 1000);
}

// Refreshes the page
function resetGame() {
    location.reload();
}

$(document).ready(function() {
    createGrid();
    shuffle();
    buildGameArray();
});