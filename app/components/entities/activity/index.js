import angular from 'angular'
import activityEntityComponent from './activityEntity.component'
import activityEntityListComponent from './activityList/activityList.component'

const categories = angular
  .module('qualityStamp.components.entities.activity',[])
  .component('activityEntity',activityEntityComponent)
  .component('activityEntityList',activityEntityListComponent)
  .name

export default categories
