import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改

// 查询系统设置的集合
export function getSettingList(data) {
  return request({
    url: prefixBs + '/setting/list',
    method: 'post',
    data,
  })
}

// 查询配置分类
export function getSettingByTypes(data) {
  return request({
    url: prefixBs + '/setting/getSettingByTypes',
    method: 'post',
    data,
  })
}

// 批量修改系统设置的参数
export function editBatchSetting(data) {
  return request({
    url: prefixBs + '/setting/updateBatch',
    method: 'post',
    data,
  })
}

// 批量添加系统设置的参数
export function addBatchSetting(data) {
  return request({
    url: prefixBs + '/setting/addBatch',
    method: 'post',
    data,
  })
}

// 修改系统设置的参数
export function editSetting(data) {
  return request({
    url: prefixBs + '/setting/update',
    method: 'post',
    data,
  })
}

// 添加系统设置的参数
export function addSetting(data) {
  return request({
    url: prefixBs + '/setting/add',
    method: 'post',
    data,
  })
}

// 删除系统设置的参数
export function deleteSetting(data) {
  return request({
    url: prefixBs + '/setting/delete',
    method: 'post',
    data,
  })
}

// 开单工厂
export function getBillFactory(data) {
  return request({
    url: prefixBs + '/setting/getBillFactory',
    method: 'post',
    data,
  })
}
