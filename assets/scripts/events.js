'use strict'

const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')
const store = require('./store.js')

const onSignUp = event => {
    // shows the api message field
    $('#api-response').show()
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

const onSignIn = event => {
    // prevents submit button from refreshing the page
    event.preventDefault() 
    console.log(console.log(event.target) )// logs the element the submit event is targeting 

    let data = getFormFields(event.target)
    api.signIn(data)
        .then(ui.signInSuccess) // if successfull
        .catch(ui.signInFailure) // if failure


}

const onSignOut = event => {
    event.preventDefault()
    api.signOut()
      .then(ui.signOutSuccess)
      .catch(ui.signOutFailure)
  }

  const onChangePassword = event => {
    event.preventDefault()
    const data = getFormFields(event.target)
    api.changePassword(data)
      .then(ui.changePasswordSuccess)
      .catch(ui.changePasswordFailure)
  }



// gameCount must keep track of how many times a new game is played
// gameCount will be assigned to the current game ID
// Initilized at 1 
let gameCount = 0

// Tic Tac Toe Engine 
// helps handle game instances and API responses
class Game {
    constructor(id=gameCount,over, player_x=store.userData, player_o=null) {
        this.id = id 
        this.cells = ["","","","","","","","",""] 
        this.over = over
        this.player_x = player_x
        this.player_o = player_o
        this.turn = "X"
        this.winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [6,4,2]]
    }
    // create a new game instance in the store 
    newGame() {
        // each newGame call will increment the gameCount
        // player_ x by default is an empty object > form field method not done
        gameCount++
        store.currentGame = new Game(gameCount,false)

        
        api.createGame()  
          .then(console.log('made a game'))
          .catch(console.log('cant make a game'))
    }

    // grab the data of the player spot 
    // add a player class to that element 
    // stores the player move in the current game  
    storePlayerMove(playerSpot) {
        let spotClasses = playerSpot.classList
        spotClasses.add(`${store.currentGame.turn}`)

        // playerMove contains the index of the selected sqaure
        let playerMove = playerSpot.getAttribute("data-cell")

        // stores the playerMove in the current index of the currentGame cell storage
        this.cells[playerMove] = store.currentGame.turn
        
        // logs the cells array in the currentGame object 
        console.log(store.currentGame.cells)
        
        return playerMove
    }
    // returns the array that contains recorded player moves 
    getCells() {
        return this.cells
    }
    
    endGame() {
        // change the 'over' property of the current game to True 
        store.currentGame.over = true

        // add a class to game squares to stop click events 
        $('.square').addClass('gameOver')
        ui.addFeedback('The Game is now over')

        //adds the 'play game button back to the page; slowly
        $("#playAgain").toggle("slow")
        
    }
  
    updateGame(playerSpot) {
        // playerMove contains the index of the selected sqaure
        let playerMove = playerSpot.getAttribute("data-cell")

        let turn = store.currentGame.turn.toLowerCase()
        let gameData = {
            "game": {
              "cell": {
                "index": parseInt(playerMove),
                "value": `${turn}`
              },
              "over": store.currentGame.over
            }
          }
          api.updateMove(gameData)
             
            console.log(gameData)
    }
    
}



const drawBoard = () => {

    // toggles hidden display of the game board container
    $(".gameBoard").toggle()

    // enable gameBoard
    $(".square").removeClass("gameOver")
    
    // creates a game instance in store.js 
    store.currentGame = new Game(gameCount,false)
    store.currentGame.newGame()
    
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

    // if the player clicks on a square that has been already been taken
    // update the user feedback 
    if (playerSpot.innerText == "X" || playerSpot.innerText == "O" ) { 
        
        ui.addFeedback("This spot is already taken. Try another one!")
        
    } else { 
        
        // the square the player clicks will place an ( x / o )
        playerSpot.innerText = store.currentGame.turn

        // Game stores the cell index of the players choice 
        store.currentGame.storePlayerMove(playerSpot)

        // update the state of the game
        store.currentGame.updateGame(playerSpot)

        //check if player move meets win condition
        if (checkForWinner()) {
            store.currentGame.endGame()
        // check if the game is a Tie 
            // update the state of the game
            store.currentGame.updateGame(playerSpot)
        } else if (checkTieGame()){
            ui.addFeedback("It is TIE GAME! ")
            store.currentGame.endGame()
            // update the state of the game
            store.currentGame.updateGame(playerSpot)
        }else { 
            // after player chooses a space, if game hasnt ended; switch players
            // and update feedback
            switchPlayer()
            ui.addFeedback(`It is ${store.currentGame.turn}'s turn.`)
        }
        
        
    }
    // log selected square element to the console
    console.log(playerSpot)
    console.log(store.currentGame.getCells())
    
    

}

const switchPlayer =()=>{
    // if the game turn is set to 'X', then switch it to 'O'
    if (store.currentGame.turn == "X") {
        store.currentGame.turn = "O"
    } else {
        store.currentGame.turn = "X"
    }
}

const checkForWinner =()=> { 
    
    // winConditions.some() will return true if 
    if (store.currentGame.winConditions.some(function(checkRow)  {
        // .every playerSpot stored in the current game 
        return checkRow.every(function(playerSpot) {
            // contains the same player turn mark  x / o
            let boardInPlay = store.currentGame.getCells()
            return boardInPlay[playerSpot] === store.currentGame.turn
            })
        })
    ){
        // update UI => player x / o wins
        ui.addFeedback(`${store.currentGame.turn} Wins !`)
        return true  
    }       
    
}    

const checkTieGame = () => {
    // for every gameboard cell
    for (let i = 0 ; i < 10 ; i++)  {
        // let gameMoves hold the current game cells
        let gameMoves = store.currentGame.getCells()

        // if current game cell is empty return false 
        if (gameMoves[i] == "") {
            return false
        }
        // after the above condition fails, return true
    }  return true
}    

const onPlayAgain = () => {

    // reset the inner text of each game square 
    $('.square').text('')

    // remove the 'gameOver' class to enable to gameboard
    $(".square").removeClass("gameOver")

    // create a new game instance
    store.currentGame.newGame()

    // hide the 'play Again' button
    $("#playAgain").toggle("slow")

    // Let player x know it is his turn again
    ui.addFeedback(`It is ${store.currentGame.turn} turn!`)
    
}


module.exports = {
    onSignUp,
    onSignIn, 
    onSignOut,
    onChangePassword,
    Game,
    drawBoard, 
    makeMove, 
    switchPlayer,
    checkForWinner,
    checkTieGame, 
    onPlayAgain
    
}