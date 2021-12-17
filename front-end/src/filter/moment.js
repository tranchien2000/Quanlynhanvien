import moment from 'moment'
import Vue from 'vue'
import _ from 'lodash'

Vue.filter('momentDate', (input, format) => {
  if (!input) {
    return ''
  }
  var date = moment(input || 'N/A')
  if (date.isValid()) return _.capitalize(date.format(format))
  else return ''
})
