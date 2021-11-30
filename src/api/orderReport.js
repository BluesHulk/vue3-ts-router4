import request from "../utils/request";
import { prefixBusiness } from "../config"; //接口前缀的名称 会更改
/**
 * @description 报表接口
 */
//供应商-物料统计报表
export function supplierStatisticsList(data) {
  return request({
    url: prefixBusiness + "/orderReport/supplierStatisticsList",
    method: "post",
    data,
  });
}
//客户-物料统计报表
export function customerStatisticList(data) {
  return request({
    url: prefixBusiness + "/orderReport/customerStatisticList",
    method: "post",
    data,
  });
}
//采购物料统计报表
export function purchaseProductStatisticList(data) {
  return request({
    url: prefixBusiness + "/orderReport/purchaseProductStatisticList",
    method: "post",
    data,
  });
}
//销售物料统计报表
export function salesProductStatisticList(data) {
  return request({
    url: prefixBusiness + "/orderReport/salesProductStatisticList",
    method: "post",
    data,
  });
}

//销售订单明细报表
export function orderReportsalesOrderDetail(data) {
  return request({
    url: prefixBusiness + "/orderReport/salesOrderDetail",
    method: "post",
    data,
  });
}

//采购订单明细报表
export function orderReportpurchaseOrderDetail(data) {
  return request({
    url: prefixBusiness + "/orderReport/purchaseOrderDetail",
    method: "post",
    data,
  });
}
// 销售订单明细报表导出
export function salesOrderDetailExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/salesOrderDetailExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}

// 采购订单明细报表导出
export function purchaseOrderDetailExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/purchaseOrderDetailExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}

//客户-物料统计报表导出
export function customerStatisticsExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/customerStatisticsExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}
//采购物料统计报表年月日导出
export function purchaseProductStatisticExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/purchaseProductStatisticExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}
//销售物料统计报表年月日导出
export function salesProductStatisticExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/salesProductStatisticExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}
//供应商-物料统计报表导出
export function supplierStatisticsExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/supplierStatisticsExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}

// 批次回单-明细
export function batchReceiptDetails(data) {
  return request({
    url: prefixBusiness + "/orderReport/batchReceiptDetails",
    method: "post",
    data,
  });
}

//批次回单-明细导出
export function batchReceiptDetailsExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/batchReceiptDetailsExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}

// 批次回单-汇总
export function batchReceiptSummary(data) {
  return request({
    url: prefixBusiness + "/orderReport/batchReceiptSummary",
    method: "post",
    data,
  });
}

// 批次回单-汇总导出
export function batchReceiptSummaryExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/batchReceiptSummaryExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}

// 销售订单明细报表<含单价>
export function salesOrderDetailAndPrice(data) {
  return request({
    url: prefixBusiness + "/orderReport/salesOrderDetailAndPrice",
    method: "post",
    data,
  });
}

// 销售订单明细报表<含单价> 导出
export function salesOrderDetailAndPriceExport(data) {
  return request({
    url: prefixBusiness + "/orderReport/salesOrderDetailAndPriceExport",
    method: "post",
    data,
    responseType: "arraybuffer",
  });
}
