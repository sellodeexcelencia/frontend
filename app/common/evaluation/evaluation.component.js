import template from './evaluation.html'
import controller from './evaluation.controller'
import './evaluation.styl'

const evaluationController = {
  template,
  controller,
  bindings:{
    service:'<'
  }
}

export default evaluationController