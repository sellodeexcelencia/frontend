import angular from 'angular'
import fameListComponent from './fameList/fameList.component'
import fameItemComponent from './fameItem/fameItem.component'

const fame = angular
  .module('qualityStamp.common.fame',[])
  .component('fameList',fameListComponent)
  .component('fameItem',fameItemComponent)
  .name

export default fame
