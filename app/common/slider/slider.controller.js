class SliderController {
  constructor($http, Api) {
    'ngInject'
    this.$http = $http
    this.Api = Api
    this.bannerEndpoint = Api + '/platform/banner?order=position%20asc&filter_field=active&filter_value=1'
    this.templates = {
      'caption_down': 
      `<li class="white down">
        {{BACKGROUND}}
        {{CAPTION}}
      </li>`,
      'caption_right': 
      `<li class="white right">
        {{BACKGROUND}}
        {{CAPTION}}
      </li>`,
      'image': 
      `<li class="white">
        <a href="/banner/{{ID}}">
        {{BACKGROUND}}
        </a>
      </li>`
    }
    this.video_template = '<video style="background-color:#000;" src="{{VIDEO}}" poster="{{IMAGE}}" controls></video>'
    this.image_template = '<img src="{{IMAGE}}" />'
    this.caption_template = '<div class="_caption"><div class="container"><h5 class="color-white font-bold">{{TITLE}}</h5><p class="color-white summary">{{SUMMARY}}</p>{{MORE}}</div></div>'
    this.more_template = '<a class="btn lightseagreen" href="/banner/{{ID}}">VER MÁS<a>'
  }
  $onInit() {
    this.getData()
  }

  changeSlider(direction) {
    $('.slider').slider(direction)
  }

  optionsSlider() {
    $('.sliderone').slider({ 'Interval': 1000 })
    $('.sliderone').slider('pause')
    $('.indicator-item').on('click', () => $('.sliderone').slider('pause'))
  }

  getData() {
    this.$http.get(this.bannerEndpoint).then((results) => {
      this.banners = results.data.data.sort((a, b) => {
        return a.position > b.position
      })
      let inner = ''
      this.banners.forEach((item) => {
        if(item.active === 0){return}
        let template = ''
        if(item.id_type_banner === 1){
          template = this.templates['image']
        }else if(item.id_type_banner === 2){
          template = this.templates['caption_down']
        }else  if(item.id_type_banner === 3){
          template = this.templates['caption_right']
        }
        let i = template.replace('{{ID}}',item.id)
        i = i.replace('{{BACKGROUND}}', item.video ? 
          this.video_template
          .replace('{{VIDEO}}',item.video ? encodeURI(item.video):'')
          .replace('{{IMAGE}}',item.background ? encodeURI(item.background) : '' )  : 
          item.background ? this.image_template
          .replace('{{IMAGE}}',encodeURI(item.background)):''
        )
        i= i.replace('{{CAPTION}}', item.title || item.summary ? 
          this.caption_template
          .replace('{{TITLE}}',item.title ? item.title :'')
          .replace('{{SUMMARY}}',item.summary ? item.summary :'')
          .replace('{{MORE}}', item.text ? this.more_template
          .replace('{{ID}}',item.id):'') : '')
        inner += i
      })
      $('.slides').html(inner)
      this.optionsSlider()
    })
  }

}

export default SliderController
