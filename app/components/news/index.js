import angular from 'angular'
import newsListComponent from './newsList/newsList.component'
import newRowComponent from './newRow/newRow.component'

const news = angular
  .module('qualityStamp.components.news',[])
  .component('newsList',newsListComponent)
  .component('newRow',newRowComponent)
  .name

export default news
