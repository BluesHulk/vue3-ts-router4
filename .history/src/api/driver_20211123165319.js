import request from "../utils/request";
import { prefixBs } from "../config"; //接口前缀的名称 会更改
/**
 * @description 司机管理接口
 */
//查询司机
export function getDriverList(data) {
  return request({
    url: prefixBs + "/driver/query",
    method: "post",
    data,
  });
}
//承运单位查询查询司机
export function drivequeryByTransport(data) {
  return request({
    url: prefixBs + "/driver/queryByTransport",
    method: "post",
    data,
  });
}

//查询司机集合
export function getDriversList(data) {
  return request({
    url: prefixBs + "/driver/getList",
    method: "post",
    data,
  });
}
//新增司机
export function addDriver(data) {
  return request({
    url: prefixBs + "/driver/add",
    method: "post",
    data,
  });
}
//新增司机和证件
export function addDriverAndCert(data) {
  return request({
    url: prefixBs + "/driver/addDriverAndCert",
    method: "post",
    data,
  });
}
//修改司机
export function editDriver(data) {
  return request({
    url: prefixBs + "/driver/update",
    method: "post",
    data,
  });
}
//修改司机和证件
export function editDriverAndCert(data) {
  return request({
    url: prefixBs + "/driver/editDriverAndCert",
    method: "post",
    data,
  });
}
//删除司机
export function delDriver(data) {
  return request({
    url: prefixBs + "/driver/delete",
    method: "post",
    data,
  });
}
//查询司机证件
export function getDriverCertList(data) {
  return request({
    url: prefixBs + "/driverCert/query",
    method: "post",
    data,
  });
}
//查询司机证件集合
export function getDriverCertsList(data) {
  return request({
    url: prefixBs + "/driverCert/getList",
    method: "post",
    data,
  });
}
//新增司机证件
export function addDriverCert(data) {
  return request({
    url: prefixBs + "/driverCert/add",
    method: "post",
    data,
  });
}
//修改司机证件
export function editDriverCert(data) {
  return request({
    url: prefixBs + "/driverCert/update",
    method: "post",
    data,
  });
}
//删除司机证件
export function delDriverCert(data) {
  return request({
    url: prefixBs + "/driverCert/delete",
    method: "post",
    data,
  });
}
//删除司机企业关联
export function delCoDriver(data) {
  return request({
    url: prefixBs + "/driver/deleteCoDrivers",
    method: "post",
    data,
  });
}
