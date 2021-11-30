import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改
/**
 * @description 对账单接口
 */
//对账单列表
export function getDporderStatementList(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/query',
    method: 'post',
    data,
  })
}
//在线对账派车单列表
export function getDporderStatementOrderList(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/queryByOrder',
    method: 'post',
    data,
  })
}
//销售在线对账派车单列表
export function getDporderStatementSalesOrderList(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/queryBySalesOrder',
    method: 'post',
    data,
  })
}
//经销商在线对账派车单列表
export function getDporderStatementAgentOrderList(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/queryByAgentOrder',
    method: 'post',
    data,
  })
}
//生成对账单
export function addDporderStatement(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/add',
    method: 'post',
    data,
  })
}
//经销商生成对账单
export function addAgentDporderStatement(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/addForAgent',
    method: 'post',
    data,
  })
}
//撤销
export function revokeDporderStatement(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/revoke',
    method: 'post',
    data,
  })
}
//审核-取消审核
export function updateAuditStatus(data) {
  return request({
    url: prefixBusiness + '/co/dporderStatement/updateAuditStatus',
    method: 'post',
    data,
  })
}
