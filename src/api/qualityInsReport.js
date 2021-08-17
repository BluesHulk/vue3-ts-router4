import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改
/**
 * @description 质检报告单管理接口
 */
//查询质检报告单
export function getQualityInsReportList(data) {
  return request({
    url: prefixBusiness + '/co/qualityInsReport/query',
    method: 'post',
    data,
  })
}
//新增质检报告单
export function addQualityInsReport(data) {
  return request({
    url: prefixBusiness + '/co/qualityInsReport/add',
    method: 'post',
    data,
  })
}
//修改质检报告单
export function editQualityInsReport(data) {
  return request({
    url: prefixBusiness + '/co/qualityInsReport/update',
    method: 'post',
    data,
  })
}
//删除质检报告单
export function delQualityInsReport(data) {
  return request({
    url: prefixBusiness + '/co/qualityInsReport/delete',
    method: 'post',
    data,
  })
}
//查询质检报告单详情
export function getQualityInsReportDetail(data) {
  return request({
    url: prefixBusiness + '/co/qualityInsReport/detail',
    method: 'post',
    data,
  })
}
//质检报告单启用
export function openQualityInsReport(data) {
  return request({
    url: prefixBusiness + '/co/qualityInsReport/open',
    method: 'post',
    data,
  })
}
//质检报告单禁用
export function closeQualityInsReport(data) {
  return request({
    url: prefixBusiness + '/co/qualityInsReport/close',
    method: 'post',
    data,
  })
}
