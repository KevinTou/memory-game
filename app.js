var originalArray = ["one", "one", "two", "two", "three", "three", "four", "four", "five", "five", "six", "six", "seven", "seven", "eight", "eight"];
var tempArray = [];

// Creates a 4x4 grid
function createGrid() {
    var containerBox = $("#main-container")
    for (var box = 0; box < 16; box++) {
        containerBox.append('<div class="grid"></div>');            
    }
}

// function isMatched() {
    // Secondary classes should match 
// }

// function isFlipped() {
    // Class should be set to hidden as default
    // If switched to the secondary class and not matched. switch back to default
    // If a box is clicked, do NOT allow to re-flip
    // If it's already a match, do not count as a flip
// }

// Removes all boxes within the container
function clearGrid() {
    $('div.grid').removeClass('one two three four five six seven eight');
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

// function countMoves() {

// }

// TODO: Remove testing lines
$(document).ready(function() {
    createGrid();
    shuffle();
    console.log(tempArray.length + " " + originalArray.length);
    newGame();
    console.log(tempArray.length + " " + originalArray.length);
    clearGrid();
});