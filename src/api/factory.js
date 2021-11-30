import request from "../utils/request";
import { prefixBs, prefixBsCalculate } from "../config"; //接口前缀的名称 会更改

//查询厂内排队配置管理分页查询
export function queueAreaRulequery(data) {
  return request({
    url: prefixBs + "/queueAreaRule/query",
    method: "post",
    data,
  });
}

//查询厂内排队配置管理 新增
export function queueAreaRuleadd(data) {
  return request({
    url: prefixBs + "/queueAreaRule/add",
    method: "post",
    data,
  });
}

//查询厂内排队配置管理 删除
export function queueAreaRuledelete(data) {
  return request({
    url: prefixBs + "/queueAreaRule/delete",
    method: "post",
    data,
  });
}

//查询厂内排队配置管理 更新
export function queueAreaRuleupdate(data) {
  return request({
    url: prefixBs + "/queueAreaRule/update",
    method: "post",
    data,
  });
}

//查询厂内排队配置管理 批量添加
export function queueAreaRuleaddBatch(data) {
  return request({
    url: prefixBs + "/queueAreaRule/addBatch",
    method: "post",
    data,
  });
}

//查询厂内排队 预警配置 批量添加
export function queueProductRuleaddBatch(data) {
  return request({
    url: prefixBs + "/queueProductRule/addBatch",
    method: "post",
    data,
  });
}

//查询厂内排队 预警配置 批量修改
export function queueProductRuleupdateBatch(data) {
  return request({
    url: prefixBs + "/queueAreaRule/updateBatch",
    method: "post",
    data,
  });
}

//查询厂内排队 预警配置 批量添加
export function queueProductRulelist(data) {
  return request({
    url: prefixBs + "/queueProductRule/list",
    method: "post",
    data,
  });
}

//查询厂内排队列表
export function factoryQueuequery(data) {
  return request({
    url: prefixBsCalculate + "/factoryQueue/query",
    // url: '/factoryQueue/query',
    method: "post",
    data,
  });
}

//查询厂内运输单列表
export function tpSiteProgressquery(data) {
  return request({
    url: prefixBsCalculate + "/tpSiteProgress/query",
    // url: '/factoryQueue/query',
    method: "post",
    data,
  });
}

//取号
export function takeNumber(data) {
  return request({
    url: prefixBsCalculate + "/factoryQueue/takeNumber",
    // url: '/factoryQueue/query',
    method: "post",
    data,
  });
}
//叫号
export function callNumber(data) {
  return request({
    url: prefixBsCalculate + "/factoryQueue/callNumber",
    // url: '/factoryQueue/query',
    method: "post",
    data,
  });
}

//取消排队
export function factoryQueuedelete(data) {
  return request({
    url: prefixBsCalculate + "/factoryQueue/delete",
    // url: '/factoryQueue/query',
    method: "post",
    data,
  });
}

//取消叫号
export function factoryQueueupdate(data) {
  return request({
    url: prefixBsCalculate + "/factoryQueue/update",
    // url: '/factoryQueue/query',
    method: "post",
    data,
  });
}

//插队
export function factoryQueueadjustOrder(data) {
  return request({
    url: prefixBsCalculate + "/factoryQueue/adjustOrder",
    // url: '/factoryQueue/query',
    method: "post",
    data,
  });
}
