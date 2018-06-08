class bannerDetail{
  constructor(Api,$http,$stateParams,$sce){
    'ngInject'
    this.bannerEndpoint = Api + '/platform/banner?id='+$stateParams.id
    this.$http = $http
    this.$sce = $sce
  }
  $onInit(){
    this.$http.get(this.bannerEndpoint).then((result)=>{
      this.banner = result.data.data[0]
      this.banner._title = this.$sce.trustAsHtml(this.banner.title)
      this.banner._summary = this.$sce.trustAsHtml(this.banner.summary)
      this.banner._trusted = this.$sce.trustAsHtml(this.banner.text)
    })
  }
}

export default bannerDetail