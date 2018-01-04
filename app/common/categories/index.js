import angular from 'angular'
import categoriesListComponent from './categoriesList/categoriesList.component'
import categoryItemComponent from './categoryItem/categoryItem.component'

const categories = angular
  .module('qualityStamp.common.categories',[])
  .component('categoriesList',categoriesListComponent)
  .component('categoryItem',categoryItemComponent)
  .name

export default categories
