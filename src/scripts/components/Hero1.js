import CollisionOver from './modules/CollisionOver.js'
import Scratch from './modules/Scratch.js'

export default class Hero1 {
  constructor(game) {
    this.game = game
    this.layers = this.game.LAYERS
  
    this.Positions = {
      bookCase: {
        landscape: {
          x: 450,
          y: 420,
        },
        portrait: {
          x: 450,
          y: 420,
        },
      },
      chair: {
        landscape: {
          x: 840,
          y: 890,
        },
        portrait: {
          x: 840,
          y: 890,
        },
      },
    }
    this.scratchBookCase = null
    this.scratchBookChair = null
  
    // components
    this.collisionOver = null
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
      game: this.game, hero: this.hero, isDebug: true,
    })
  }
  
  createScratch = () => {
    this.scratchBookCase = new Scratch({
      game: this.game,
      key: 'bookcase',
      minAlphaRatio: null,
      spritePos: this.Positions.bookCase,
    })
    
    this.scratchBookChair = new Scratch({
      game: this.game,
      key: 'chair',
      minAlphaRatio: 0.003,
      spritePos: this.Positions.chair
    })
  }
  
  update = () => {
    this.scratchBookCase?.update()
    this.scratchBookChair?.update()
  }
}
