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


// Tic Tac Toe Engine 
// helps handle game instances and API responses
class Game {
    constructor(id, over, player_x={}, player_o=null) {
        this.id = id 
        this.cells = [] 
        this.over = over
        this.player_x = player_x
        this.player_o = player_o
        this.turn = "X"
    }
    // create a new game instance in the store 
    newGame() {
        let gameCount = store.currentGame.id
        store.currentGame = new Game(`${gameCount++}`,false)
    }

    // will grab the data of the player spot 
    // add a player class to that element 
    // and store the player move in the current game  
    storePlayerMove(playerSpot) {
        let spotClasses = playerSpot.classList
        spotClasses.add(`${store.currentGame.turn}`)

        // playerMove contains the index of the selected sqaure
        let playerMove = playerSpot.getAttribute("data-cell")

        // stores the playerMove in the current index of the currentGame cell storage
        this.cells[playerMove] = store.currentGame.turn
        
        // logs the cells array in the currentGame object 
        console.log(store.currentGame.cells)
        
        
    }
    
    
}


const drawBoard = () => {
    // toggles hidden attribute of the game board container
    $("#game-board").toggle()

    // creates a game instance in the store.js file
    store.currentGame = new Game(1,[],false)
    console.log(store.currentGame)

    // hides the 'Play Game ?' button after it is clicked 
    $('#drawBoard').hide()

    //shows the user Feedback field 
    $('#message').show()
   
    // player_ x will always begin the game 
    // initialize the game feedback field
    ui.addFeedback("It is X's turn.")
    
}
const makeMove = (square) =>{
    // playerSpot contains the players choice
    let playerSpot = square.target

    
    if (playerSpot.innerText == "X" || playerSpot.innerText == "O" ) { 
        // if the player clicks on a square that has been already been taken
        // update the user feedback 
        ui.addFeedback("This spot is already taken. Try another one!")
        
    } else {
        
        // the square the player clicks will place an ( x / o )
        playerSpot.innerText = store.currentGame.turn

        // Store the cell index of the players choice 
        store.currentGame.storePlayerMove(playerSpot)

        // after player chooses a space; switch players
        // and log feedback
        switchPlayer()
        ui.addFeedback(`It is ${store.currentGame.turn}'s turn.`)

        //store player_x move in store.currentGame

    }

    // log selected square element to the console
    console.log(playerSpot)
    //check if player move meets win condition
    checkForMatch()
}

const switchPlayer =()=>{
    // if the game turn is set to 'X', then switch it to 'O'
    if (store.currentGame.turn == "X") {
        store.currentGame.turn = "O"
    } else {
        store.currentGame.turn = "X"
    }
}

const checkForMatch = function() {
    const $topRow = $('.top')
    const $middleRow = $('.middle')
    const $bottomRow = $('.bottom')
    const $leftCol = $('.left')
    const $rightCol = $('.right')
    const board = [$topRow,$middleRow,$bottomRow,$leftCol,$rightCol]
    board.forEach(checkWin)
    
}

const checkWin = ($row) => {
    //if the checked row all contains player classes; then that player wins 
    if ($row.hasClass(`${store.currentGame.turn}`)){
        console.log(`${store.currentGame.turn} wins !`)
    }
   
}



module.exports = {
    onSignUp, 
    Game,
    drawBoard, 
    makeMove, 
    switchPlayer,
    checkForMatch,
    checkWin
}