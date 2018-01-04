class profileEntityController{
  constructor(Api, $http, $state,$auth,$scope) {
    'ngInject'
    this.Api = Api
    this.$state = $state
    this.$http = $http
    if(this.$state.current.name.indexOf('.') === -1){
      this.setSection('profile')
    }else{
      let array = this.$state.current.name.split('.')
      this.section = array[1]
    }
    this.user = $auth.getPayload()

    let ctrl = this
    $scope.$watch(function(){
      return $state.$current.name
    }, function(newVal){
      if(newVal.indexOf('entity') === 0){
        ctrl.section = newVal.split('.')[1]
      }
    })
  }
  setSection(section) {
    this.$state.go('entity.'+section)
  }
}

export default profileEntityController