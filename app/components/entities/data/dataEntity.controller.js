class dataEntityController{
  constructor(Api, $http, $auth) {
    'ngInject'
    this.Api = Api
    this.$http = $http
    this.categories = []
    this.$auth = $auth
    this.categoriesEndpoint = Api + '/service/category'
    this.questionTopicsEndpoint = Api + '/question/questiontopic'
    this.countriesEndpoint = Api + '/place/country?limit=300'
    this.regionsEndpoint = Api + '/place/region?limit=300&filter_field=id_country&filter_value='
    this.citiesEndpoint = Api + '/place/city?limit=300&filter_field=id_region&filter_value='
    this.docTypeEndpoint = Api + '/configuration/type_document?limit=300'
    this.institutionEndpoint = Api + '/place/institution'
    this.insTypeEndpoint = Api + '/place/institutionType?limit=300'
    this.availabilitiesEndpoint = Api + '/configuration/availability?limit=300'
    this.userEndpoint = Api + '/configuration/user',
    this.renewTokenEndpoint = Api + '/auth/renew'
    this.openConfirmation = false
    this.getCategories()
    this.getCountries()
    this.getDocTypes()
    this.getInsTypes()
    this.getAvailabilities()
  }
  getAvailabilities(){
    this.$http.get(this.availabilitiesEndpoint).then((result) => {
      this.availabilities = result.data.data
    })
  }
  getDocTypes(){
    this.$http.get(this.docTypeEndpoint).then((result) => {
      this.document_types = result.data.data
    })
  }
  getInsTypes(){
    this.$http.get(this.insTypeEndpoint).then((result) => {
      this.institutionTypes = result.data.data
    })
  }
  getCountries() {
    this.$http.get(this.countriesEndpoint).then((result) => {
      this.countries = result.data.data
    })
  }
  getRegions(type) {
    type = type || 'register'
    this.$http.get(this.regionsEndpoint+this[type].id_country).then((result) => {
      this[type+'regions'] = result.data.data
    })
  }
  getCities(type) {
    type = type || 'register'
    this.$http.get(this.citiesEndpoint+this[type].id_region).then((result) => {
      this[type+'cities'] = result.data.data
    })
  }
  getCategories() {
    this.$http.get(this.categoriesEndpoint).then((result) => {
      this.categories = result.data.data
    })
  }
  getTopics() {
    let filters = []
    for (let i = 0; i < this.register.categories.length; i++) {
      filters.push('filter_field=id_category&filter_value=' + this.register.categories[i].id)
    }
    if(filters.length === 0){
      this.topics = []
      return
    }
    let url = this.questionTopicsEndpoint + '?limit=200&' + filters.join('&')
    this.$http.get(url)
      .then((results) => {
        this.topics = results.data.data
      })
  }
  hasCategory(category){
    let i = -1
    this.register.categories.forEach((item,idx)=>{
      if(item.id === category.id)
        i = idx
    })
    return i
  }
  hasTopic(topic){
    let i = -1
    this.register.topics.forEach((item,idx)=>{
      if(item.id === topic.id)
        i = idx
    })
    return i
  }
  toggleCategory(category) {
    var idx = this.hasCategory(category)
    if (idx > -1) {
      this.register.categories.splice(idx, 1)
    }
    else {
      this.register.categories.push(category)
    }
    this.getTopics()
  }
  toggleTopic(topic){
    var idx = this.hasTopic(topic)
    if (idx > -1) {
      this.register.topics.splice(idx, 1)
    }
    else {
      this.register.topics.push(topic)
    }
  }
  $onInit() {
    this.register = this.$auth.getPayload()
    this.$http.get(this.institutionEndpoint+'?id='+this.register.institutions[0].id).then((result)=>{
      this.institution = result.data.data[0]
      if(this.institution.id_country){
        this.getRegions('institution')
      }
      if(this.institution.id_region){
        this.getCities('institution')
      }
    })
    if(this.register.id_country){
      this.getRegions()
    }
    if(this.register.id_region){
      this.getCities()
    }
    this.getTopics()
  }
  updateUser(){
    this.$http.put(this.userEndpoint,this.register).then(()=>{
      return this.$http.post(this.renewTokenEndpoint,null)
    }).then((result)=>{
      this.$auth.setToken(result.data.token)
      this.openConfirmation = true
    })
  }
  updateEntity(){
    this.$http.put(this.institutionEndpoint,this.institution).then(()=>{
      this.openConfirmation = true
    })
  }
}

export default dataEntityController