import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改
/**
 * @description 车辆管理接口
 */
//查询车辆
export function getTruckList(data) {
  return request({
    url: prefixBs + '/truck/query',
    method: 'post',
    data,
  })
}
//根据承运单位查询车辆
export function queryByTransport(data) {
  return request({
    url: prefixBs + '/truck/queryByTransport',
    method: 'post',
    data,
  })
}

//查询车辆集合
export function getTrucksList(data) {
  return request({
    url: prefixBs + '/truck/getList',
    method: 'post',
    data,
  })
}
//新增车辆
export function addTruck(data) {
  return request({
    url: prefixBs + '/truck/add',
    method: 'post',
    data,
  })
}
//新增车辆和证件
export function addTruckAndCert(data) {
  return request({
    url: prefixBs + '/truck/addTruckAndCert',
    method: 'post',
    data,
  })
}
//修改车辆
export function editTruck(data) {
  return request({
    url: prefixBs + '/truck/update',
    method: 'post',
    data,
  })
}
//修改车辆和证件
export function editTruckAndCert(data) {
  return request({
    url: prefixBs + '/truck/editTruckAndCert',
    method: 'post',
    data,
  })
}
//删除车辆
export function delTruck(data) {
  return request({
    url: prefixBs + '/truck/delete',
    method: 'post',
    data,
  })
}
//查询车辆证件
export function getTruckCertList(data) {
  return request({
    url: prefixBs + '/truckCert/query',
    method: 'post',
    data,
  })
}
//查询车辆证件集合
export function getTruckCertsList(data) {
  return request({
    url: prefixBs + '/truckCert/getList',
    method: 'post',
    data,
  })
}
//新增车辆证件
export function addTruckCert(data) {
  return request({
    url: prefixBs + '/truckCert/add',
    method: 'post',
    data,
  })
}
//修改车辆证件集合
export function editTruckCert(data) {
  return request({
    url: prefixBs + '/truckCert/update',
    method: 'post',
    data,
  })
}
//删除车辆证件集合
export function delTruckCert(data) {
  return request({
    url: prefixBs + '/truckCert/delete',
    method: 'post',
    data,
  })
}
//删除车辆企业关联
export function delCoTruck(data) {
  return request({
    url: prefixBs + '/truck/deleteCoTrucks',
    method: 'post',
    data,
  })
}

// 车辆皮重分页
export function truckTarequery(data) {
  return request({
    url: prefixBs + '/truckTare/query',
    method: 'post',
    data,
  })
}
