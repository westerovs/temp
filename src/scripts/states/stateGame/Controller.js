/* eslint-disable */
import { tweenSetAlpha } from '../../utils/tweens.js'
import {callNextState} from '../../utils/utils.js'
import Hero1 from '../../components/Hero1.js'
import Hero2 from '../../components/Hero2.js'

export default class Controller {
  constructor(game, cfg) {
    this.game = game
    this.layers = this.game.LAYERS
    this._cfg = cfg
    
    this.sprites = this.game.sprites
  
    // components
    this.hero1 = new Hero1(this.game)
    this.hero2 = new Hero2(this.game)
    
  }
  
  startGame = () => {
    this.#initSignals()
    this.hero1.init()
  }
  
  
  update = () => {
    this.hero1.update()
  }
  
  
  #endGame = () => {
    console.warn('GAME WIN! VICTORY!')
    
    tweenSetAlpha(this.game, this.sprites.logo, 0, 1)
    tweenSetAlpha(this.game, this.sprites.cta, 0, 1)
  
    // clear signals
    for (const key of Object.getOwnPropertyNames(this.game.Signals)) {
      delete this.game.Signals[key]
    }
    
    callNextState(this.game, this.game.constants.States.FINAL)
  }
  
  findCriminalFirst = (value) => {
    if (value <= 1) {
      this.hero1.scratchBookCase.destroy()
      tweenSetAlpha(this.game, this.hero1.hero, 0)
      this.hero2.init()
      
    }
  }
  
  #initSignals = () => {
    this.game.Signals.winGame = new Phaser.Signal()
    this.game.Signals.winGame.add(() => this.#endGame())
    this.game.Signals.isCollisionOver.add((value) => this.findCriminalFirst(value))
  }
}
