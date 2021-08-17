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

//销售区域录入
export function getDeptAdd(data) {
  return request({
    url: prefixBs + '/dept/add',
    method: 'post',
    data,
  })
}

//销售区域删除
export function getDeptDel(data) {
  return request({
    url: prefixBs + '/dept/delete',
    method: 'post',
    data,
  })
}

//销售区域编辑
export function getDeptEdit(data) {
  return request({
    url: prefixBs + '/dept/edit',
    method: 'post',
    data,
  })
}
