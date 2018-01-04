import controller from './autocomplete.controller'
import template from './autocomplete.html'

const autocompleteComponent = {
  controller,
  template,
  bindings:{
    endpoint: '<',
    minLength: '<',
    onSelected: '&',
    placeholder: '@'
  }
}

export default autocompleteComponent