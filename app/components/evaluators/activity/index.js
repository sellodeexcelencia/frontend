import angular from 'angular'
import activityEvaluatorComponent from './activityEvaluator.component'
import activityEvaluatorListComponent from './activityList/activityList.component'

const categories = angular
  .module('qualityStamp.components.evaluators.activity',[])
  .component('activityEvaluator',activityEvaluatorComponent)
  .component('activityEvaluatorList',activityEvaluatorListComponent)
  .name

export default categories
