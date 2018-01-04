import template from './modal.html'

const modalComponent = {
  template,
  bindings : {
    title: '@',
    message: '@',
    handleClick: '&'
  }
}

export default modalComponent