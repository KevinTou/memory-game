# Memory Game

**Memory Game** is another implementation of **Concentration**, a matching game in which a user attempts to match pairs until all are matched. 

## Installation

Clone the GitHub repository by using:

```shell
$git clone https://github.com/KevinTou/memory-game.git
```

Run the index.html file on your favorite browser and enjoy!

## Usage

The game should run when the page loads and the timer begins on when a box is first selected. If you want to start a new game, there is one available near the top right of the grid, as well as when the game is completed.

## How to play

Select a box and try to match the boxes into pairs with as little moves as possible. Once you finish matching all the pairs, a modal will pop up and prompt you for a new game, as well as give you statistics such as: (1) the time it took you to finish; (2) the number of moves it took; (3) the star rating you received, based on the number of moves.

## Known Issues

When playing the game, the delay sometimes cause multiple colors to appear before the card is flipped down. This could be changed by changing the `setTimer()` in the `isMatched(currentMove)`.

## Obstacles/Solutions

When I first started this project, I decided to work on creating the grid first. It didn't take too long to create a basic 4x4 grid built by `<div>`'s. Next, I worked on how they were going to be matched and decided to randomly add classes to each of the box's classes. I created the `shuffle()` function to randomly pull the classes from the array containing all the paired values and put them into a temporary array, which are then added to each of the `$('div.grid')`. Now that I had a method to random assign classes to each box, I had to figure out how to make them flip and make them match. I figured that the flip could be solved by adding a *flip* class and then removing it if they didn't match. 

The hard part was trying to come up with the logic for the matching. I decided to create objects which had various properties and changed them to behave in a particular way (i.e. `this.match = false` and setting the value to `true` when **true**. It took a long time to implement the actual comparison method because I wasn't quite sure how to compare the two objects by their properties... I ended up using the `JSON.stringify(Object)` and compared all the properties to one another, and if they matched (i.e. `... number = "one"`), then set the values to **true** and let it remain *flipped*. After that was done with, I added various statistic counters such as a move counter, timer, and the star rating. I had to look into the how to keep a constant timer though, which I ended up utilizing the `setInterval(function(), time)`, which including learning about how `Date.now()` worked. 

## License

This project is licensed under the terms of the MIT license. See [LICENSE.txt](https://github.com/KevinTou/memory-game/blob/master/LICENSE.txt)