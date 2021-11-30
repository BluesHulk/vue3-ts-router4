import request from "../utils/request";
import { prefixBs } from "../config"; //接口前缀的名称 会更改

//查询自动批次配置
export function autoBatchRulequery(data) {
  return request({
    url: prefixBs + "/autoBatchRule/query",
    method: "post",
    data,
  });
}

//查询自动批次配置新增
export function autoBatchRuleadd(data) {
  return request({
    url: prefixBs + "/autoBatchRule/add",
    method: "post",
    data,
  });
}
//查询自动批次配置编辑
export function autoBatchRuleupdate(data) {
  return request({
    url: prefixBs + "/autoBatchRule/update",
    method: "post",
    data,
  });
}

//查询自动批次配置删除
export function autoBatchRuledelete(data) {
  return request({
    url: prefixBs + "/autoBatchRule/delete",
    method: "post",
    data,
  });
}
