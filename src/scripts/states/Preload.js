import { config } from '../../../configs/config.js';

export default class Preload extends Phaser.State {
  constructor(config) {
    super()
  
    this.config = config
  }
  
  preload() {
    // backgrounds
    this.load.image('bg', './src/assets/images/backgrounds/bg.jpg')
    this.load.image('bgPreload', './src/assets/images/backgrounds/bg-preload.jpg')
    
    // logo
    this.load.image('logo', './src/assets/images/ui/logo.png')
  
    // bookcase
    this.load.image('bookcase', './src/assets/images/game-items/bookcase/bookcase.png')
    this.load.image('bookcaseShadow', './src/assets/images/game-items/bookcase/bookcase-shadow.png')
  
    // chair
    this.load.image('chair', './src/assets/images/game-items/chair/chair.png')
    this.load.image('chairShadow', './src/assets/images/game-items/chair/chair-shadow.png')
  
    // hero
    this.load.image('heroSmall', './src/assets/images/characters/hero-small.png')
    
  }
  
  create() {
    game.constants = config.constants
    this.state.start(this.config.constants.States.GAME)
  }
  
  createBg = () => {
    this.background = this.game.add.sprite(0, 0, 'bg')
  }
  
  createRect = (game, container, x, y, w, h) => {
    const rect = game.add.graphics(0, 0);
    rect.beginFill(0x000000);
    rect.fillAlpha = 0.1
    rect.anchor.set(0.5)
    rect.drawRect(x, y, w, h);
    rect.endFill();
  }
}

