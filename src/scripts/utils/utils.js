const getRandomNumber = (min = 0, max) => Math.floor(Math.random() * (max - min) + min)

const callNextState = (game, stateName, secondDelay = 500) => {
  const camera = game.camera
  
  game.time.events.add(secondDelay, () => {
    camera.fade()
    
    camera.onFadeComplete.addOnce(() => {
      game.state.start(stateName, true)
    })
  })
}

export {
  getRandomNumber,
  callNextState,
}

