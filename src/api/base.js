import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改

//根据公司获取销售区域树
export function getSaleAreaTreeByCoCode(data) {
  return request({
    url: prefixBs + '/saleArea/getSaleAreaTreeByCoCode',
    method: 'post',
    data,
  })
}

//销售区域录入
export function saleAreaAdd(data) {
  return request({
    url: prefixBs + '/saleArea/add',
    method: 'post',
    data,
  })
}

//销售区域删除
export function getDeptDel(data) {
  return request({
    url: prefixBs + '/saleArea/delete',
    method: 'post',
    data,
  })
}

//销售区域编辑
export function saleAreaEdit(data) {
  return request({
    url: prefixBs + '/saleArea/edit',
    method: 'post',
    data,
  })
}
