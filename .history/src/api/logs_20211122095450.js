import request from '@/utils/request'
import { prefixCalculate } from '@/config' //接口前缀的名称 会更改

//流程日志分页查询
export function logisticsLogquery(data) {
  return request({
    url: prefixCalculate + '/logisticsLog/query',
    method: 'post',
    data,
  })
}
