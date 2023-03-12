/*
Singleton

Ширина виньетки рассчитывается в rem относительно родителя.
За счёт этого работает её адаптивность.
При желании можно в боди менять родительский font-size. По умолчанию он равен 16

Пример вызова:
    this.vignette = MODULES.vignette({game: this.game})
    
this.vignette.show('purple')
this.vignette.show('#FFFFFF')
this.vignette.show('rgb(255 0 0)')

скрыть:
this.vignette.hide()
*/

export default class Vignette {
  constructor(props) {
    if (typeof Vignette.instance === 'object') {
      return Vignette.instance
    }

    this.game = props.game
    this.color = props.color ? props.color : 'rgb(255 0 0)'

    this.vignette = null
    this.create()

    Vignette.instance = this
    return Vignette.instance
  }

  create = () => {
    this.vignette = document.createElement('div')
    this.vignette.classList.add('vignette')
    this.setColor(this.color)
    document.querySelector('body').append(this.vignette)
  }

  setColor = (color) => {
    this.vignette.style.boxShadow = `inset 0rem 0rem 5rem 0.625rem ${color}`
  }

  show = (color) => {
    this.setColor(color)
    this.vignette.style.opacity = '1'
  }

  hide = () => {
    this.vignette.style.opacity = '0'
  }
}
