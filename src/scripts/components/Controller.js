/* eslint-disable */
import { tweenSetAlpha } from '../utils/tweens.js';

export default class Controller {
  constructor(game, state) {
    this.game = game
    this.state = state
  
    // components
    this.cardsContainer   = null
    this.miniMap = null
    
    this.previewDelay = this.game._cfg.previewDelay
  }
  
  init() {

  }
  
  hide = (delay) => {
    tweenSetAlpha(this.game, this.cardsContainer, 0, delay)
  }
}
