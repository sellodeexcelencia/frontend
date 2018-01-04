class footerController {
  constructor($http,Api,$sce) {
    'ngInject'
    this.$http = $http
    this.$sce = $sce
    this.endpoint = Api + '/platform/footer'
    this.logoEndpoint = Api + '/configuration/config'
  }
  $onInit(){
    this.$http.get(this.endpoint).then((result)=>{
      this.footer = this.$sce.trustAsHtml(result.data.data[0].text)
    })
    this.$http.get(this.logoEndpoint).then((result)=>{
      this.logo_footer = result.data.data[0].footer
    })
  }
}

export default footerController
/*
<h5 class="center-align">Ministerio de Tecnologías de la Información y las Comunicaciones</h5>       
<p class="center-align">         
<span>Edificio Murillo Toro Cra. 8a entre calles 12 y 13, Bogotá, Colombia - Código Postal 111711</span>
<br>         
<span>Teléfono Conmutador: +57(1) 344 34 60</span> - <span>Línea Gratuita: 01-800-0914014</span><br>
<span>Linea Anticorrupción: 01-800-0912667</span> - <span>Correo para PQRS: sellodeexcelencia@mintic.gov.co</span><br>
<span>Notificaciones juciciales</span> - <span>Correo institucional: notificacionesjidicialesmintic@mintic.gov.co</span><br>
<span>Horario de Atención: Lunes a Viernes 8:30 am - 4:30 pm.</span><br>       
</p>
*/