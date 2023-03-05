/*
Рендерит квадратики по заданным параметрам на выбранном объекте
при прохождении курсора по ним, убирает неактивные, вычисляет оставшиеся кол-во.
Используется в scratch механике, когда нужно понять, насколько процентов вы открыли персонаж
* */

export default class CollisionOver {
  constructor({game, hero, isDebug}) {
    this.game = game
    this.hero = hero
    this.isDebug = isDebug
    
    this.dotsArr = []
    this.maxLengthDotsArr = null
    this.remainsDotsLength = null
    
    this._pointerData = null
    
    this.init()
  }
  
  init = () => {
    this.#createDots()
  }

  #createDots = () => {
    const heroBack = this.hero

    const size = 35
    const offset = 0
    
    for (let row = 0; row <= 2; row++) {
      for (let col = 0; col < 11; col++) {
        // пропускаю пустые части на персонаже
        if (row === 0) {
          if (col === 0 || col > 3) continue
        }
        if (row === 2) {
          if (col === 0) continue
        }

        const dot = this.#createDot(heroBack, (size + offset) * row, (size + offset) * col, size)
        dot.inputEnabled = true
        dot.alpha = this.isDebug ? 1 : 0
        this.dotsArr.push(dot)
        
        dot.events.onInputOver.add(() => this.#handlePointerOver(dot))
      }
    }
    
    this.maxLengthDotsArr = this.dotsArr.length
    console.log('hero maxParts: ', this.maxLengthDotsArr)
  }
  
  #createDot = (container, x = 0, y = 0, size = 40, color = 0x00FFA9) => {
    const dot = this.game.make.graphics(0, 0)
    dot.beginFill(color)
    dot.fillAlpha = 0.5
    dot.drawRect(x, y, size, size)
    dot.endFill()
  
    container.addChild(dot)
    
    return dot
  }
  
  #handlePointerOver = dot => {
    const target = dot
    target.visible = false
    
    this.remainsDotsLength = this.dotsArr.filter(dot => dot.visible === true).length
    this.checkCleared(this.remainsDotsLength)
    target.cacheAsBitmap = true // хм...
  }
  
  checkCleared = (remainsDotsLength) => {
    this.game.Signals.isCollisionOver.dispatch(remainsDotsLength)
  }
}
