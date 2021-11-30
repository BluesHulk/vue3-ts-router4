import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改

//皮重分页查询
export function getTruckTareList(data) {
  return request({
    url: prefixBs + '/truckTare/query',
    method: 'post',
    data,
  })
}

//皮重查询集合
export function getTruckTare(data) {
  return request({
    url: prefixBs + '/truckTare/getList',
    method: 'post',
    data,
  })
}

//新增皮重
export function addTruckTare(data) {
  return request({
    url: prefixBs + '/truckTare/add',
    method: 'post',
    data,
  })
}

//删除皮重
export function deleteTruckTare(data) {
  return request({
    url: prefixBs + '/truckTare/delete',
    method: 'post',
    data,
  })
}

//修改皮重
export function editTruckTare(data) {
  return request({
    url: prefixBs + '/truckTare/update',
    method: 'post',
    data,
  })
}
