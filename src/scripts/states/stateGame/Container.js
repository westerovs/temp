/* eslint-disable */
import Controller from '../../components/Controller.js'
import { tweenSetAlpha } from '../../utils/tweens.js'
import {callNextState} from '../../utils/utils.js'

export default class Container {
  constructor(game, cfg) {
    this.game = game
    this._cfg = cfg
    
    this.sprites = this.game.sprites
  }
  
  startGame = () => {
    this.#initSignals()
    
    // init
    this.controller = new Controller(this.game, this.game.state)
    this.controller.init()
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
  }
}
