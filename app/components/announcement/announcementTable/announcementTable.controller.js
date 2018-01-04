class AnnouncementTableController {
  $onInit() {
    this.announcements = [
      {id : 1, entity: 'Decreto 1078 de 2015 Decreto Único Sectorial', service: 'http://www.mintic.gov.co/portal/604/articles-9528_documento.pdf'},
      {id : 2, entity: 'Resolución 2405 de 2016 por la cual se adopta el modelo de Sello de Excelencia', service: 'http://estrategia.gobiernoenlinea.gov.co/623/articles-17464_recurso_12.pdf'},
      {id : 3, entity: 'Manual y reglamento de uso de Sello de Excelencia', service: 'http://estrategia.gobiernoenlinea.gov.co/623/articles-17464_recurso_18.pdf'},
      {id : 4, entity: 'Manual gráfico de Sello de Excelencia', service: 'http://estrategia.gobiernoenlinea.gov.co/623/articles-17464_recurso_19.pdf'},
      {id : 5, entity: 'Productos certificado con Sello de Excelencia', service: 'http://estrategia.gobiernoenlinea.gov.co/623/w3-article-17464.html'}
    ]
  }
}

export default AnnouncementTableController
