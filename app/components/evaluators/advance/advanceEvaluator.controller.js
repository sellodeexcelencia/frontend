class advanceEvaluatorController{
  constructor(Api,$http,$auth){
    'ngInject'
    this.Api = Api
    this.$http = $http
    this.$auth = $auth
    this.pointsEndpoint = Api +'/configuration/points'
    this.motivesEndpoint = Api +'/configuration/motives?limit=5000'
    this.motivenamesEndpoint = Api +'/configuration/motivename'
    this.pagestoshow = 5
    this.pager = {
      total_pages:0
    }
    this.query = {
      limit: 20,
      page: 1,
      fields:{
        id_user:[this.$auth.getPayload().id],
      }
    }
  }
  $onInit(){
    this.$http.get(this.motivenamesEndpoint).then((results)=>{
      this.names = results.data.data
      return this.$http.get(this.motivesEndpoint+'')
    }).then((results)=>{
      this.motives = results.data.data
      this.motives.forEach((motive)=>{
        this.names.forEach((name)=>{
          if(motive.name === name.id){
            motive.name = name
          }
        })
      })
      return this.$http.get(this.pointsEndpoint+'?sumarized=true')  
    }).then((results)=>{
      let _total = 0
      this.requisites = 0
      this.live = 0
      this.events = 0
      results.data.forEach(function(points) {

        _total += points.value
        this.motives.forEach((motive)=>{
          if(motive.id === points.id_motives){
            if(motive.name.name === 'Participar en Aprende y Enseña'){
              this.live += points.value
            }else
            if(motive.name.name === 'Eventos Especiales'){
              this.events += points.value
            }else if(points.value > 0){
              this.requisites += points.value
            }
          }
        })
        
      }, this)
      this.total = _total
      this.getData()
    })
  }
  getData() {
    this.list = []    
    var url = this.pointsEndpoint
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
        if(values){
          if(values.forEach){
            values.forEach(function (value) {
              params.push('filter_field=' + field + '&filter_value=' + value)
            })
          }else{
            if(this.section === 'postulate'){
              params.push(field + '=' + values)
            }else{
              params.push(field + '=' + values)
              //params.push('filter_field=' + field + '&filter_value=' + values)
            }
            
          }
        }
        
      }
    }
    if (this.query.order) {
      params.push('order=' + this.query.order)
    }

    url = url.indexOf('?') > -1 ? url + '&' + params.join('&') : url + '?' + params.join('&')
    let ctrl = this
    var p = this.$http.get(url)
    p.then(function (response) {
      ctrl.negatives = response.data.data
      ctrl.pager.total_count = response.data.total_results
      ctrl.loading = false
      ctrl.resetPager()
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
}

export default advanceEvaluatorController