import template from './signInCitizen.html'
import controller from './signInCitizen.controller'
import './signInCitizen.styl'

const signInCitizenComponent = {
  template,
  controller,
  bindings:{
    onSignup:'&',
    onForget:'&'
  }
}

export default signInCitizenComponent
