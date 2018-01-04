import angular from 'angular'
import landingPage from './landingPage/landingPage.component'
import navbarComponent from './navbar/navbar.component'
import sliderComponent from './slider/slider.component'
import footerComponent from './footer/footer.component'
import moreInformationComponent from './moreInformation/moreInformation.component'
import termsComponent from './terms/terms.component'
import bannerDetailComponent from './bannerdetail/bannerdetail.component'
import categoriesModule from './categories'
import modalComponent from './modal/modal.component'
import loaderComponent from './loader/loader.component'
import fameModule from './fame'
import evaluationComponent from './evaluation/evaluation.component'
import servicelistComponent from './servicelist/servicelist.component'
import servicedetailComponent from './servicedetail/servicedetail.component'
import embedComponent from './embed/embed.component'
import requisiteComponent from './requisite/requisite.component'
import requisiteitemComponent from './requisiteitem/requisiteitem.component'
import serviceitemComponent from './serviceitem/serviceitem.component'
import commentitemComponent from './commentitem/commentitem.component'
import autocompleteComponent from './autocomplete/autocomplete.component'
import tmppostulateComponent from './tmppostulate/tmppostulate.component'
const common = angular
  .module('qualityStamp.common',[categoriesModule,fameModule])
  .component('landingPage',landingPage)
  .component('navbar',navbarComponent)
  .component('slider', sliderComponent)
  .component('footerApp',footerComponent)
  .component('moreInformation',moreInformationComponent)
  .component('terms',termsComponent)
  .component('bannerDetail',bannerDetailComponent)
  .component('modalApp',modalComponent)
  .component('loader',loaderComponent)
  .component('evaluation',evaluationComponent)
  .component('servicelist',servicelistComponent)
  .component('embeded',embedComponent)
  .component('servicedetail',servicedetailComponent)
  .component('requisite',requisiteComponent)
  .component('serviceItem',serviceitemComponent)
  .component('requisiteItem',requisiteitemComponent)
  .component('commentItem',commentitemComponent)
  .component('autocomplete',autocompleteComponent)
  .component('tmppostulate',tmppostulateComponent)
  .name

export default common
