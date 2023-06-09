/* eslint-disable */
import { tweenSetAlpha } from '../../utils/tweens.js'
import {callNextState} from '../../utils/utils.js'
import Level1 from '../../components/Level1.js'
import Level2 from '../../components/Level2.js'

export default class Controller {
  constructor(game, cfg) {
    this.game = game
    this.layers = this.game.LAYERS
    this._cfg = cfg
    
    this.sprites = this.game.sprites
  
    // components
    this.level1 = new Level1(this.game)
    this.level2 = new Level2(this.game)
  }
  
  startGame = () => {
    this.#initSignals()
    this.level1.init()
    // this.level2.init()
  }
  
  update = () => {
    this.level1?.update()
    this.level2?.update()
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
    console.log(value)
    // if (value <= 1) {
    //   tweenSetAlpha(this.game, this.level1.hero, 0)
    //   this.level1.scratchBookCase.destroy()
    //
    //   // this.level2.init()
    // }
  }
  
  #initSignals = () => {
    this.game.Signals.winGame = new Phaser.Signal()
    this.game.Signals.winGame.add(() => this.#endGame())
    this.game.Signals.isCollisionOver.add((value) => this.findCriminalFirst(value))
  }
}
