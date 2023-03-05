/* eslint-disable */
import { tweenSetAlpha } from '../../utils/tweens.js'
import {callNextState} from '../../utils/utils.js'
import Scratch from '../../components/modules/Scratch.js'
import CollisionOver from '../../components/modules/CollisionOver.js'

export default class Controller {
  constructor(game, cfg) {
    this.game = game
    this.layers = this.game.LAYERS
    this._cfg = cfg
    
    this.sprites = this.game.sprites
    this.bookcaseGroup = this.game.add.group()
  }
  
  startGame = () => {
    this.#initSignals()
  
    this.createHero()
    
    this.createCollisionOver()
    this.createScratch()
  }
  
  createHero = () => {
    this.hero = this.game.make.image(200, 200, 'heroSmall')
    this.layers.GAME.add(this.hero)
  }
  
  createCollisionOver = () => {
    this.collisionOver = new CollisionOver(this.game, this.hero)
  }
  
  createScratch = () => {
    this.bookcase = new Scratch({
      game: this.game,
      cover: 'bookcase',
      x: 500, y: 500,
      MIN_ALPHA_RATIO: 0.20,
    })
  }
  
  update = () => {
    this.bookcase.update()
    this.collisionOver?.update()
  }
  
  restartingGame = () => {
  }
  
  #endGame = () => {
    console.warn('GAME WIN! VICTORY!')
    this.controller.hide(1)
    
    tweenSetAlpha(this.game, this.sprites.logo, 0, 1)
    tweenSetAlpha(this.game, this.sprites.cta, 0, 1)
  
    // clear signals
    for (const key of Object.getOwnPropertyNames(this.game.Signals)) {
      delete this.game.Signals[key]
    }
    
    callNextState(this.game, this.game.constants.States.FINAL)
  }
  
  #initSignals = () => {
    this.game.Signals.winGame = new Phaser.Signal()
    this.game.Signals.winGame.add(() => this.#endGame())
    this.game.Signals.isCollisionOver.add((data) => console.log(data))
  }
}
