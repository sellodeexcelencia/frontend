class requisiteItemController{
  constructor(Api,$http,STATES){
    'ngInject'
    this.Api = Api
    this.STATES = STATES
    this.$http = $http
    this.institutionEndpoint = Api + '/place/institution'
  }
  $onInit(){
    if(this.categories && this.item){
      this.categories.forEach(function(category) {
        if(this.item.topic.id_category === category.id ){
          this.item.topic.category = category
        }
      }, this)
      this.$http.get(this.institutionEndpoint+'?id='+this.item.service.id_institution).then((results)=>{
        this.item.service.institution = results.data.data[0]
      })
    }
  }
}

export default requisiteItemController