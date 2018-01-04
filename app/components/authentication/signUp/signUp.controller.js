class SignUpController {
  constructor($state,AuthService,toastr,$auth) {
    'ngInject'
    this.$state = $state
    this.$auth = $auth
    this.AuthService = AuthService
    this.toastr = toastr
    this.modalElement = $('.modal')
  }

  $onInit() {
    this.loadding = false
    this.modalElement.modal()
  }
  authenticate(provider) {
    this.$auth.authenticate(provider)
  }
  onSignUp() {
    this.loadding = true
    this.serverError = false
    const user = {
      email : this.email,
      password: this.password,
      role: this.role.id
    }
    this.AuthService.signUp(user)
      .then(data => {
        this.loadding = false
        if (data.error) {
          this.serverError = true
          this.errorMessage = 'El email ingresado está registrado con otro usuario.'
          this.toastr.error(this.errorMessage,'Error en el registro')
          return
        }
        this.modalElement.modal('open')
      })
  }

  onClickModal() {
    this.modalElement.modal('close')
    this.$state.go('signIn')
  }
}

export default SignUpController
