import CollisionOver from './modules/CollisionOver.js'
import Scratch from './modules/Scratch.js'

export default class Hero2 {
  constructor(game) {
    this.game = game
    this.layers = this.game.LAYERS
  
    this.collisionOver = null
    this.scratchHat = null
    this.groupHero = this.game.add.group()
    this.groupPos = {
      x: 450,
      y: 420
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
    this.scratchHat = new Scratch({
      game: this.game,
      cover: 'hat',
      x: this.groupPos.x + 134, y: this.groupPos.y - 89,
      MIN_ALPHA_RATIO: 0.33,
      isWin: true,
    })
  
    this.scratchGun = new Scratch({
      game: this.game,
      cover: 'gun',
      x: this.groupPos.x + 360, y: this.groupPos.y + 50,
      MIN_ALPHA_RATIO: 0.33,
      isWin: true,
    })
    
    this.scratchPocket = new Scratch({
      game: this.game,
      cover: 'pocket',
      x: this.groupPos.x + 187, y: this.groupPos.y + 214,
      MIN_ALPHA_RATIO: 0.45,
      isWin: true,
    })

  }
  
  update = () => {
    this.scratchHat?.update()
    this.scratchGun?.update()
    this.scratchPocket?.update()
  }
}
