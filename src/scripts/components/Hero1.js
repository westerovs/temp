import CollisionOver from './modules/CollisionOver.js'
import Scratch from './modules/Scratch.js'

export default class Hero1 {
  constructor(game) {
    this.game = game
    this.layers = this.game.LAYERS
  
    this.collisionOver = null
    this.scratchBookCase = null
  }
  
  init = () => {
    this.createHeroFirst()
    this.createCollisionOver()
    this.createScratch()
  }
  
  createHeroFirst = () => {
    this.hero = this.game.make.image(520, 570, 'heroSmall')
    this.layers.GAME.add(this.hero)
  }
  
  createCollisionOver = () => {
    this.collisionOver = new CollisionOver({
      game: this.game, hero: this.hero, isDebug: false,
    })
  }
  
  createScratch = () => {
    this.scratchBookCase = new Scratch({
      game: this.game,
      cover: 'bookcase',
      x: 450, y: 420,
      MIN_ALPHA_RATIO: 0.20,
    })
    
    this.scratchBookChair = new Scratch({
      game: this.game,
      cover: 'chair',
      x: 840, y: 890,
      MIN_ALPHA_RATIO: 0.25,
      isWin: true,
    })
  }
  
  update = () => {
    this.scratchBookCase.update()
    // this.scratchBookChair.update()
  }
}
