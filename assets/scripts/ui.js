'use strict'

const store = require('./store.js')

const addFeedback = (message) =>{
    $('#message').text(message) 
    // will update the message div with the appropriate response 
}
const addResponse = (message) => {
    // updates page with user status
    $('#api-response').toggle()
    $('#api-response').text(message)
    // hide response after 2 seconds 
    setTimeout(()=>{
        $('#api-response').toggle()
        },2000)
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
    store.userData = data.user

    console.log('signInSuccess ran. Data is:', data)
    //attach success class to our status message 
    $('#message').removeClass()
    $('#message').addClass('#success')
    // success response 
    addResponse('Thanks for logging in!')
    // Once user is online, the user can start the game 
    $('#drawBoard').toggle()

    // hide the sign-up fieldset
    $('#sign-up').toggle()
    $('#sign-in').toggle()
    $('#sign-out').toggle("slow")
    $('#change-password').toggle("slow")

    $('.getGames').toggle()


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

    // return back to initital view 
    $('#sign-up').toggle('slow')
    $('#sign-in').toggle('slow')
    $('#sign-out').toggle()
    $('#change-password').toggle()
    $('#drawBoard').hide()

    // in case user logs out mid game
    store.currentGame.endGame()
    $('#playAgain').hide()
    $('.square').text('')
    $('.gameBoard').hide()
    
  }

  const signOutFailure = error => {

    $('#message').removeClass()
    $('#message').addClass('failure')
    console.error('signOutFailure ran. Error is :', error)

    addResponse('Error on sign out')
  }

  const changePasswordSuccess = data => {
    addResponse('Password changed successfully')

    $('#message').removeClass()
    $('#message').addClass('success')
    console.log('changePasswordSuccess ran. Data is :', data)
  }
  
  const changePasswordFailure = error => {
    addResponse('Error on password change')

    $('#message').removeClass()
    $('#message').addClass('failure')
    console.error('changePasswordFailure ran. Error is :', error)
  }




module.exports = {
    addFeedback,
    signUpSuccess,
    signUpFailure,
    signInSuccess,
    signInFailure,
    signOutSuccess,
    signOutFailure,
    changePasswordSuccess,
    changePasswordFailure

}