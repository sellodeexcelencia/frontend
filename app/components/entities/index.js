import angular from 'angular'
import registerEntityComponent from './register/registerEntity.component'
import profileEntityComponent from './profile/profileEntity.component'
import dataEntityComponent from './data/dataEntity.component'
import postulateEntityComponent from './postulate/postulateEntity.component'
import activityEntity from './activity'
import learnEntityComponent from './learn/learnEntity.component'
import advanceEntityComponent from './advance/advanceEntity.component'
import serviceEntityComponent from './entityservice/entityservice.component'
import chatEntityComponent from './chat/chat.component'
const entities = angular
  .module('qualityStamp.components.entities',[activityEntity])
  .component('registerEntity',registerEntityComponent)
  .component('profileEntity',profileEntityComponent)
  .component('profiledataEntity',dataEntityComponent)
  .component('postulateEntity',postulateEntityComponent)
  .component('learnEntity',learnEntityComponent)
  .component('advanceEntity',advanceEntityComponent)
  .component('serviceEntity',serviceEntityComponent)
  .component('chatEntity',chatEntityComponent)
  .name

export default entities
