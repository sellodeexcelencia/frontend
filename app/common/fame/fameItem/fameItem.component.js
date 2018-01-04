import template from './fameItem.html'
import './fameItem.styl'

const fameItemComponent = {
  template,
  bindings: {
    position: '<',
    other: '@',
    item: '<',
    goTo: '&'
  }
}

export default fameItemComponent
