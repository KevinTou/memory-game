#Memory Game

**Memory Game** is another implementation of **Concentration**, a matching game in which a user attempts to match pairs until all are matched. 

##Installation
--------------

Clone the GitHub repository by using:

```shell
$git clone https://github.com/KevinTou/memory-game.git
```

##Usage
-------

The game should run when the page loads and the timer begins on when a box is first selected. If you want to start a new game, there is one available near the top right of the grid, as well as when the game is completed.

##Known Issues
--------------

When playing the game, the delay sometimes cause multiple colors to appear before the card is flipped down. This could be changed by changing the `setTimer()` in the `isMatched(currentMove)`.