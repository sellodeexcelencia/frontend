class serviceItemController{
  constructor(Api,$http,STATES){
    'ngInject'
    this.Api = Api
    this.STATES = STATES
    this.$http = $http
    this.canUpgrade = false
    this.serviceEndpoint = Api+'/service/service_status?&order=timestamp%20desc&filter_field=id_service&filter_value='
    this.levelEndpoint = Api+'/question/level?category='
    this.maxlevel = 0
  }
  checkLevel(){
    if(this.item.status && this.item.status.level <= this.maxlevel){
      this.canUpgrade = true
    }
  }
  $onInit(){
    this.$http.get(this.levelEndpoint+this.item.id_category).then((results)=>{
      this.maxlevel = results.data[0].leve
      this.checkLevel()
      
    })
    this.$http.get(this.serviceEndpoint+this.item.id).then((results)=>{
      if(this.item.certified){
        let found = false
        results.data.data.forEach((status)=>{
          if(status.id_status === this.STATES.SERVICE.CUMPLE){
            if(!found){
              this.item.status = status
              this.checkLevel()
            }
            found = true
          }
        })
      }else{
        this.item.status = results.data.data[0]
      }
      if(this.item.url.indexOf('http') !== 0){
        this.item.url = 'http://'+this.item.url
      }
    })
  }
}

export default serviceItemController