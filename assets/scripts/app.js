'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./events.js')

$(() => {

  $("#sign-up").on('submit', events.onSignUp)  
  $('#sign-in').on('submit', events.onSignIn)  
  $('#sign-out').on('submit', events.onSignOut) 
  $('#change-password').on('submit', events.onChangePassword) 



  // attached to the button that says 'Play Game ?'
  // adds board; starts game 
  $("#drawBoard").on('click', events.drawBoard)
 
  // when a player clicks a spot, makeMove 
  $(".square").on('click', events.makeMove)

  // attached to the button that says 'Play Again!'
  // resets the board and starts a new game 
  $("#playAgain").on('click', events.onPlayAgain)

})
