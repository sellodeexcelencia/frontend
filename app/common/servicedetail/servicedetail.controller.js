class ServiceDetailController {
  constructor($state,Api,$http,$auth,STATES) {
    'ngInject'
    this.$state = $state
    this.Api = Api
    this.$http = $http
    this.STATES = STATES
    if(!$state.params.id){
      $state.go('landingPage')
    }
    this.detailEndpoint = Api+'/service/service?simple=false&id='+$state.params.id
    if($auth.isAuthenticated()){
      this.disabled = $auth.getPayload().role === 'Evaluador' ||
        $auth.getPayload().role === 'Entidad'
    }else{
      this.disabled = false
    }
  }
  $onInit() {
    this.getData()
  }
  getData(){
    this.$http.get(this.detailEndpoint).then((results)=>{
      this.item = results.data.data[0]
      if(!this.item){
        this.item = {
          is_active : 0,
          history:[]
        }
      }
      var level = -1
      this.item.history.forEach((status)=>{
        if(status.id_status === this.STATES.SERVICE.CUMPLE){
          if(status.level > level){
            level = status.level
            this.item.status = status
          }
        }
      })
      if(level  === -1){
        this.item.id_active = 0
      }
      if(this.item.url.indexOf('http') !== 0){
        this.item.url = 'http://'+this.item.url
      }
      
    })
  }
}

export default ServiceDetailController