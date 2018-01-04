class autocompleteController {
  constructor($http,$document,$scope) {
    'ngInject'
    this.$http = $http
    this.query = {
      page: 1,
      limit: 20,
      filter: ''
    }
    this.$scope = $scope
    $document.on('click',this,(e)=>{
      if(e.data.list && e.data.list.length){
        e.data.list = []
        e.data.value = null
        e.data.query.filter = ''
        e.data.onSelected({item:null})
        e.data.$scope.$apply()
      }
      
      
      
      
    })
  }
  clear() {
    this.list = []
  }
  highlight(string) {
    var matchStart = string.toLowerCase().indexOf('' + this.query.filter.toLowerCase() + ''),
      matchEnd = matchStart + this.query.length - 1,
      beforeMatch = string.slice(0, matchStart),
      matchText = string.slice(matchStart, matchEnd + 1),
      afterMatch = string.slice(matchEnd + 1)
    string = '<span>' + beforeMatch + '<span class="highlight">' +
      matchText + '</span>' + afterMatch + '</span>'
    return string
  }
  select(item) {
    this.value = item
    this.query.filter = item.name
    this.list = []
    if (this.onSelected) {
      this.onSelected({item:item})
    }
  }
  getData() {
    this.list = []
    this.loading = true
    var url = this.endpoint
    if (!url) {
      return
    }
    var params = ['page=' + this.query.page, 'limit=' + this.query.limit]
    if (this.query.filter) {
      params.push('filter=' + this.query.filter)
    }
    if (this.query.fields) {
      for (var field in this.query.fields) {
        var values = this.query.fields[field]
        if (typeof values === 'object') {
          values.forEach(function (value) {
            params.push('filter_field=' + field + '&filter_value=' + value)
          })
        } else {
          params.push('filter_field=' + field + '&filter_value=like%20%' + values + '%')
        }
      }
    }
    if (this.query.order) {
      params.push('order=' + this.query.order)
    }

    url = url.indexOf('?') > -1 ? url + '&' + params.join('&') : url + '?' + params.join('&')
    this.$http.get(url).then((response) => {
      this.list = response.data.data
      this.loading = false
    })
    return true
  }
}

export default autocompleteController