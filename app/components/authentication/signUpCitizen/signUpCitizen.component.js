import template from './signUpCitizen.html'
import controller from './signUpCitizen.controller'
import './signUpCitizen.styl'

const signUpCitizenComponent = {
  template,
  controller,
  bindings:{
    onSignin:'&',
    onForget:'&'
  }
}

export default signUpCitizenComponent
