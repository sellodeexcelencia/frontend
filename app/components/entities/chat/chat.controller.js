class chatEntity {
  constructor(Api, $http, $auth,STATES) {
    'ngInject'
    this.Api = Api,
      this.$http = $http
    this.$auth = $auth
    this.STATES = STATES
    this.user = this.$auth.getPayload()
    this.evaluationRequestEndpoint = Api + '/question/evaluation_request'
    this.messagesEndpoint = Api + '/question/chats'
    this.currentEvaluator = null
  }
  selectEvaluator(evaluator) {
    this.currentEvaluator = evaluator
    this.$http.get(this.messagesEndpoint +
      '?filter_field=id_evaluation_request&filter_value=' + evaluator.id).then((results) => {
        this.messages = results.data.data
      })
  }
  sendMessage() {
    var data = {
      text: this.message,
      id_evaluation_request: this.currentEvaluator.id,
    }
    this.message = ''
    this.$http.post(this.messagesEndpoint, data).then((result) => {
      data.id = result.data.insertId
      data.id_sender = this.user.id
      data.timestamp = new Date()
      this.messages.push(data)
    })
  }
  $onInit() {
    this.$http.get(
      this.evaluationRequestEndpoint +
      '?filter_field=id_service&filter_value=' + this.service.id +
      '&filter_field=id_question&filter_value=' + this.item.id
    ).then((results) => {
      this.users = results.data.data
      if(this.users.length > 0){
        this.selectEvaluator(this.users[0])
      }
    })
  }
}

export default chatEntity