import template from './forgotPasswordCitizen.html'
import controller from './forgotPasswordCitizen.controller'

const forgotPasswordCitizenComponent = {
  controller,
  template,
  bindings:{
    onSignin:'&'
  }
}

export default forgotPasswordCitizenComponent
