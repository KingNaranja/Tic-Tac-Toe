'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const events = require('./events.js')

$(() => {

  $("#sign-up").on('submit', events.onSignUp)  
  // $('#log-in').on('submit', events.onLogin)  
  // $('#log-out').on('submit', events.onLogout) 


  // attached to the button that says 'Play Game ?'
  $("#drawBoard").on('click', events.drawBoard)
 
  // store.game is taking over this method 
  $(".square").on('click', events.makeMove)

 

})
