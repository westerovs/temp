export default class Scratch {
  constructor({
    game,
    innerSpriteKey,
    cover,
    coverAtlas,
    x,
    y,
    MIN_ALPHA_RATIO = 0.5,
    stopFinal = false
  }) {
    this.game           = game
    this.innerSpriteKey = innerSpriteKey
    this.cover          = cover
    this.coverAtlas     = coverAtlas
    this.x              = x
    this.y              = y
    this.innerCover     = null
    this.coverWrap      = null
    this.game.factor = 1
    
    this.MIN_ALPHA_RATIO = MIN_ALPHA_RATIO
    // stopFinal: передать true, если нужно что бы не вызывалось событие win, например если хотите вторым слоем подсветку сделать
    this.stopFinal       = stopFinal
    this.finish          = false
    
    // верхний спрайт, который нужно стирать
    this.coverSprite = null
    this.differentBetweenWidthOrHeight = 0
    
    this.init()
}
  
  init() {
    // this.#createInnerCover()
    this.#createCoverWrap()
    this.moveDot = new Phaser.Circle(0, 0, 25)
  }
  
  destroy() {
    this.coverSprite.alive = false
    this.coverWrap.destroy()
  }
  
  update() {
    if (!this.coverSprite.alive) return
    
    this.#onTouchStart()
    // this.#checkWin()
  }
  
  #onTouchStart = () => {
    if (this.game.input.activePointer.isDown) {
      this.superX = ((this.game.input.worldX / this.game.factor) - this.x)
      this.superY = ((this.game.input.worldY / this.game.factor) - this.y)
      const rgba  = this.coverWrap.getPixel(this.superX, this.superY)
      
      if (rgba.a > 0) {
        this.coverWrap.blendDestinationOut()
        this.coverWrap.circle(this.superX, this.superY, 25, 'blue')
        this.coverWrap.blendReset()
        this.coverWrap.dirty = true
      }
    }
  }
  
  render() {
    this.moveDot.x = this.game.input.worldX
    this.moveDot.y = this.game.input.worldY
    this.game.debug.geom(this.moveDot,'blue');
  }
  
  #createInnerCover = () => {
    if (!this.innerSpriteKey) return
    this.innerCover = this.game.add.image(this.x, this.y, `${ this.cover }`)
  }
  
  #createCoverWrap = () => {
    this.coverSprite = this.game.make.sprite(0, 0, `${ this.cover }`)
    
    this.coverWrap   = this.game.make.bitmapData(this.coverSprite.width, this.coverSprite.height)
    this.coverWrap.x = this.x
    this.coverWrap.y = this.y
    this.coverWrap.addToWorld(this.x, this.y)
    
    this.coverWrap.draw(this.coverSprite)
    this.coverWrap.update()
  }
  
  #clearCoverWrap = () => {
    this.coverWrap.context.clearRect(0, 0, this.coverSprite.width, this.coverSprite.height)
  }
  
  getAlphaRatio = () => {
    const {ctx}     = this.coverWrap
    let alphaPixels = 0
    
    const {data} = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    // чем выше число, тем быстрее происходит полная очистка
    const coefficientBrush = 4
    for (let i = 0; i < data.length; i += coefficientBrush) {
      if (data[i] > 0) alphaPixels++
    }
    
    return alphaPixels / (ctx.canvas.width * ctx.canvas.height)
  }
  
  #checkWin = () => {
    const alphaRatio = this.getAlphaRatio()
    
    if (!this.finish && alphaRatio < this.MIN_ALPHA_RATIO) {
      this.finish = true
      this.#clearCoverWrap()
      this.destroy()
  
      if (this.stopFinal) return
      // эта часть опциональна, если хотите посылать сигнал, о том, что всё очищено ↓
      // this.game.isFinalGame.dispatch('xxx')
    }
  }
}
