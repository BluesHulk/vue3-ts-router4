import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改
//采购订单-运货单维护列表
export function queryByLoad(data) {
  return request({
    url: prefixBusiness + '/co/purchaseDpOrder/queryByLoad',
    method: 'post',
    data,
  })
}
//采购订单-送货单录入（装卸货）
export function purchaseDpOrderSave(data) {
  return request({
    url: prefixBusiness + '/co/purchaseDpOrder/loading',
    method: 'post',
    data,
  })
}

//采购订单-运货单签收列表
export function queryBySign(data) {
  return request({
    url: prefixBusiness + '/co/purchaseDpOrder/queryBySign',
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

//销售订单--签收
export function CoSalesDpOrderSgin(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderSignController/sgin',
    method: 'post',
    data,
  })
}
//销售订单--撤销签收
export function CoSalesDpOrderSignrevokeSgin(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderSignController/revokeSgin',
    method: 'post',
    data,
  })
}

//销售订单-运货单维护列表
export function CoSalesDpOrderqueryByLoad(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/queryByLoad',
    method: 'post',
    data,
  })
}
//销售订单-派车单详情
export function CoSalesDpOrderdetail(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/detail',
    method: 'post',
    data,
  })
}
//销售订单-送货单录入（装卸货）
export function CoSalesDpOrderSave(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/loading',
    method: 'post',
    data,
  })
}

//销售订单-送货单录入（装卸货）
export function CoSalesDpOrderControllerqueryBySign(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/queryBySign',
    method: 'post',
    data,
  })
}
