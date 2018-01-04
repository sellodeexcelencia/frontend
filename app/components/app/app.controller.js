class Controller {
  constructor($http, $location) {
    'ngInject'
    this.showHeader = $location.path().indexOf('/embeded/') === -1
  }
}
export default Controller