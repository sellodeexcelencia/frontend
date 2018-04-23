class postulateEntityController {
  constructor(Api, $http, $auth, $state,STATES) {
    'ngInject'
    this.Api = Api
    this.STATES = STATES
    this.$http = $http
    this.$auth = $auth
    this.$state = $state
    this.user = $auth.getPayload()
    this.categoriesEndpoint = Api + '/service/category'
    this.serviceEndpoint = Api + '/service/service'
    this.serviceStatusEndpoint = Api + '/service/service_status?order=timestamp%20desc&filter_field=id_service&filter_value='
    this.questionEndpoint = Api + '/question/question?simple=false&limit=50&filter_field=topic.id_category&filter_value='
    this.answerEndpoint = Api + '/question/user_answer'
    this.loading = false
    this.isUpgrade = false
    this.isRenew = false
    this.previouslevel = null
  }
  $onInit() {
    this.$http.get(this.categoriesEndpoint).then((results) => {
      this.categories = results.data.data
    })
    this.entity = this.user.institutions[0]
    this.clearService()
  }
  selectService() {
    this.questions = [] 
    this.answers = []
    this.canPostulate = false
    if(this.service === null){
      return
    }
    this.loading = true
    this.$http.get(this.serviceStatusEndpoint + this.service.id).then((results) => {
      this.service.level = results.data.data[0].level
      this.previouslevel = null
      let _levels = [] 
      this.isUpgrade = false
      this.isRenew = false
      let hasStamp = false
      results.data.data.forEach((status)=>{
        if(_levels.indexOf(status.level)){
          _levels.push(status.level)
        }
        if(status.id_status === this.STATES.SERVICE.CUMPLE ){
          hasStamp = true
          if(status.level > this.previouslevel){
            this.previouslevel = status.level
          }
        }
      })
      
      if(this.service.current_status === this.STATES.SERVICE.INCOMPLETO && hasStamp){
        if(this.previouslevel < this.service.level){
          this.isUpgrade = true
        }else{
          this.isRenew = true
        }
      }
      this.getQuestions()
    })
  }
  deleteService(){
    this.loading = true
    this.$http.delete(this.serviceEndpoint+ '?id=' + this.service.id).then(() => {
      this.clearService()
    })
  }
  clearService(){
    this.service = null
    this.questions = [] 
    this.answers = []
    this.$http.get(this.serviceEndpoint +
      '?filter_field=id_institution&filter_value=' + this.entity.id +
      '&filter_field=current_status&filter_value='+this.STATES.SERVICE.INCOMPLETO).then((results) => {
        this.pendingServices = results.data.data
        this.loading = false
      })
  }
  activity(){
    window.setTimeout(function($state){
      $state.go('entity.activity')
    },100,this.$state)
  }
  getQuestions() {
    let url = this.questionEndpoint + this.service.id_category
    let i = 1
    if(this.isUpgrade){
      i = this.previouslevel +1
    }
    for(i ; i<=this.service.level;i++){
      url +='&filter_field=level&filter_value=' + i
    }

    this.$http.get(url).then((results) => {
      this.questions = results.data.data
    }).then(()=>{
      let url = this.answerEndpoint +
      '?limit=200&filter_field=id_service&filter_value='+this.service.id
      return this.$http.get(url)
    }).then((response)=>{
      this.answers = response.data.data
      let ids = {}
      this.answers.forEach((answer,i)=>{
        ids[answer.id_question] = i
      })
      this.questions.forEach((question)=>{
        question.disabled = false
        question.service = this.service.id
        if(ids[question.id] !== undefined){
          question.answer = this.answers[ids[question.id]].id
          question.comment = this.answers[ids[question.id]].comment
          question.media = this.answers[ids[question.id]].media
          if(this.answers[ids[question.id]].id_status === this.STATES.EVALUATION_REQUEST.ERROR){
            question.error = true
          }
          if(question.media && question.media.url){
            question.media.name = question.media.url.substr(
              question.media.url.lastIndexOf('/')+1)
            question.canDelete = true
          }
          question.updatable = true
        }
        if(this.postulationFinished()){
          this.canPostulate = true
        }
      })
      this.loading = false
    })
  }
  postulationFinished(){
    let pending = false
    this.questions.forEach((question)=>{
      if(!question.answer){
        pending = true
      }
    })
    return !pending
  }
  createService() {
    this.loading = true
    this.service.id_institution = this.entity.id
    this.$http.post(this.serviceEndpoint, this.service).then((results) => {
      this.service.id = results.data.id
      this.getQuestions()
    })
  }
  finishPostulation(){
    this.service.current_status = this.STATES.SERVICE.VERIFICACION //Verification
    this.$http.put(this.serviceEndpoint,this.service).then(()=>{
      $('#modal-laucher').click()
      this.canPostulate = false
    })
  }
  
  createAnswer() {
    if(this.postulationFinished()){
      this.canPostulate = true
    }
  }
}

export default postulateEntityController