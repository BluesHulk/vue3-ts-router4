import request from '@/utils/request'
import { prefixBsCalculate } from '@/config' //接口前缀的名称 会更改

//流程节点分页
export function getProcessList(data) {
  return request({
    url: prefixBsCalculate + '/wProcessCfg/query',
    method: 'post',
    data,
  })
}

//流程节点录入
export function addProcess(data) {
  return request({
    url: prefixBsCalculate + '/wProcessCfg/add',
    method: 'post',
    data,
  })
}

//流程节点批量录入
export function addBatchProcess(data) {
  return request({
    url: prefixBsCalculate + '/wProcessCfg/addBatch',
    method: 'post',
    data,
  })
}

//流程节点删除
export function delProcess(data) {
  return request({
    url: prefixBsCalculate + '/wProcessCfg/delete',
    method: 'post',
    data,
  })
}

//流程节点修改
export function editProcess(data) {
  return request({
    url: prefixBsCalculate + '/wProcessCfg/update',
    method: 'post',
    data,
  })
}
//业务类别分页
export function getBusinessTypeList(data) {
  return request({
    url: prefixBsCalculate + '/businessType/query',
    method: 'post',
    data,
  })
}

//业务类别录入
export function addBusinessType(data) {
  return request({
    url: prefixBsCalculate + '/businessType/add',
    method: 'post',
    data,
  })
}

//业务类别删除
export function delBusinessType(data) {
  return request({
    url: prefixBsCalculate + '/businessType/delete',
    method: 'post',
    data,
  })
}

//业务类别修改
export function editBusinessType(data) {
  return request({
    url: prefixBsCalculate + '/businessType/update',
    method: 'post',
    data,
  })
}
