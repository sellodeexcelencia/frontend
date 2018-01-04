class FameListController {
  constructor($state,$http,Api) {
    'ngInject'
    this.$state = $state
    this.$http = $http
    this.endpoints = {
      'entities':Api+'/configuration/hall_of_fame?filter_field=id_role&filter_value=4',
      'community':Api+'/configuration/hall_of_fame?filter_field=id_role&filter_value=2'
    }
    this.loading = false
  }
  $onInit() {
    this.titles = {
      'entities' :'Las siguientes son las entidades destacadas por haber recibido la certificación del Sello de Excelencia y haber participado activamente en las actividades propuestas por nuestra plataforma',
      'community' : 'Los siguientes son los evaluadores destacados por haber participado activamente en las actividades propuestas por nuestra plataforma.'
    }
    this.setSection('entities')
  }
  setSection(section) {
    this.section = section
    this.title = this.titles[section]
    this.getData(section)
  }
  getData(section){
    this.loading = true
    this.$http.get(this.endpoints[section]).then((results)=>{
      this.list = results.data.data
      this.loading = false
    })
  }
  goTo(item){
    if(this.section === 'community'){
      return
    }
    this.$state.go('certifiedservices.entity',{idEntity:item.id_institution})
  }
}

export default FameListController
