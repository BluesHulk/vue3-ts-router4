/* eslint-disable prettier/prettier */
import Vue from 'vue'

import moment from 'moment' // 时间
// 定义时间格式全局过滤器
Vue.filter('dateFormat', function (daraStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(daraStr).format(pattern)
})
Vue.filter('trend', function (value) {
  var val = Math.abs(value)
  if (val === 0) {
    val = ''
  }
  return val
})
Vue.filter('iiFixed', function (value) {
  if (isNaN(value)) {
    return '0.00'
  }
  return (value - 0).toFixed(2)
})
Vue.filter('iiThousands', function (value) {
  if (value == null) {
    return '-'
  }
  return UTIL.number_format(value, 0, '.', ',')
})

Vue.filter('formatStr', function (value) {
  if (!value) {
    return ''
  }
  var arr = value.split('|').filter(function (item, index) {
    return index < 2
  })

  return arr.join('、')
})

Vue.filter('formatStrLen', function (value, len) {
  if (!value) {
    return ''
  }
  if (value.length > len) {
    value.length = len
    return value + '…'
  }
  return value
})

Vue.filter('replaceImgHost', function (value) {
  if (!value)
    return 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

  return value.replace(
    'http://img.iminer.com/',
    'http://' + location.host + '/'
  )
})

Vue.filter('iiFormat1', function (value) {
  if (value == null || value == 'null' || value == '') {
    return '-'
  }
  return value
})
