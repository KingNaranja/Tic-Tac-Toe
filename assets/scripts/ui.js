'use strict'

const store = require('./store.js')

const addFeedback = (message) =>{
    $('#message').text(message) 
    // will update the message div with the appropriate response 
}
const addResponse = (message) => {
    $('#api-response').text(message)
    // updates page with user status
}

const signUpSuccess = data => {
    console.log('signUpSuccess ran. Data is:', data)
    //attach success class to our status message 
    $('#api-response').removeClass()
    $('#api-response').addClass('success')
    // success response
    addResponse('You Signed In Successfully!')
    
}

const signUpFailure = data => {
    console.log('signUpFailure ran. Error is:', data)
    //attach failure to our status message 
    $('#message').removeClass()
    $('#message').addClass('#failure')
    // failure response message
    addResponse('Error on sign-up')

}


const signInSuccess = data => {
    store.currentGame.user = data.user

    console.log('signInSuccess ran. Data is:', data)
    //attach success class to our status message 
    $('#message').removeClass()
    $('#message').addClass('#success')
    // success response 
    addResponse('Thanks for logging in!')
}

const signInFailure = data => {
    
    console.log('signInFailure ran. Error is:', data)
    //attach failure to our status message 
    $('#message').removeClass()
    $('#message').addClass('#failure')
    // failure response 
    addResponse('Error in sign-up')
}


const signOutSuccess = data => {
    store.currentGame.user = null
    $('#message').removeClass()
    $('#message').addClass('success')
    console.log('signOutSuccess ran. Data is :', data)

    addResponse('Signed out successfully')
  }

  const signOutFailure = error => {

    $('#message').removeClass()
    $('#message').addClass('failure')
    console.error('signOutFailure ran. Error is :', error)

    addResponse('Error on sign out')
  }

module.exports = {
    addFeedback,
    signUpSuccess,
    signUpFailure,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure

}