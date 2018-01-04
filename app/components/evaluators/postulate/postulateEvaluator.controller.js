class postulateEvaluatorController{
  constructor(Api, $http, $auth) {
    'ngInject'
    this.Api = Api
    this.$http = $http
    this.pagestoshow = 5
    this.$auth = $auth
    this.pager = {
      total_pages:0
    }
    this.query = {
      limit: 5,
      page: 1,
      fields:{
        level:null,
        'category.id':null
      },
      order:'timestamp asc'
    }
    this.answersEndpoint = Api + '/question/user_answer?postulate=true'
    this.institutionEndpoint = Api +'/place/institution'
    this.regionEndpoint = Api +'/place/region'
    this.categoriesEndpoint = Api + '/service/category'
    this.requestEndpoint = Api +'/question/evaluation_request'
    this.openConfirmation = false
    this.getCategories()
  }
  selectedInstitution(item){
    this.query.fields['institution.id'] = item.id
    this.getData()
  }
  selectedRegion(item){
    this.query.fields['region.id'] = item.id
    this.getData()
  }
  getCategories() {
    this.$http.get(this.categoriesEndpoint).then((result) => {
      this.categories = result.data.data
    })
  }
  $onInit() {
    this.getData()
  }
  getData() {
    if(this.$auth.getPayload().topics.length === 0){
      this.noTopics = true
      return
    }
    this.noTopics = false
    this.list = []
    this.loading = true
    var url = this.answersEndpoint
    if (!url) {
      return
    }
    var params = ['page=' + this.query.page, 'limit=' + this.query.limit]
    if (this.query.filter) {
      params.push('filter=' + this.query.filter)
    }
    if (this.query.fields) {
      for (var field in this.query.fields) {
        var value = this.query.fields[field]
        if(value){
          params.push(field + '=' + value)
        }
      }
    }
    if (this.query.order) {
      params.push('order=' + this.query.order)
    }

    url = url.indexOf('?') > -1 ? url + '&' + params.join('&') : url + '?' + params.join('&')
    let ctrl = this
    this.$http.get(url).then(function (response) {
      ctrl.list = response.data.data
      this.pager.total_count = response.data.total_results
      if(ctrl.list.length === 0){
        ctrl.emptyTopics = true
      }else{
        ctrl.emptyTopics = false
      }
      ctrl.loading = false
      ctrl.resetPager()
    })
    return 
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
  setService(service) {
    this.service = service
  }
  confirm(requisite) {
    this.openConfirmation = true
    this.selected = requisite
  }
  createRequest(){
    let data = {
      id_answer:this.selected.id,
      id_question:this.selected.id_question,
      id_user:this.$auth.getPayload().id,
      id_service:this.selected.service.id
    }
    this.$http.post(this.requestEndpoint,data).then(()=>{
      this.getData()
    })
  }
}

export default postulateEvaluatorController