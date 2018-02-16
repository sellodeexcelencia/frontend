/*global saveAs*/
class ServiceDetailController {
  constructor($state, $http, Api, $stateParams, STATES) {
    'ngInject'
    this.$state = $state
    this.$stateParams = $stateParams
    this.$http = $http
    this.categoriesEndpoint = Api + '/service/category'
    var date = new Date()
    this.dataEndpoint = Api + `/service/service?certified=true&simple=false&filter_field=history.id_status&filter_value=${STATES.SERVICE.CUMPLE}&filter_field=history.valid_to&filter_value=>%20${date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()}`
    this.institutionEndpoint = Api + '/place/institution'
    this.downloadEndpoint = Api + '/platform/export'
    this.category = null
    this.getBasic()
  }
  selectedInstitution(item) {
    if(item){
      this.query.fields['institution.id'] = item.id
    }else{
      delete this.query.fields['institution.id'] 
    }
    
    this.getData()
  }
  selectedService(item) {
    if(item){
      this.query.fields['id'] = item.id
    }else{
      delete this.query.fields['id']
    }
    this.getData()
  }
  getBasic() {
    this.loading = true
    this.$http.get(this.categoriesEndpoint).then((result) => {
      this.categories = result.data.data
      if(this.$stateParams.idEntity){
        this.$http.get(this.institutionEndpoint+'?id='+this.$stateParams.idEntity)
        .then((result)=>{
          this.selectedInstitution(result.data.data[0])
        })
      }else{
        this.selectCategory(this.categories[0])
      }
    })
  }
  $onInit() {
    this.pagestoshow = 5
    this.pager = {
      total_pages: 0
    }
    this.query = {
      limit: 20,
      page: 1,
      fields: {}
    }
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year,
      today: 'Hoy',
      clear: 'Limpiar',
      close: 'Cerrar',
      closeOnSelect: false // Close upon selecting a date,
    })
  }
  createUrl(){
    var url = this.dataEndpoint
    if(this.category !== null){
      url += '&filter_field=id_category&filter_value='+this.category.id
    }

    if (!url) {
      return
    }
    var params = ['page=' + this.query.page, 'limit=' + this.query.limit]
    if (this.query.filter) {
      params.push('filter=' + this.query.filter)
    }
    if (this.query.fields) {
      for (var field in this.query.fields) {
        var values = this.query.fields[field]
        if (typeof values === 'object') {
          values.forEach(function (value) {
            params.push('filter_field=' + field + '&filter_value=' + value)
          })
        } else {
          if(field === 'postulation' || field === 'certification'){
            if(values.indexOf('T')>-1){
              values = values.split('T')[0]
            }
            var d = new Date(values)
            if(isNaN( d.getTime())){
              continue
            }
            values = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()
          }
          params.push('filter_field=' + field + '&filter_value=' + values)
        }
      }
    }
    if (this.query.order) {
      params.push('order=' + this.query.order)
    }

    return url.indexOf('?') > -1 ? url + '&' + params.join('&') : url + '?' + params.join('&')
  }
  getData() {
    this.list = []
    this.loading = true

    var url = this.createUrl()
    this.$http.get(url).then((response) => {
      this.list = response.data.data
      this.pager.total_count = response.data.total_results
      this.loading = false
      this.resetPager()
    })
    return true
  }
  resetPager() {
    this.pager.total_pages = Math.ceil(this.pager.total_count / this.query.limit)
    this.pager.pages = []
    var min = Math.max(this.query.page - this.pagestoshow, 1)
    this.pager.before = this.query.page > 1
    this.pager.after = this.query.page < this.pager.total_pages
    var max = Math.min(this.pager.total_pages, this.query.page + this.pagestoshow)
    for (min; min <= max; min++) {
      this.pager.pages.push(min)
    }
  }
  selectCategory(category) {
    this.category = category
    this.getData()
  }

  prev() {
    this.query.page = Math.max(this.query.page - 1, 1)
    this.resetPager()
    this.getData()
  }
  next() {
    this.query.page = Math.min(this.query.page + 1, this.pager.total_pages)
    this.resetPager()
    this.getData()
  }
  navigate(page) {
    this.query.page = Math.max(Math.min(page, this.pager.total_pages), 1)
    this.resetPager()
    this.getData()
  }

  goTo(item) {
    this.$state.go('detail', { id: item.id })
  }
  download() {
    var url = this.createUrl().replace('limit='+this.query.limit,'limit=1000000000')
    url = url.replace('page='+this.query.page,'page=1')
    var request = new XMLHttpRequest()
    request.open('GET', url + '&download=true')
    request.setRequestHeader('Authorization', localStorage.getItem('token'))
    request.responseType = 'blob'
    request.onload = function () {
      if (request.status === 200) {
        var d = new Date()
        d = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + '-' + d.getHours() + '-' + d.getMinutes() + '-' + d.getSeconds()
        saveAs(request.response, 'Servicios' + d + '.xlsx')
      } 
    }
    request.send()
  }

}

export default ServiceDetailController