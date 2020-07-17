# Frogger Lightyear


## Description
Frogger Lightyear is inspired by 80s classic Frogger. The player move from the bottom of the screen to the top, avoiding moving asteroids and a black hole on its way. The player wins by reaching the top of the gameboard. The player loses when the damage to its ship is too great or he hits the black hole. A score is calculated based on the amount of time the game lasted.


## MVP (DOM - CANVAS)

- +Game has a frogger that moves vertically, upwards, when using arrowkeys
- Asteroids move horizontally from left to right on one line, and right to left on another line
- Multiple asteroids on one line
- Lines have differents speeds
- +Two fixed position planets where the frogger is safe
- One Black Hole in between the planets that will 'game over' the player when it is hit
- Planet at the top that will end the game when reached
- Start with an amount of points that will decrease every second
- Start and restart button

## Backlog

- Add music
- Add scoreboard
- Name input
- Add aliens to eat for points
- Pick up other froggers for points (on safe planets)
- Ability to shoot asteroids
- Black Hole Gravity, when you move too close, you will be pulled in

## Data Structure

# main.js

<!-- button (with high border radius for circle) and name (changing from frogs to letters) -->
- createSplashScreen () {}

- +createGameScreen () {}

<!-- game over/you win (same tactic as chronometer change), score and restart button -->
- createGameOverScreen () {}

- +startGame() {}

# game.js

<!-- creating all variables -->
 - gameVars() {}

 - +drawCanvas() {}

<!-- Drawing three fixed position planets -->
 - planet() { x, y, direction, size }
 - blackhole() { x, y, direction, size }
 - homePlanet() { x, y, direction, size }

<!-- setting start-position -->
 - updateCanvas() {}

<!-- setting gameloop, addEventListeners for keys -->
 - loop() {}

 - clearCanvas() {}

 <!-- declaring points of collissions and enabling lives - 1 -->
 - checkCollisions() {}

 <!-- declaring game over function (0 lives / black hole / time === 0) -->
 - gameOver() {}

<!-- creating asteroids during the game (look at flappy bird example) -->
 - addAsteroid() {}

<!-- calculating score -->
- calculateScore() {}

# frogger.js

- frogger() { x, y, direction, size }

<!-- creating and adding frogger to canvas -->
- draw() {}

<!-- determining frog movement -->
- move() {}

<!-- preventing screen collission -->
- checkScreenCollision() {}

- checkCollisionAsteroid() {}

- checkCollissionPlanet() {}

# asteroid.js

- asteroid() { x, y, direction, size }

<!-- creating and adding asteroids to canvas -->
- draw() {}

<!-- determining asteroid movement, left to right, right to left -->
- move() {}

<!-- screen collission, asteroids in array -> remove from array -->
- checkScreenCollision() {}


## States y States Transitions
Definition of the different states and their transition (transition functions)

- splashScreen
- gameScreen
- gameOver or gameWinScreen (same screen, text depending on outcome)

## Task

- main - buildDom
- main - buildSplashScreen
- main - addEventListener
- main - buildGameScreen
- main - buildGameOverScreen
- main - makeImgs

- game - buildCanvas
- game - updateCanvas
- game - drawCanvas
- game - addEventListener
- game - gameLoop
- game - checkCollision
- game - GameOver

- frogger - draw
- frogger - move
- game - addAsteroid
- asteroid - draw
- asteroid - move
- planet - draw


## Links

### Trello
[Link url](https://trello.com/b/qnVwRRu1/frogger-lightyear)

### Git
URls for the project repo and deploy:
- Link Repo](https://github.com/llanting/frogger-lightyear)
- [Link Deploy]()

### Slides
URls for the project presentation

