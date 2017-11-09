// var cell = $('<div class="grid"></div>');
// var containerBox = $("#main-container");
var originalArray = ["1","1","2","2","3","3","4","4","5","5","6","6","7","7","8","8"];
var tempArray = [];

// function createGrid() {
//     for (var row = 0; row < 4; row++) {
//         for (var column = 0; column < 4; column++) {
//             containerBox.append(cell);            
//         }
//     }
// }

// $(document).ready(function() {
//     createGrid();
// });

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
        tempArray.push(newIndex);
    }
}

function newGame() {
    for (var i = 0; i < 16; i++) {
        var returnElement = tempArray.pop();
        originalArray[i] = returnElement;
    }
}

// function countMoves() {

// }