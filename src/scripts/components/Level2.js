import CollisionOver from './modules/CollisionOver.js'
import Scratch from './modules/Scratch.js'

export default class Level2 {
  constructor(game) {
    this.game = game
    this.layers = this.game.LAYERS
  
    this.collisionOver = null
    this.scratchHat = null
    this.groupHero = this.game.add.group()
    
    this.Positions = {
      heroGroupPos: {
        landscape: {
          x: 680,
          y: 890,
        },
        portrait: {
          x: 450,
          y: 420,
        },
      },
      scratchHat: {
        landscape: {
          x: 360,
          y: 400,
        },
        portrait: {
          x: 450,
          y: 420,
        },
        shadow: {
          x: -155,
          y: 438,
        }
      },
      scratchGun: {
        landscape: {
          x: 680,
          y: 890,
        },
        portrait: {
          x: 840,
          y: 890,
        },
        shadow: {
          x: -84,
          y: 72,
        }
      },
      scratchPocket: {
        landscape: {
          x: 680,
          y: 890,
        },
        portrait: {
          x: 840,
          y: 890,
        },
        shadow: {
          x: -84,
          y: 72,
        }
      },
    }
  }
  
  init = () => {
    this.createHero()
    
    // this.createCollisionOver()
    this.createScratch()
    this.game.resize()
  }
  
  createHero = () => {
    const leftHand = this.groupHero.create(-13, 147, 'leftHand')
    const body = this.groupHero.create(0, 0, 'body')
    
    const faceAngry = this.groupHero.create(142, -50, 'faceAngry')
    const faceSad = this.groupHero.create(142, -50, 'faceSad')
    const faceShock = this.groupHero.create(142, -50, 'faceShock')
    const handsArrested = this.groupHero.create(25, 133, 'handsArrested')
    const rightHand = this.groupHero.create(275, 128, 'rightHand')
    
    // interactive
    faceSad.alpha = 0
    faceShock.alpha = 0
    
    rightHand.alpha = 1
    leftHand.alpha = 1
    handsArrested.alpha = 0
    
    this.groupHero.position.set(this.groupPos.x, this.groupPos.y)
    this.layers.GAME.add(this.groupHero)
  }
  
  createScratch = () => {
    //   game: this.game,
    //   key: 'bookcase',
    //   minAlphaRatio: null,
    //   spritePos: this.Positions.bookCase,
    
    // this.scratchHat = new Scratch({
    //   game: this.game,
    //   key: 'hat',
    //   x: this.groupPos.x + 134, y: this.groupPos.y - 89,
    //   minAlphaRatio: 0.33,
    //   isWin: true,
    // })
  
    // this.scratchGun = new Scratch({
    //   game: this.game,
    //   key: 'gun',
    //   x: this.groupPos.x + 360, y: this.groupPos.y + 50,
    //   minAlphaRatio: 0.33,
    //   isWin: true,
    // })
    
    // this.scratchPocket = new Scratch({
    //   game: this.game,
    //   key: 'pocket',
    //   x: this.groupPos.x + 187, y: this.groupPos.y + 214,
    //   minAlphaRatio: 0.45,
    //   isWin: true,
    // })
  }
  
  update = () => {
    this.scratchHat?.update()
    this.scratchGun?.update()
    this.scratchPocket?.update()
  }
}
