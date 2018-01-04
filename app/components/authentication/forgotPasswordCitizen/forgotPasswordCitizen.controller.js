class forgotPasswordCitizen{
  constructor($http,Api,$state){
    'ngInject'
    this.$http = $http
    this.loading = false
    this.finished = false
    this.error = false
    this.$state = $state
    this.forgotEndpoint = Api + '/auth/recover'
  }
  forgotPassword(){
    this.loading = true
    this.$http.post(this.forgotEndpoint,{email:this.email}).then(()=>{
      this.loading = false
      this.error = false
      this.finished = true
    }).catch(()=>{
      this.loading = false
      this.finished = false
      this.error = true
    })
  }
  goHome(){
    this.$state.go('landingPage')
  }
}

export default forgotPasswordCitizen