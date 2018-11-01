'use strict'

const getFormFields = require('../../lib/get-form-fields.js')
const api = require('./api.js')
const ui = require('./ui.js')

const onSignUp = event => {
    // prevents submit button from refreshing the page
    event.preventDefault() 
    console.log(event.target) //logs the element the submit event is targeting 

    let data = getFormFields(event.target)
    api.signUp(data)
        .then(ui.signUpSuccess) // if successfull
        .catch(ui.signUpFailure) // if failure
}   

const drawBoard = () => {
    console.log('hi')
    const gameBoard = $("#game-board")
    console.log(gameBoard)
    gameBoard.toggle()
 
}
module.exports = {
    onSignUp, 
    drawBoard
}