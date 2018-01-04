class NavbarController {
  constructor($auth,toastr,$state,Api,$http,$rootScope) {
    'ngInject'
    this.$auth = $auth
    this.toastr = toastr
    this.$state = $state
    this.$http = $http
    this.logoEndpoint = Api + '/configuration/config'
    this.canAdvance = true
    this.canProfile = true
    this.$rootScope = $rootScope
    this.$rootScope.$on('user',()=>{
      if(this.$auth.isAuthenticated()){
        if(this.$auth.getPayload().role){
          if(this.$auth.getPayload().role === 'Ciudadano'){
            this.canAdvance = false
            this.canProfile = false
          }
        }
      }
    })
  }

  $onInit(){
    this.$http.get(this.logoEndpoint).then((result)=>{
      this.logo_header = result.data.data[0].header
    }).catch(()=>{
      this.logout()
    })
    this.canAdvance = true
    this.canProfile = true
    if(this.$auth.isAuthenticated()){
      if(this.$auth.getPayload().role){
        if(this.$auth.getPayload().role === 'Ciudadano'){
          this.canAdvance = false
          this.canProfile = false
        }
      }
    }
  }
  isAuthenticated() {
    return this.$auth.isAuthenticated()
  }

  getCurrentUser() {
    return this.$auth.getPayload()
  }

  goProfile(){
    if(this.$auth.getPayload().role === 'Entidad'){
      this.$state.go('entity.profile')
    }else if(this.$auth.getPayload().role === 'Evaluador'){
      this.$state.go('evaluator.profile')
    }else{
      this.$state.go('landingPage').then(()=>{
        window.location.reload()
      })
    }
  }
  goAdvance(){
    if(this.$auth.getPayload().role === 'Entidad'){
      this.$state.go('entity.advance')
    }else if(this.$auth.getPayload().role === 'Evaluador'){
      this.$state.go('evaluator.advance')
    }else{
      this.$state.go('landingPage').then(()=>{
        window.location.reload()
      })
    }
  }
  goChangePwd(){
    this.$state.go('changePwd')
  }

  logout() {
    this.toastr.info('Cerraste sesión, vuelve pronto...','Cerrar sesión')
    this.$auth.logout()
    this.$state.go('landingPage').then(()=>{
      if(this.$state.current.name === 'landingPage'){
        window.location.reload()
      }
    })
  }
  
  changeFontSize(size) {
    const fontSize = $('body').css('font-size').split('px')
    let currentSize = Number(fontSize[0])

    if (size === 'increase'){
      currentSize += 5
    } else {
      currentSize -= 5
    }

    $('body').css({'font-size': `${currentSize}px`})
  }

}

export default NavbarController
