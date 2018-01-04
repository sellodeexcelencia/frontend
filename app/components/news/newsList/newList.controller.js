class NewListController {
  $onInit() {
    this.news = [
      {id: 1, title: 'Noticia 1', image:'folder', color: null, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
      {id: 2, title: 'Noticia 2', image:'insert_chart', color:'red', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
      {id: 3, title: 'Noticia 3', image:'play_arrow', color: 'blue', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
      {id: 4, title: 'Noticia 4', image:'mic', color: 'green', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'},
      // {id: 5, title: 'Noticia 5', image:'touch_app', color:null, content: ''}
    ]
  }
}

export default NewListController
