import controller from './chat.controller'
import template from './chat.html'
import './chat.styl'

const chatEvaluatorComponent ={
  template,
  controller,
  bindings:{
    request:'<'
  }
}

export default chatEvaluatorComponent