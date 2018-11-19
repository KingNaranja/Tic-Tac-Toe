# **Tic Tac Toe**

https://kingnaranja.github.io/Tic-Tac-Toe/

#### Overview

Tic tac toe is a game for two players, X and O. These players take turns marking the spaces in a 3 × 3 grid. The first player who successfully places three of their marks in a horizontal, vertical, or diagonal row wins the game.

#### Objective

Build a web application from scratch, which allows a user to play Tic Tac Toe.



#### Technologies

1. Javascript
2. HMTL 
3. CSS / SCSS
4. jQuery
5. Ajax



#### WireFrames 

Documentation hosted on Imgur

https://imgur.com/a/S3muuB2



### Approach

Beginning from my wireframes gave me a great starting perspective and allowed me to abstract away  and define the Tic Tac Toe Game object quickly.

The properties that each game will contain will be the 'id', turn', 'over', and 'player_x'. Creating a Tic Tac Toe Object helped separate the functions that the directly involve the game engine and the other functions in the web app.

The portion of the project which caused me the most trouble was handling the win condition. I tried multiple solutions over the coarse of a few days but the solution I chose used the vanilla Js `.some` and `.every` methods instead of the list of jquery methods I had to choose from. I found most of these diffictult to work with when implementing in my code.

The `winConditions` property of the Game is a two dimensional array that contains sequences of 3 index values of the gameBoard. The above methods made me worry less about traversing these arrays correctly and more about returning a passing boolean value.

### Unsolved Problems

The game API is still wonky to me. I personally would want the game engine to have the ability to send a reference of itself to the API in order to update in the simplest way possible. However the game object the Api expects is a slight varient of the game object the Game class creates. A potential solution came about in the form of the es6 destructuring, but I did not have enough experience to create the solution that I wanted. In a sense I would be able to pull out the properties that pertained to the API, assign them to a new variable and pass it to an AJAX call.

Getting past games unfortunately did not come into fruiton for my project. I believed it to be in my scope however I came to realize every single AJAX call written in this project did not function immedaitely after writing them. After what I learned from this project I will most likely return to refactor the structure of the page to better dynamically add content.