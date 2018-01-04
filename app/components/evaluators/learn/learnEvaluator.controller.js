/*global FB*/
class learnEvaluatorController {
  constructor(Api, $http, $sce) {
    'ngInject'
    this.Api = Api
    this.$http = $http
    this.learnEndpoint = Api + '/forum/hangouts?filter_field=id_role&filter_value=2'
    this.pointsEndpoint = Api + '/forum/view'
    this.playing = false
    this.$sce = $sce
  }
  setSelected(item){
    let now = new Date()
    let activiation = new Date(item.activation_date)
    if(now > activiation){
      item.disabled = false
    }else{
      item.disabled = true 
    }
    this.selected = item
  }
  goLive(){
    this.selected.trusted = this.$sce.trustAsResourceUrl(this.selected.url)
    this.playing = true
    this.$http.post(this.pointsEndpoint,{id:this.selected.id})
    window.setTimeout(function(){
      FB.XFBML.parse()
    },100)
  }
  stop(){
    this.selected.trusted = null
    this.playing = false
  }
  $onInit() {
    this.pagestoshow = 5
    this.pager = {
      total_pages:0
    }
    this.query = {
      limit:20,
      page:1,
      fields:{},
      order:'id desc'
    }
    this.getData()
  }
  getData() {
    this.list = []
    this.loading = true
    var url = this.learnEndpoint
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
        if(typeof values === 'object'){
          values.forEach(function (value) {
            params.push('filter_field=' + field + '&filter_value=' + value)
          })
        }else{
          params.push('filter_field=' + field + '&filter_value=' + values)
        }
      }
    }
    if (this.query.order) {
      params.push('order=' + this.query.order)
    }

    url = url.indexOf('?') > -1 ? url + '&' + params.join('&') : url + '?' + params.join('&')
    this.$http.get(url).then((response)=> {
      this.list = response.data.data
      this.setSelected(this.list[0])
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
    for (min ; min <= max ; min++) {
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

  goTo(item){
    this.$state.go('detail',{id:item.id})
  }
}

export default learnEvaluatorController