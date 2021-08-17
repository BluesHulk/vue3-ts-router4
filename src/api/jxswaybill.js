import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改
//采购订单-运货单维护列表
export function queryByLoad(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/queryByLoad',
    method: 'post',
    data,
  })
}
//采购订单-送货单录入（装卸货）
export function purchaseDpOrderSave(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/loading',
    method: 'post',
    data,
  })
}

//采购订单-运货单签收列表
export function queryBySign(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/queryBySign',
    method: 'post',
    data,
  })
}

//采购订单-签收
export function purchaseDpOrderSgin(data) {
  return request({
    url: prefixBusiness + '/co/purchaseDpOrderSgin/sgin',
    method: 'post',
    data,
  })
}
//采购订单-撤销签收
export function purchaseDpOrderSginrevokeSgin(data) {
  return request({
    url: prefixBusiness + '/co/purchaseDpOrderSgin/revokeSgin',
    method: 'post',
    data,
  })
}
