import CollisionOver from './modules/CollisionOver.js'
import Scratch from './modules/Scratch.js'

class SpritePosition {
  constructor(sprites, scalePanel) {
    this.sprites = sprites
    this.checkedIndexSprite = 0
    this.sprite = null
    this.spritesLength = Object.entries(sprites).length - 1
    this.spriteName = null

    this.className = 'sprite-position-panel'
    this.scalePanel = scalePanel
    
    this.ElementPosition = {
      X: null,
      Y: null,
      ANGLE: null,
    }
    this.ElementInfo = {
      NAME: null,
      X: null,
      Y: null,
      ANGLE: null,
    }
    
    this.STEP = 1
    this.STEP_ACCELERATOR = 10

    this.init()
  }

  init = () => {
    this.#update()
    this.#createInfoPanel()
    this.#addHandlers()
  }

  #update = () => {
    if (this.checkedIndexSprite >= this.spritesLength) {
      this.checkedIndexSprite = this.spritesLength
    }
    if (this.checkedIndexSprite <= 0) {
      this.checkedIndexSprite = 0
    }

    this.sprite = Object.entries(this.sprites)[this.checkedIndexSprite][1]
    this.spriteName = this.sprite.frameName
    this.ElementPosition.X = this.sprite.position.x
    this.ElementPosition.Y = this.sprite.position.y
    this.anglePosition = this.sprite.angle
  }
  
  #updateElementInfo = () => {
    this.ElementInfo.NAME.innerHTML  = `Sprite: ${ this.spriteName }`
    this.ElementInfo.X.innerHTML     = `X: ${ Math.trunc(this.sprite.position.x) }`
    this.ElementInfo.Y.innerHTML     = `Y: ${ Math.trunc(this.sprite.position.y) }`
    this.ElementInfo.ANGLE.innerHTML = `Angle: ${ Math.trunc(this.sprite.angle) }`
  }

  #checkoutSprite = () => {
    this.#update()
    this.#updateElementInfo()
  }

  #createInfoPanel = () => {
    const wrapInfo = document.createElement('div')
    wrapInfo.setAttribute('style', `
        position: absolute;
        top: -75px;
        left: -225px;
        min-width: 80px;
        padding: 0 10px;
        font-family: Monospace, Arial;
        font-size: ${this.scalePanel ? this.scalePanel : 2}em;
        line-height: ${this.scalePanel ? this.scalePanel : 2}em;
        background: rgba(0, 0, 0, 0.6);
        border-radius: 15px;
        box-shadow: 5px 5px 5px black;
        color: white;
        z-index: 999;
        transform: scale(0.5);
    `)
  
    this.ElementInfo.NAME  = document.createElement('p')
    this.ElementInfo.X     = document.createElement('p')
    this.ElementInfo.Y     = document.createElement('p')
    this.ElementInfo.ANGLE = document.createElement('p')

    wrapInfo.append(this.ElementInfo.NAME)
    wrapInfo.append(this.ElementInfo.X)
    wrapInfo.append(this.ElementInfo.Y)
    wrapInfo.append(this.ElementInfo.ANGLE)
  
    this.#updateElementInfo()
  
    document.body.append(wrapInfo)
  }

  #addHandlers() {
    document.addEventListener('keydown', (key) => {
      // сменить sprite ctrl + arrows
      if (key.code === 'ArrowLeft' && key.ctrlKey) {
        this.checkedIndexSprite--
        this.#checkoutSprite()
        return
      }
      if (key.code === 'ArrowRight' && key.ctrlKey) {
        this.checkedIndexSprite++
        this.#checkoutSprite()
        return
      }

      // ↑→↓← - смена позиции
      if (key.code === 'ArrowDown') this.ElementPosition.Y += this.STEP
      if (key.code === 'ArrowUp') this.ElementPosition.Y -= this.STEP
      if (key.code === 'ArrowLeft') this.ElementPosition.X -= this.STEP
      if (key.code === 'ArrowRight') this.ElementPosition.X += this.STEP

      // важен порядок → сперва зажимаем shift, потом кнопку
      if (key.code === 'ArrowDown' &&  !key.altKey && key.shiftKey) this.ElementPosition.Y += this.STEP_ACCELERATOR
      if (key.code === 'ArrowUp' &&  !key.altKey && key.shiftKey) this.ElementPosition.Y -= this.STEP_ACCELERATOR
      if (key.code === 'ArrowLeft' &&  !key.altKey && key.shiftKey) this.ElementPosition.X -= this.STEP_ACCELERATOR
      if (key.code === 'ArrowRight' && !key.altKey &&  key.shiftKey) this.ElementPosition.X += this.STEP_ACCELERATOR

      // важен порядок → сперва зажимаем alt, потом кнопку
      if (key.code === 'ArrowDown' && key.altKey && !key.shiftKey) this.anglePosition += this.STEP
      if (key.code === 'ArrowUp' && key.altKey && !key.shiftKey) this.anglePosition -= this.STEP
      if (key.code === 'ArrowLeft' && key.altKey && !key.shiftKey) this.anglePosition -= this.STEP
      if (key.code === 'ArrowRight' && key.altKey && !key.shiftKey) this.anglePosition += this.STEP
  
      this.#updateElementInfo()

      this.sprite.position.set(this.ElementPosition.X, this.ElementPosition.Y)
      this.sprite.angle = this.anglePosition
    })

    // сменить sprite колёсиком
    document.addEventListener('wheel', (wheel) => {
      if (wheel.deltaY < 0) {
        this.checkedIndexSprite++
        this.#checkoutSprite()
      } else {
        this.checkedIndexSprite--
        this.#checkoutSprite()
      }
    });
  }
}

export default class Hero2 {
  constructor(game) {
    this.game = game
    this.layers = this.game.LAYERS
  
    this.collisionOver = null
    this.scratchBookCase = null
    this.groupHero = this.game.add.group()
  }
  
  init = () => {
    this.createHero()
    new SpritePosition(this.groupHero.children)
    
    // this.createCollisionOver()
    // this.createScratch()
  }
  
  createHero = () => {
    
    const leftHand = this.groupHero.create(-13, 147, 'leftHand')
    const body = this.groupHero.create(0, 0, 'body')
    
    const faceAngry = this.groupHero.create(142, -50, 'faceAngry')
    const faceSad = this.groupHero.create(142, -50, 'faceSad')
    const faceShock = this.groupHero.create(142, -50, 'faceShock')
    const pocket = this.groupHero.create(187, 214, 'pocket')
    const handsArrested = this.groupHero.create(25, 133, 'handsArrested')
    const rightHand = this.groupHero.create(275, 128, 'rightHand')
    const gun = this.groupHero.create(360, 50, 'gun')
    const hat = this.groupHero.create(134, -89, 'hat')
    // const handOffGun = this.groupHero.create(360, 130, 'handOffGun')
    
    // interactive
    faceSad.alpha = 0
    faceShock.alpha = 0
    rightHand.alpha = 1
    leftHand.alpha = 1
    handsArrested.alpha = 0
    
    this.groupHero.position.set(450, 420)
    this.layers.GAME.add(this.groupHero)
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
    this.scratchBookChair.update()
  }
}
