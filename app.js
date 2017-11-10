var originalArray = ["one", "one", "two", "two", "three", "three", "four", "four", "five", "five", "six", "six", "seven", "seven", "eight", "eight"];
var tempArray = [];

function createGrid() {
    var containerBox = $("#main-container")
    for (var box = 0; box < 16; box++) {
        containerBox.append('<div class="grid"></div>');            
    }
}

// function isMatched() {

// }

// function isFlipped() {

// }

// function clearGrid() {

// }

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

function newGame() {
    for (var i = 0; i < 16; i++) {
        var returnElement = tempArray.pop();
        originalArray[i] = returnElement;
    }
}

// function countMoves() {

// }

$(document).ready(function() {
    createGrid();
    shuffle();
});