import angular from 'angular'
import authenticationModule from './authentication'
import announcementModule from './announcement'
import newsModule from './news'
import evaluatorsModule from './evaluators'
import entitiesModule from './entities'

const components = angular
  .module('qualityStamp.components',[
    authenticationModule,
    announcementModule,
    newsModule,
    evaluatorsModule,
    entitiesModule
  ])
  .name

export default components
