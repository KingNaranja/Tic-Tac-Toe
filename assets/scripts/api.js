'use strict'

const config = require('./config.js')
const store = require('./store.js')

const signUp = data => {
    console.log("in signup data is", data)
    return $.ajax ({
        url: config.apiUrl + '/sign-up',
        method: 'POST',
        data
    })
}

const signIn = data => {
    return $.ajax({
      url: config.apiUrl + '/sign-in',
      method: 'POST',
      data
    })
  }

  const signOut = () => {
    return $.ajax({
      url: config.apiUrl + '/sign-out',
      method: 'DELETE',
      headers: {
        Authorization: 'Token token=' + store.currentGame.user.token
      }
    })
  }
module.exports = {
    signUp,
    signIn,
    signOut
}