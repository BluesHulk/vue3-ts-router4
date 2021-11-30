import request from '@/utils/request'
import { prefixBs, prefixPassport } from '@/config' //接口前缀的名称 会更改

export function getUserInfo() {
  return request({
    url: '/userInfo',
    method: 'get',
  })
}

//用户获取系统
export function getSystem(data) {
  return request({
    url: prefixBs + '/system/getListByUser',
    method: 'post',
    data,
  })
}

// 注册
export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data,
  })
}

//登录
export function login(data) {
  return request({
    url: prefixPassport + '/userAuth/login.do',
    // url: '/api/passport/userAuth/login.do',
    method: 'post',
    data,
  })
}

//登出
export function logout(data) {
  return request({
    // url: '/vue-element-admin/user/login',
    url: prefixBs + '/userAuth/logout',
    method: 'post',
    data,
  })
}

// 用户分页列表
export function userQuery(data) {
  return request({
    url: prefixBs + '/user/query',
    method: 'post',
    data,
  })
}

// 用户添加
export function userAdd(data) {
  return request({
    url: prefixBs + '/user/add',
    method: 'post',
    data,
  })
}

// 重置用户密码
export function resetPassword(data) {
  return request({
    url: prefixBs + '/user/resetPassword',
    method: 'post',
    data,
  })
}

// 修改用户密码
export function updatePassword(data) {
  return request({
    url: prefixBs + '/user/updateUserPassword',
    method: 'post',
    data,
  })
}

// 修改个人密码
export function updatePasswordSelf(data) {
  return request({
    url: prefixBs + '/user/updatePassword',
    method: 'post',
    data,
  })
}

// 用户更新
export function userUpdate(data) {
  return request({
    url: prefixBs + '/user/update',
    method: 'post',
    data,
  })
}

// token刷新
export function refreshToken(data) {
  return request({
    url: prefixBs + '/userAuth/refreshToken',
    method: 'post',
    data,
  })
}

// 锁定用户
export function lockUser(data) {
  return request({
    url: prefixBs + '/user/lockUser',
    method: 'post',
    data,
  })
}

// 激活用户
export function activateUser(data) {
  return request({
    url: prefixBs + '/user/activateUser',
    method: 'post',
    data,
  })
}

// 激活用户
export function getFunctionByMenuCode(data) {
  return request({
    url: prefixBs + '/userAuth/getFunctionByMenuCode',
    method: 'post',
    data,
  })
}

// 按钮权限
export function getAllFunctionByMenuCode(data) {
  return request({
    url: prefixBs + '/userAuth/getAllFunctionByMenuCode',
    method: 'post',
    data,
  })
}
