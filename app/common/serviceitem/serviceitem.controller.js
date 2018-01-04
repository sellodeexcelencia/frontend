class serviceItemController{
  constructor(Api,$http,STATES){
    'ngInject'
    this.Api = Api
    this.STATES = STATES
    this.$http = $http
    this.serviceEndpoint = Api+'/service/service_status?&order=timestamp%20desc&filter_field=id_service&filter_value='
  }
  $onInit(){
    this.$http.get(this.serviceEndpoint+this.item.id).then((results)=>{
      if(this.item.certified){
        let found = false
        results.data.data.forEach((status)=>{
          if(status.id_status === this.STATES.SERVICE.CUMPLE){
            if(!found){
              this.item.status = status
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