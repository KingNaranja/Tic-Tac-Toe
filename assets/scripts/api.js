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
    let user = store.userData
    
    return $.ajax({
    url: config.apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
        Authorization: 'Token token=' + user.token
    }
    })
}

const changePassword = data => {
    let user = store.userData

    return $.ajax({
      url: config.apiUrl + '/change-password',
      method: 'PATCH',
      headers: {
        Authorization: 'Token token=' + user.token
      },
      data
    })
  }

  const updateMove = moveData => {
    let user = store.userData
    console.log(moveData)
    return $.ajax({
        url: config.apiUrl + 'games/' + store.currentGame.id,
        method: 'PATCH',
        headers: {
          Authorization: 'Token token=' + user.token
        },
        moveData
      })
  }

  const createGame = () => {
    let user = store.userData
    return $.ajax({
        url: config.apiUrl + '/games',
        method: 'POST',
        headers: {
          Authorization: 'Token token=' + user.token
        },
        
      })
  }


module.exports = {
    signUp,
    signIn,
    signOut,
    changePassword,
    updateMove,
    createGame,

}