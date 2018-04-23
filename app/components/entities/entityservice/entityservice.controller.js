class entityService{
  constructor(Api,$http,$stateParams,$state,STATES){
    'ngInject'
    this.Api = Api
    this.STATES = STATES
    this.$http = $http
    this.$state = $state
    this.serviceCommentsEndpoint = Api + '/service/service_comment?filter_field=id_service&filter_value='
    this.serviceEndpoint = Api + '/service/service?simple=false'
    this.questionEndpoint = Api + '/question/question?simple=false&limit=50&filter_field=topic.id_category&filter_value='
    this.answerEndpoint = Api + '/question/user_answer'
    this.selected = null
    this.currentIndex = 0
    this.$stateParams = $stateParams
  }
  $onInit(){
    this.service= this.$stateParams.service
    if(!this.service){
      return
    }
    if(this.service.url.indexOf('http') !== 0){
      this.service.url = 'http://'+this.service.url
    }
    this.getQuestions()
  }
  getQuestions() {
    let url = this.questionEndpoint + this.service.id_category
    for(let i = 1 ; i<=this.service.status.level;i++){
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
        if(ids[question.id] !== undefined){
          question.answer = this.answers[ids[question.id]].id
          question.service = this.service.id
          question.comment = this.answers[ids[question.id]].comment
          question.media = this.answers[ids[question.id]].media
          question.status = this.answers[ids[question.id]].status
          
          if(question.media && question.media.url){
            question.media.name = question.media.url.substr(question.media.url.lastIndexOf('/')+1)
          }
          if(question.status.id === this.STATES.EVALUATION_REQUEST.RETROALIMENTACION){
            question.disabled = false
            question.canDelete = true
          }else{
            question.disabled = true
          }
        }
      })
      this.selected = this.questions[this.currentIndex]
    }).then(()=>{
      if(this.service.status.id_status === this.STATES.SERVICE.CUMPLE){
        this.$http.get(this.serviceCommentsEndpoint+ this.service.id).then((results)=>{
          this.service.comments = results.data.data
          this.service.totalcomments = results.data.total_results
        })
      }
    })
  }
  nextQuestion(){
    if(this.currentIndex < this.questions.length -1)
      this.selected = this.questions[++this.currentIndex]
  }
  prevQuestion(){
    if(this.currentIndex > 0)
      this.selected = this.questions[--this.currentIndex]
  }
}

export default entityService