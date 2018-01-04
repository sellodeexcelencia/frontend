import controller from './entityservice.controller'
import template from './entityservice.html'
import './entityservice.styl'

const entityServiceComponent = {
  controller,
  template,
  bindings:{
    service:'<'
  }
}

export default entityServiceComponent