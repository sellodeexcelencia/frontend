import template from './categoryItem.html'
import './categoryItem.styl'

const categoryItemComponent = {
  template,
  bindings: {
    category: '<',
    goTo: '&'
  }
}

export default categoryItemComponent
