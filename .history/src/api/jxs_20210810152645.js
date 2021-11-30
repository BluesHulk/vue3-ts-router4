import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改
//采购订单列表
export function purchaseOrderList(data) {
  return request({
    url: prefixBusiness + '/agent/order/query',
    method: 'post',
    data,
  })
}
//采购订单更新
export function purchaseOrderupdate(data) {
  return request({
    url: prefixBusiness + '/agent/order/update',
    method: 'post',
    data,
  })
}
//采购订单新增
export function purchaseOrderAdd(data) {
  return request({
    url: prefixBusiness + '/agent/order/add',
    method: 'post',
    data,
  })
}
//采购订单删除
export function purchaseOrderdelete(data) {
  return request({
    url: prefixBusiness + '/agent/order/delete',
    method: 'post',
    data,
  })
}
//采购订单详情
export function purchaseOrderdetail(data) {
  return request({
    url: prefixBusiness + '/agent/order/detail',
    method: 'post',
    data,
  })
}

//采购订单计划取消审核
export function purchaseDbPlanupdateAuditStatus(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/updateAuditStatus',
    method: 'post',
    data,
  })
}
//取消审核
export function purchaseOrderupdateAuditStatus(data) {
  return request({
    url: prefixBusiness + '/agent/order/updateAuditStatus',
    method: 'post',
    data,
  })
}
//开启-关闭订单
export function purchaseOrderupdateStatus(data) {
  return request({
    url: prefixBusiness + '/agent/order/updateStatus',
    method: 'post',
    data,
  })
}
//-派车计划终止
export function purchaseOrderstop(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/stop',
    method: 'post',
    data,
  })
}
//采购订单-派车计划列表
export function purchaseDbPlanList(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/query',
    method: 'post',
    data,
  })
}

//添加采购订单-派车计划
export function purchaseDbPlanAdd(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/add',
    method: 'post',
    data,
  })
}

//采购订单-派车计划删除
export function purchaseDbPlanDelete(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/delete',
    method: 'post',
    data,
  })
}
//采购订单-派车计划开启关闭
export function purchaseDbPlanSwitch(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/switchPlan',
    method: 'post',
    data,
  })
}
//采购订单-派车计划详情
export function purchaseDbPlanDetail(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/detail',
    method: 'post',
    data,
  })
}
//采购订单-派车单管理计划详情
export function purchaseDpOrderDetail(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/detail',
    method: 'post',
    data,
  })
}
//修改采购订单-派车计划
export function purchaseDbPlanUpdate(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/update',
    method: 'post',
    data,
  })
}

//采购订单-派车计划终止
export function purchaseDbPlanStop(data) {
  return request({
    url: prefixBusiness + '/agent/dbPlan/updateStopFlag',
    method: 'post',
    data,
  })
}
//采购订单-派车计划终止
export function productUnit(data) {
  return request({
    url: prefixBusiness + '/productUnit/getListAll',
    method: 'post',
    data,
  })
}
//采购订单-派车单管理列表
export function purchaseDpOrderList(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/query',
    method: 'post',
    data,
  })
}

//派车单管理 采购订单-派车单 添加
export function purchaseDpOrderAdd(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/add',
    method: 'post',
    data,
  })
}

//派车单管理 修改采购订单-派车单
export function purchaseDpOrderUpdate(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/update',
    method: 'post',
    data,
  })
}

//派车单管理 审核-取消审核
export function purchaseDpOrderAuditStatus(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/updateAuditStatus',
    method: 'post',
    data,
  })
}

//派车单管理 开启关闭
export function purchaseDpOrderswitchOrder(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/switchOrder',
    method: 'post',
    data,
  })
}
//派车单管理 删除
export function purchaseDpOrderdelete(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/delete',
    method: 'post',
    data,
  })
}

//派车单管理 验收
export function purchaseDpOrderacceptance(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/acceptance',
    method: 'post',
    data,
  })
}

//派车单管理 接单
export function purchaseDpOrderreceivingOrders(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/receivingOrders',
    method: 'post',
    data,
  })
}

//派车单管理 撤单
export function purchaseDpOrderreceivingRevoke(data) {
  return request({
    url: prefixBusiness + '/agent/dpOrder/receivingRevoke',
    method: 'post',
    data,
  })
}
