import request from "../utils/request";
import { prefixBs } from "../config";
/**
 * @description 租户用户管理接口
 */
//查询用户分页
export function getTenantUserList(data) {
  return request({
    url: prefixBs + "/tenant/user/query",
    method: "post",
    data,
  });
}
//新增用户
export function addTenantUser(data) {
  return request({
    url: prefixBs + "/tenant/user/add",
    method: "post",
    data,
  });
}
//删除用户
export function delTenantUser(data) {
  return request({
    url: prefixBs + "/tenant/user/delUser",
    method: "post",
    data,
  });
}
//激活用户
export function activateTenantUser(data) {
  return request({
    url: prefixBs + "/tenant/user/activateUser",
    method: "post",
    data,
  });
}
//锁定用户
export function lockTenantUser(data) {
  return request({
    url: prefixBs + "/tenant/user/lockUser",
    method: "post",
    data,
  });
}
//修改用户
export function editTenantUser(data) {
  return request({
    url: prefixBs + "/tenant/user/update",
    method: "post",
    data,
  });
}
//修改个人密码
export function editTenantPassword(data) {
  return request({
    url: prefixBs + "/tenant/user/updatePassword",
    method: "post",
    data,
  });
}
//修改用户密码
export function editTenantUserPassword(data) {
  return request({
    url: prefixBs + "/tenant/user/updateUserPassword",
    method: "post",
    data,
  });
}
//登录之后选择进入应用获取左侧菜单
export function getMenuTreeBySystemCode(data) {
  return request({
    url: prefixBs + "/tenant/user/getMenuTreeBySystemCode",
    method: "post",
    data,
  });
}
