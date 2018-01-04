import angular from 'angular'
import announcementTableComponent from './announcementTable/announcementTable.component'

const announcement = angular
  .module('qualityStamp.components.announcement',[])
  .component('announcementTable',announcementTableComponent)
  .name

export default announcement
