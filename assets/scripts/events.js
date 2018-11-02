'use strict'

const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./store.js')

const onSignUp = event => {
    // prevents submit button from refreshing the page
    event.preventDefault() 
    console.log(event.target) //logs the element the submit event is targeting 

    let data = getFormFields(event.target)
    // logs the form data to the console
    console.log('The sign-up data is', data)

    api.signUp(data)
        .then(ui.signUpSuccess) // if successfull
        .catch(ui.signUpFailure) // if failure
}   


//Tic Tac Toe Engine 
// helps handle game instances and API responses
class Game {
    constructor(id, cells, over, player_x={}, player_o=null) {
        this.id = id 
        this.cells = cells 
        this.over = over
        this.player_x = player_x
        this.player_o = player_o
        this.turn = "X"
    }
    // create a new game instance in the store 
    newGame() {
        let gameCount = store.currentGame.id
        store.currentGame = new Game(`${gameCounter++}`,[],false)
    }
    
    
}


const drawBoard = () => {
    //toggles hidden attribute of the game board container
    $("#game-board").toggle()

    // creates a game instance in the store.js file
    store.currentGame = new Game(1,[],false)
    console.log(store.currentGame)

    // hides the 'Play Game ?' button after it is clicked 
    $('#drawBoard').hide()
   
}


module.exports = {
    onSignUp, 
    Game,
    drawBoard
}