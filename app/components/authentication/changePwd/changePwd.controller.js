class ChangePwdController {
  constructor(Api, $http, $auth, $state) {
    'ngInject'
    this.$http = $http
    this.$state = $state
    this.changePwdEndpoint = Api + '/auth/password'
    this.form = document.getElementById('forgotPasswordForm')
    if(!$auth.isAuthenticated()){
      $state.go('landingPage')
    }
    this.loading = false
    this.finished = false
    this.error = false
  }
  goHome(){
    this.$state.go('landingPage')
  }
  updatePassword() {
    if (this.confirm !== this.password) {
      return
    }
    this.loading = true
    this.error = false
    this.finished = false
    this.$http.post(this.changePwdEndpoint,{old:this.old_pwd, password:this.password}).then(()=>{
      this.loading = false
      this.finished = true
      
    }).catch(()=>{
      this.loading = false
      this.error = true
    })
  }
}

export default ChangePwdController