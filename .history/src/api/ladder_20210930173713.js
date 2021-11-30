import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改

//查询阶梯误差分页查询
export function stairErrValuequery(data) {
  return request({
    url: prefixBs + '/stairErrValue/query',
    method: 'post',
    data,
  })
}

//查询阶梯误差 新增
export function stairErrValueadd(data) {
  return request({
    url: prefixBs + '/stairErrValue/add',
    method: 'post',
    data,
  })
}

//查询阶梯误差 删除
export function stairErrValuedelete(data) {
  return request({
    url: prefixBs + '/stairErrValue/delete',
    method: 'post',
    data,
  })
}
//查询阶梯误差 修改
export function stairErrValueupdate(data) {
  return request({
    url: prefixBs + '/stairErrValue/update',
    method: 'post',
    data,
  })
}
