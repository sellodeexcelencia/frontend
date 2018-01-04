import angular from 'angular'
import signInComponent from './signIn/signIn.component'
import signInCitizenComponent from './signInCitizen/signInCitizen.component'
import signUpComponent from './signUp/signUp.component'
import signUpCitizenComponent from './signUpCitizen/signUpCitizen.component'
import forgotPasswordComponent from './forgotPassword/forgotPassword.component'
import forgotPasswordCitizenComponent from './forgotPasswordCitizen/forgotPasswordCitizen.component'
import changePwdComponent from './changePwd/changePwd.component'
import AuthService from './auth.service'
import activeAccountComponent from './activeAccount/activeAccount.component'


const authentication = angular
  .module('qualityStamp.components.authentication',[])
  .component('signInCitizen',signInCitizenComponent)
  .component('signIn',signInComponent)
  .component('signUpCitizen',signUpCitizenComponent)
  .component('signUp',signUpComponent)
  .component('changePassword',changePwdComponent)
  .component('forgotPassword',forgotPasswordComponent)
  .component('forgotPasswordCitizen',forgotPasswordCitizenComponent)
  .component('activeAccount',activeAccountComponent)
  .service('AuthService',AuthService)
  .name

export default authentication
