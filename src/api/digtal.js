import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改
// 数据字典 列表
export function digtalPageList(data) {
  return request({
    url: prefixBs + '/codeList/query',
    method: 'post',
    data,
  })
}
export function digtalPagegetList(data) {
  return request({
    url: prefixBs + '/codeList/getList',
    method: 'post',
    data,
  })
}
// 数据字典 列表 删除
export function digtalPageListDel(data) {
  return request({
    url: prefixBs + '/codeList/del',
    method: 'post',
    data,
  })
}
// 数据字典 列表 编辑
export function digtalPageListEdit(data) {
  return request({
    url: prefixBs + '/codeList/edit',
    method: 'post',
    data,
  })
}
// 数据字典 列表 新增
export function digtalPageListAdd(data) {
  return request({
    url: prefixBs + '/codeList/add',
    method: 'post',
    data,
  })
}
// 数据字典查看类型 列表
export function getListByTidAndBelongCode(params) {
  return request({
    url: prefixBs + '/codeItem/getListByTidAndBelongCode',
    method: 'post',
    params,
  })
}
// 数据字典查看类型新增
export function codeItemAdd(data) {
  return request({
    url: prefixBs + '/codeItem/add',
    method: 'post',
    data,
  })
}
// 数据字典查看类型删除
export function codeItemDel(data) {
  return request({
    url: prefixBs + '/codeItem/del',
    method: 'post',
    data,
  })
}
// 数据字典查看类型编辑
export function codeItemEdit(data) {
  return request({
    url: prefixBs + '/codeItem/edit',
    method: 'post',
    data,
  })
}
