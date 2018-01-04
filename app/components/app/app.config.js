import { resolveActiveAccount } from '../authentication/helpers.js'

const appConfig = ($stateProvider, $urlRouterProvider,$locationProvider,$authProvider,Api) => {
  var Evaluator = ['$q', '$state', '$auth', function($q, $state, $auth) {
    var deferred = $q.defer()
    if ($auth.isAuthenticated()) {
      let user = $auth.getPayload()
      if(user.role === 'Evaluador'){
        deferred.resolve()
      }else{
        $state.go('landingPage') 
      }
    } else {
      $state.go('landingPage') 
    }
    return deferred.promise
  }]
  var Entity = ['$q', '$state', '$auth', function($q, $state, $auth) {
    var deferred = $q.defer()
    if ($auth.isAuthenticated()) {
      let user = $auth.getPayload()
      if(user.role === 'Entidad'){
        deferred.resolve()
      }else{
        $state.go('landingPage')
      }
    } else {
      $state.go('landingPage') 
    }
    return deferred.promise
  }]
  $stateProvider
    .state('landingPage',{
      url : '/',
      component: 'landingPage',
      onEnter: function(){
        document.title = 'Sello de Excelencia'
      },
    })
    .state('signIn',{
      url: '/sign-in',
      component: 'signIn',
      onEnter: function(){
        document.title = 'Inicio de Sesión'
      },
    })
    .state('signUp',{
      url: '/sign-up',
      component: 'signUp',
      onEnter: function(){
        document.title = 'Registro'
      },
    })
    .state('forgotPassword',{
      url: '/forgot-password',
      component: 'forgotPassword',
      onEnter: function(){
        document.title = 'Recordar Contraseña'
      },
    })
    .state('changePwd',{
      url: '/cambio-contrasena',
      component: 'changePassword',
      onEnter: function(){
        document.title = 'Cambiar Contraseña'
      },
    })
    .state('activeAccount',{
      url: '/activar-cuenta?token&email',
      component: 'activeAccount',
      params: { email: null, token:null },
      resolve: {
        user: resolveActiveAccount
      },
      onEnter: function(){
        document.title = 'Activación de Cuenta'
      },
    })
    .state('moreInformation',{
      url:'/mas-informacion',
      component:'moreInformation',
      onEnter: function(){
        document.title = 'Más información'
      },
    })
    .state('terms',{
      url: '/terminos-y-condiciones',
      component: 'terms',
      onEnter: function(){
        document.title = 'Términos y Condiciones'
      },
    })
    .state('tmppostulate',{
      url: '/postular',
      component: 'tmppostulate',
      onEnter: function(){
        document.title = 'Postular tus servicios'
      },
    })
    .state('banner',{
      url: '/banner/:id',
      component: 'bannerDetail',
      onEnter: function(){
        document.title = 'Más Información'
      },
    })
    .state('registerEvaluator',{
      url:'/registro-evaluador',
      component: 'registerEvaluator',
      onEnter: function(){
        document.title = 'Registro de Evaluador'
      },
    })
    .state('registerEntity',{
      url:'/registro-entidad',
      component: 'registerEntity',
      onEnter: function(){
        document.title = 'Registro de Entidad'
      },
    })
    .state('certifiedservices',{
      url: '/certificados',
      component: 'servicelist',
      onEnter: function(){
        document.title = 'Productos y Servicios Certificados'
      },
    })
    .state('certifiedservices.entity',{
      url: '/entidad/:idEntity',
      component: 'servicelist',
      onEnter: function(){
        document.title = 'Productos y Servicios Certificados'
      },
    })
    .state('embeded',{
      url: '/embeded/:id',
      component: 'embeded',
      onEnter: function(){
        document.title = 'Detalle de Producto o Servicio'
      },
    })
    .state('detail',{
      url: '/detalle/:id',
      component: 'servicedetail',
      onEnter: function(){
        document.title = 'Detalle de Producto o Servicio'
      },
    })
    .state('entity',{
      url:'/entidad',
      abstract: true,
      component: 'profileEntity',
      resolve: {
        loginRequired: Entity
      },
      onEnter: function(){
        document.title = 'Entidad'
      },
    })
    .state('entity.profile',{
      url:'/perfil',
      component: 'profiledataEntity',
      onEnter: function(){
        document.title = 'Entidad - Perfil'
      },
    })
    .state('entity.postulate',{
      url:'/postular',
      component: 'postulateEntity',
      onEnter: function(){
        document.title = 'Entidad - Postular'
      },
    })
    .state('entity.activity',{
      url:'/actividad',
      component: 'activityEntity',
      onEnter: function(){
        document.title = 'Entidad - Actividad'
      },
    })
    .state('entity.activity.certified',{
      url:'/certificadas',
      component:'activityEntityList',
      onEnter: function(){
        document.title = 'Entidad - Actividad - Sellos Otorgados'
      },
    })
    .state('entity.activity.proccess',{
      url:'/proceso',
      component:'activityEntityList',
      onEnter: function(){
        document.title = 'Entidad - Actividad - En Proceso'
      },
    })
    .state('entity.activity.validation',{
      url:'/verificacion',
      component:'activityEntityList',
      onEnter: function(){
        document.title = 'Entidad - Actividad - En Verificación'
      },
    })
    .state('entity.activity.rejected',{
      url:'/rechazadas',
      component:'activityEntityList',
      onEnter: function(){
        document.title = 'Entidad - Actividad - No Otorgados'
      },
    })
    .state('entity.activity.detail',{
      url:'/servicio/',
      component:'serviceEntity',
      params:{
        service:null
      },
      onEnter: function(){
        document.title = 'Entidad - Actividad - Servicio'
      },
    })
    .state('entity.learn',{
      url:'/aprende-ensena',
      component: 'learnEntity',
      onEnter: function(){
        document.title = 'Entidad - Aprende y Enseña'
      },
    })
    .state('entity.advance',{
      url:'/avance',
      component: 'advanceEntity',
      onEnter: function(){
        document.title = 'Entidad - Avance'
      },
    })
    .state('evaluator',{
      url:'/evaluador',
      abstract: true,
      component: 'profileEvaluator',
      resolve: {
        loginRequired: Evaluator
      },
      onEnter: function(){
        document.title = 'Evaluador'
      },
    })
    .state('evaluator.profile',{
      url:'/perfil',
      component: 'profiledataEvaluator',
      onEnter: function(){
        document.title = 'Evaluador - Perfil'
      },
    })
    .state('evaluator.activity',{
      url:'/actividad',
      component: 'activityEvaluator',
      onEnter: function(){
        document.title = 'Evaluador - Actividad'
      },
    })
    .state('evaluator.activity.asignated',{
      url:'/asignadas',
      component:'activityEvaluatorList',
      onEnter: function(){
        document.title = 'Evaluador - Actividad - Asignadas'
      },
    })
    .state('evaluator.activity.postulate',{
      url:'/voluntarias',
      component:'activityEvaluatorList',
      onEnter: function(){
        document.title = 'Evaluador - Actividad - Voluntarias'
      },
    })
    .state('evaluator.activity.proccess',{
      url:'/proceso',
      component:'activityEvaluatorList',
      onEnter: function(){
        document.title = 'Evaluador - Actividad - Proceso'
      },
    })
    .state('evaluator.activity.finished',{
      url:'/finalizadas',
      component:'activityEvaluatorList',
      onEnter: function(){
        document.title = 'Evaluador - Actividad - Finalizadas'
      },
    })
    .state('evaluator.activity.detail',{
      url:'/requisito/',
      component:'serviceEvaluator',
      params:{
        requisite:null
      },
      onEnter: function(){
        document.title = 'Evaluador - Actividad - Requisito'
      },
    })
    .state('evaluator.learn',{
      url:'/aprende-ensena',
      component: 'learnEvaluator',
      onEnter: function(){
        document.title = 'Evaluador - Aprende y Enseña'
      },
    })
    .state('evaluator.advance',{
      url:'/avance',
      component: 'advanceEvaluator',
      onEnter: function(){
        document.title = 'Evaluador - Avance'
      },
    })
  //$locationProvider.hashPrefix('!')
  $locationProvider.html5Mode(true)
  $urlRouterProvider.otherwise('/')

  $authProvider.loginUrl = `${Api}/auth/login`
  $authProvider.signupUrl = `${Api}/auth/register`
  $authProvider.authToken = ''
  $authProvider.tokenName = 'token'
  $authProvider.tokenPrefix = 'qualityStamp'

  $authProvider.facebook({
    clientId: '405189839819599',
    responseType: 'token',
  })
  $authProvider.linkedin({
    clientId: '405189839819599',
    responseType: 'token',
  })
  $authProvider.google({
    clientId: '1076035766738-c3e04ocu4k1612u9ckmdfr5oug92asss.apps.googleusercontent.com',
    responseType: 'token',
    scope: ['profile', 'email'],
  })
}

resolveActiveAccount.$inject = ['$q','$state','$stateParams','AuthService']
appConfig.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider','$authProvider','Api']

export default appConfig
