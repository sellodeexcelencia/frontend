class CategoryListController {
  constructor($state,$window,$auth,$rootScope) {
    'ngInject'
    this.$window = $window
    this.$auth = $auth
    this.$state = $state
    this.$rootScope = $rootScope
  }
    
  
  $onInit() {
    if(this.$auth.isAuthenticated()){
      if(this.$auth.getPayload().role === 'Entidad'){
        this.categories = [
          {
            id:1, 
            title: 'Postula un producto o servicio', 
            img: 'assets/img/postular.png', 
            stateUrl: 'entity.postulate',
            //stateUrl: 'tmppostulate'
          },
          {
            id:2, 
            title: 'Ingresa a la sección Aprende y Enseña', 
            img: 'assets/img/comunidad.png', 
            stateUrl: 'entity.learn'
            //stateUrl: 'https://goo.gl/forms/cUsmLJEVs7c0sdSf2'
          },
          {
            id:3, 
            title: 'Conoce y califica los productos certificados', 
            img: 'assets/img/evaluando.png', 
            stateUrl: 'certifiedservices',
          }
        ]
      }else if(this.$auth.getPayload().role === 'Evaluador'){
        this.categories = [
          {
            id:1, 
            title: 'Evalúa requisitos de los productos postulados', 
            img: 'assets/img/postular.png', 
            stateUrl: 'evaluator.activity',
            //stateUrl: 'tmppostulate'
          },
          {
            id:2, 
            title: 'Ingresa a la sección Aprende y Enseña', 
            img: 'assets/img/comunidad.png', 
            stateUrl: 'evaluator.learn'
            //stateUrl: 'https://goo.gl/forms/cUsmLJEVs7c0sdSf2'
          },
          {
            id:3, 
            title: 'Conoce y califica los productos certificados', 
            img: 'assets/img/evaluando.png', 
            stateUrl: 'certifiedservices',
          }
        ]
      }else if(this.$auth.getPayload().role === 'Ciudadano'){
        this.categories = [
          {
            id:3, 
            title: 'Conoce y califica los productos certificados', 
            img: 'assets/img/evaluando.png', 
            stateUrl: 'certifiedservices',
          }
        ]
      }else{
        this.categories = [
          {
            id:1, 
            title: '¿Quieres postular tu producto o servicio?', 
            img: 'assets/img/postular.png', 
            stateUrl: 'registerEntity',
          },
          {
            id:2, 
            title: '¿Quieres ser parte de la comunidad evaluadora?', 
            img: 'assets/img/comunidad.png', 
            stateUrl: 'registerEvaluator',
          },
          {
            id:3, 
            title: 'Conoce y califica los productos certificados', 
            img: 'assets/img/evaluando.png', 
            stateUrl: 'certifiedservices',
          }
        ]
      }
    }else{
      this.categories = [
        {
          id:1, 
          title: '¿Quieres postular tu producto o servicio?', 
          img: 'assets/img/postular.png', 
          stateUrl: 'registerEntity',
          //stateUrl: 'tmppostulate'
        },
        {
          id:2, 
          title: '¿Quieres ser parte de la comunidad evaluadora?', 
          img: 'assets/img/comunidad.png', 
          stateUrl: 'registerEvaluator',
          //stateUrl: 'https://goo.gl/forms/cUsmLJEVs7c0sdSf2'
        },
        {
          id:3, 
          title: 'Conoce y califica los productos certificados', 
          img: 'assets/img/evaluando.png', 
          stateUrl: 'certifiedservices',
        }
      ]
    }
  }

  goTo(category) {
    let state = category.stateUrl
    if (state.includes('http')) {
      this.$window.location.href = state
    } else {
      this.$state.go(state)
    }
  }
}

export default CategoryListController
