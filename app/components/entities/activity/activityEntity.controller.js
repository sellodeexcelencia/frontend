class activityEntityController {
  constructor(Api, $http, $state,$auth,$scope) {
    'ngInject'
    this.Api = Api
    this.$state = $state
    this.$http = $http
    if(this.$state.current.name.split('.').length === 2){
      this.setSection('certified')
    }else{
      let array = this.$state.current.name.split('.')
      this.section = array[2]
    }
    this.user = $auth.getPayload()
    let ctrl = this
    $scope.$watch(function(){
      return $state.$current.name
    }, function(newVal){
      if(newVal.indexOf('entity.activity') === 0){
        ctrl.section = newVal.split('.')[2]
      }
    })
  }
  setSection(section) {
    this.$state.go('entity.activity.'+section)
  }
  
}
export default activityEntityController