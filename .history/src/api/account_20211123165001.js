import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改

//查询用户分页
export function userPageList(data) {
  return request({
    url: prefixBs + '/user/query',
    method: 'post',
    data,
  })
}
//修改用户
export function userUpdate(data) {
  return request({
    url: prefixBs + '/user/update',
    method: 'post',
    data,
  })
}
//添加用户
export function userAdd(data) {
  return request({
    url: prefixBs + '/user/add',
    method: 'post',
    data,
  })
}
//批量删除用户
export function userdeleteBatch(data) {
  return request({
    url: prefixBs + '/user/deleteBatch',
    method: 'post',
    data,
  })
}
//查询用户详情
export function userdetailByFullName(data) {
  return request({
    url: prefixBs + '/user/detailByFullName',
    method: 'post',
    data,
  })
}
//重置用户密码
export function userResetPassword(data) {
  return request({
    url: prefixBs + '/user/resetPassword',
    method: 'post',
    data,
  })
}

//修改用户密码
export function userUpdatePassword(data) {
  return request({
    url: prefixBs + '/user/updatePassword',
    method: 'post',
    data,
  })
}
