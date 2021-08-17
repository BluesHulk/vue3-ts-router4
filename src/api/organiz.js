import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改
//DeptController 部门控制层
//根据公司获取销售区域树
export function getDeptTreeByCoCode(data) {
  return request({
    url: prefixBs + '/dept/getDeptTreeByCoCode',
    method: 'post',
    data,
  })
}
export function getDeptAdd(data) {
  return request({
    url: prefixBs + '/dept/add',
    method: 'post',
    data,
  })
}
export function getDeptDel(data) {
  return request({
    url: prefixBs + '/dept/delete',
    method: 'post',
    data,
  })
}
export function getDeptEdit(data) {
  return request({
    url: prefixBs + '/dept/edit',
    method: 'post',
    data,
  })
}
//获取部门详情
export function getDeptDetail(data) {
  return request({
    url: prefixBs + '/dept/detail',
    method: 'post',
    data,
  })
}
