import CollisionOver from './modules/CollisionOver.js'
import Scratch from './modules/Scratch.js'
import Vignette from './modules/Vignette/Vignette.js'

export default class Level1 {
  constructor(game) {
    this.game = game
    this.layers = this.game.LAYERS
  
    this.Positions = {
      hero: {
        landscape: {
          x: 460,
          y: 550,
        },
        portrait: {
          x: 520,
          y: 570,
        },
      },
      bookCase: {
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
      chair: {
        landscape: {
          x: 680,
          y: 880,
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
    this.scratchBookCase = null
    this.scratchBookChair = null
  
    // components
    this.collisionOver = null
  }
  
  init = () => {
    this.vignette = new Vignette({game: this.game})
    // this.vignette.show('red')
    
    this.createHeroFirst()
    this.#resize()
    this.createCollisionOver()
    this.createScratch()
    
    window.addEventListener('resize', () => this.#resize())
  }
  
  createHeroFirst = () => {
    this.hero = this.game.make.image(0, 0, 'heroSmall')
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
  
  #resize = () => {
    if (window.matchMedia('(orientation: portrait)').matches) {
      this.hero.position.set(this.Positions.hero.portrait.x, this.Positions.hero.portrait.y)
    }
    if (window.matchMedia('(orientation: landscape)').matches) {
      this.hero.position.set(this.Positions.hero.landscape.x, this.Positions.hero.landscape.y)
    }
  }
}
