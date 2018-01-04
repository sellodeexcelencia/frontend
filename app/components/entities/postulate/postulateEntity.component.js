import controller from './postulateEntity.controller'
import template from './postulateEntity.html'
import './postulateEntity.styl'

const postulateEntityComponent = {
  controller,
  template,
  bindings:{
    onNavigate : '&'
  }
}

export default postulateEntityComponent