# **Tic Tac Toe**

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

The portion of the project which caused me the most trouble was handling the win condition. I tried multiple solutions over the coarse of a few days but the solution I chose used the vanilla Js `.some` and `.every` methods instead of the list of jquery methods I had to choose from. I found most of these diffictult to work with when impletmenting in my code.