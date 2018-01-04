import controller from './requisiteitem.controller'
import template from './requisiteitem.html'
import './requisiteitem.styl'

const requisiteItemComponent = {
  controller,
  template,
  bindings:{
    item:'<',
    categories:'<',
    mayApply:'<',
    onSelected:'&',
    onAccepted:'&',
    onRejected:'&',
  }
}

export default requisiteItemComponent
