import request from "../utils/request";
import { prefixBsCalculate } from "../config"; //接口前缀的名称 会更改

//厂内物流作废
export function cancellationWeigh(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/cancellationWeigh",
    method: "post",
    data,
  });
}

//厂内物流查询
export function getTpSiteList(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/query",
    method: "post",
    data,
  });
}

//厂内物流 空车出厂
export function notMaterial(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/notMaterial",
    method: "post",
    data,
  });
}

//查询司机是否有厂内运输单
export function getOne(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/getOne",
    method: "post",
    data,
  });
}

//新增厂内运输单
export function addTpSite(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/add",
    method: "post",
    data,
  });
}

//修改厂内运输单
export function editTpSite(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/update",
    method: "post",
    data,
  });
}

//人工过磅
export function artificialWeigh(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/artificialWeigh",
    method: "post",
    data,
  });
}

//汇总数据
export function statWeight(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/statWeight",
    method: "post",
    data,
  });
}
