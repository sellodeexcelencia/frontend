class chatEvaluator {
  constructor(Api, $http, $auth) {
    'ngInject'
    this.Api = Api,
    this.$http = $http
    this.$auth = $auth
    this.user = this.$auth.getPayload()
    this.evaluationRequestEndpoint = Api + '/question/evaluation_request'
    this.messagesEndpoint = Api + '/question/chats'
  }
  
  sendMessage() {
    var data = {
      text: this.message,
      id_evaluation_request: this.request.id,
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
    this.$http.get(this.messagesEndpoint +
      '?filter_field=id_evaluation_request&filter_value=' + this.request.id).then((results) => {
        this.messages = results.data.data
      })
  }
}

export default chatEvaluator