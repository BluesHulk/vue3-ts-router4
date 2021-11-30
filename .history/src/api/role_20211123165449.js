import request from "../utils/request";
import { prefixBs } from "../config"; //接口前缀的名称 会更改
export function rolePageList(data) {
  return request({
    url: prefixBs + "/role/query",
    method: "post",
    data,
  });
}
export function roleEdit(data) {
  return request({
    url: prefixBs + "/role/edit",
    method: "post",
    data,
  });
}
export function roleAdd(data) {
  return request({
    url: prefixBs + "/role/add",
    method: "post",
    data,
  });
}

export function roleDel(data) {
  return request({
    url: prefixBs + "/role/del",
    method: "post",
    data,
  });
}

export function addRoleMenu(data) {
  return request({
    url: prefixBs + "/role/addRoleMenu",
    method: "post",
    data,
  });
}

export function getFunctionTreeByMenuCode(data) {
  return request({
    url: prefixBs + "/function/getFunctionTreeByMenuCode",
    method: "post",
    data,
  });
}

export function addRoleMenuFunc(data) {
  return request({
    url: prefixBs + "/menu/addRoleMenu",
    method: "post",
    data,
  });
}
