class SignInController {
  constructor($auth,toastr,$state) {
    'ngInject'
    this.$auth = $auth
    this.toastr = toastr
    this.$state = $state
  }

  $onInit() {
    this.loadding = false
    this.serverError = false
  }
  authenticate(provider) {
    this.$auth.authenticate(provider)
  }
  goCitizen(){
    this.$state.go('certifiedservices')
  }

  onSignIn() {
    this.loadding = true
    this.serverError = false
    this.$auth.login(this.credentials)
      .then(() => {
        this.toastr.success('Inicio de sesión exitoso','Iniciar sesión')
        this.loadding = false
        let user = this.$auth.getPayload()
        if(user.tmp_pwd === 1){
          this.$state.go('changePwd')
        }else if(user.role === 'Entidad'){
          this.$state.go('entity.postulate')
        }else if(user.role === 'Evaluador'){
          this.$state.go('evaluator.activity')
        }else if(user.role === 'Ciudadano'){
          this.$state.go('certifiedservices').then(()=>{
            window.location.reload()
          })
        }else{
          this.$state.go('landingPage')
        }
        
      })
      .catch(({ data: { error } }) => {
        const CODE_USER_NOT_ACTIVE = 203
        this.loadding = false
        this.serverError = true
        this.errorMessage = 'Email o contraseña incorrecta'
        if (error.code === CODE_USER_NOT_ACTIVE) {
          this.errorMessage = 'Usuario no activo, dirijase a su correo y proceda a activar su cuenta.'
        }
        this.toastr.error(this.errorMessage,'Error al iniciar sesión')
      }) 
  }

}

export default SignInController
