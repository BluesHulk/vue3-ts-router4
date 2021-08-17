// /co/salesOrder/querySaleOrderList
import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改

//销售订单列表
export function querySaleOrderList(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/querySaleOrderList',
    method: 'post',
    data,
  })
}

//销售订单列表 录入
export function salesOrderSave(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/save',
    method: 'post',
    data,
  })
}

//销售订单列表 编辑
export function updateOrderInfo(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/updateOrderInfo',
    method: 'post',
    data,
  })
}

//销售订单列表 开关
export function updateSwitchStatus(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/updateSwitchStatus',
    method: 'post',
    data,
  })
}

//销售订单列表 审核取消审核
export function updateAuditStatus(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/updateAuditStatus',
    method: 'post',
    data,
  })
}

//销售订单列表 删除
export function updateDelFlag(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/updateDelFlag',
    method: 'post',
    data,
  })
}

//根据rid 查询销售单详情
export function getOrderInfoByRid(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/getOrderInfoByRid',
    method: 'post',
    data,
  })
}

export function salesOrderFalg(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/update',
    method: 'post',
    data,
  })
}

//销售派车计划订单列表
export function querySaleOrderDpPlanList(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/querySaleOrderDpPlanList',
    method: 'post',
    data,
  })
}

//销售派车计划订单列表 录入
export function salesDpPlanSave(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/save',
    method: 'post',
    data,
  })
}

//销售派车计划订单 编辑
export function updatePlanInfo(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/updatePlanInfo',
    method: 'post',
    data,
  })
}

//根据rid 查询销售计划单详情
export function getPlanInfoByRid(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/getPlanInfoByRid',
    method: 'post',
    data,
  })
}

//销售派车计划订单开启-关闭功能
export function salePlanpdateSwitchStatus(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/updateSwitchStatus',
    method: 'post',
    data,
  })
}
//销售派车计划订单 审核-功能
export function salesPlanupdateAuditStatus(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/updateAuditStatus',
    method: 'post',
    data,
  })
}
//销售派车计划订单 删除功能
export function salesPlanupdateDelFlag(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/updateDelFlag',
    method: 'post',
    data,
  })
}

//销售派车计划订单 审核-开启-删除功能
export function updateSalesDpPlan(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/update',
    method: 'post',
    data,
  })
}

//派车单管理分页列表查询
export function queryDpOrderList(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/queryDpOrderList',
    method: 'post',
    data,
  })
}

//派车单管理查询详情
export function getDpOrderInfoByRid(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/getDpOrderInfoByRid',
    method: 'post',
    data,
  })
}

//销售派车单管理 录入
export function CoSalesDpOrderControllerSave(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/save',
    method: 'post',
    data,
  })
}
//销售派车单修改-审核-开启-删除功能
export function CoSalesDpOrderControllerUpdate(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/update',
    method: 'post',
    data,
  })
}

//销售派车单开启功能
export function CoSalesupdateSwitchStatus(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/updateSwitchStatus',
    method: 'post',
    data,
  })
}

//销售派车单审核 取消审核
export function CoSalesupdateupdateAuditStatus(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/updateAuditStatus',
    method: 'post',
    data,
  })
}

//销售派车单 删除
export function CoSalesupdateDelFlag(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/updateDelFlag',
    method: 'post',
    data,
  })
}

//修改销售派车单信息及订单商品相关信息
export function CoSalesDpOrderControllerUpdateOrderInfo(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/updateOrderInfo',
    method: 'post',
    data,
  })
}

//销售派车单 接单
export function receivingOrders(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/receivingOrders',
    method: 'post',
    data,
  })
}
//销售派车单 撤销接单
export function receivingRevoke(data) {
  return request({
    url: prefixBusiness + '/CoSalesDpOrderController/receivingRevoke',
    method: 'post',
    data,
  })
}
//派车计划终止
export function salesDpPlanupdateStopFlag(data) {
  return request({
    url: prefixBusiness + '/co/salesDpPlan/updateStopFlag',
    method: 'post',
    data,
  })
}

//派车计划修订
export function salesOrderRevise(data) {
  return request({
    url: prefixBusiness + '/co/salesOrder/revise',
    method: 'post',
    data,
  })
}
