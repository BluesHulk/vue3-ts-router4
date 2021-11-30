import request from "../utils/request";
import { prefixBs } from "../config"; //接口前缀的名称 会更改
/**
 * @description 基础档案接口
 */
//查询物料
export function getProductList(data) {
  return request({
    url: prefixBs + "/product/query",
    method: "post",
    data,
  });
}
//查询物料不分页
export function getProductsList(data) {
  return request({
    url: prefixBs + "/product/getList",
    method: "post",
    data,
  });
}
//新增物料
export function addProduct(data) {
  return request({
    url: prefixBs + "/product/add",
    method: "post",
    data,
  });
}
//修改物料
export function editProduct(data) {
  return request({
    url: prefixBs + "/product/edit",
    method: "post",
    data,
  });
}
//删除物料
export function delProduct(data) {
  return request({
    url: prefixBs + "/product/delete",
    method: "post",
    data,
  });
}
//查询物料分类
export function getProductCategoryList(data) {
  return request({
    url: prefixBs + "/productCategory/query",
    method: "post",
    data,
  });
}
//查询物料不分页
export function getProductCategorysList(data) {
  return request({
    url: prefixBs + "/productCategory/getList",
    method: "post",
    data,
  });
}
//查询物料分类详情
export function getProductCategoryDetail(data) {
  return request({
    url: prefixBs + "/productCategory/detail",
    method: "post",
    data,
  });
}
//新增物料分类
export function addProductCategory(data) {
  return request({
    url: prefixBs + "/productCategory/add",
    method: "post",
    data,
  });
}
//修改物料分类
export function editProductCategory(data) {
  return request({
    url: prefixBs + "/productCategory/edit",
    method: "post",
    data,
  });
}
//删除物料分类
export function delProductCategory(data) {
  return request({
    url: prefixBs + "/productCategory/delete",
    method: "post",
    data,
  });
}
//查询地址
export function getSendconsAddrList(data) {
  return request({
    url: prefixBs + "/sendconsAddr/query",
    method: "post",
    data,
  });
}
//新增地址
export function addSendconsAddr(data) {
  return request({
    url: prefixBs + "/sendconsAddr/add",
    method: "post",
    data,
  });
}
//修改地址
export function editSendconsAddr(data) {
  return request({
    url: prefixBs + "/sendconsAddr/edit",
    method: "post",
    data,
  });
}
//删除地址
export function delSendconsAddr(data) {
  return request({
    url: prefixBs + "/sendconsAddr/delete",
    method: "post",
    data,
  });
}
//根据公司编码获取地址 不分页
export function getListByCoCodeAddress(data) {
  return request({
    url: prefixBs + "/sendconsAddr/getListByCoCode",
    method: "post",
    data,
  });
}

//获取地址
export function getListRegion(data) {
  return request({
    url: prefixBs + "/region/getListRegion",
    method: "post",
    data,
  });
}
//查询客商
export function getBusinessRelList(data) {
  return request({
    url: prefixBs + "/businessRel/query",
    method: "post",
    data,
  });
}
//查询客商详情
export function getBusinessRelDetail(data) {
  return request({
    url: prefixBs + "/businessRel/detail",
    method: "post",
    data,
  });
}
//新增客商
export function addBusinessRel(data) {
  return request({
    url: prefixBs + "/businessRel/add",
    method: "post",
    data,
  });
}
//修改客商
export function editBusinessRel(data) {
  return request({
    url: prefixBs + "/businessRel/edit",
    method: "post",
    data,
  });
}
//删除客商
export function delBusinessRel(data) {
  return request({
    url: prefixBs + "/businessRel/delete",
    method: "post",
    data,
  });
}
//获取计量单位
export function getProductUnitList(data) {
  return request({
    url: prefixBs + "/productUnit/getListAll",
    method: "post",
    data,
  });
}
//获取区域列表
export function getSaleAreaList(data) {
  return request({
    url: prefixBs + "/saleArea/getSaleAreaTreeByCoCode",
    method: "post",
    data,
  });
}

//查询所有企业端未绑定物料 未关联的
export function queryByUnbind(data) {
  return request({
    url: prefixBs + "/product/queryByUnbind",
    method: "post",
    data,
  });
}

// 查询当前平台端物料绑定的企业端物料 已绑定
export function queryByBind(data) {
  return request({
    url: prefixBs + "/product/queryByBind",
    method: "post",
    data,
  });
}
//查询平台端物料
export function getProductListByPlatformPage(data) {
  return request({
    url: prefixBs + "/product/queryByPlatformPage",
    method: "post",
    data,
  });
}

//查询平台端物料
export function getProductListByPlatform(data) {
  return request({
    url: prefixBs + "/product/queryByPlatform",
    method: "post",
    data,
  });
}

// 平台端进行绑定企业端物料 进行绑定的接口
export function productPsnBind(data) {
  return request({
    url: prefixBs + "/product/bind",
    method: "post",
    data,
  });
}

// 平台端进行绑定企业端物料 进行解绑的接口
export function productPsnUnbind(data) {
  return request({
    url: prefixBs + "/product/unbind",
    method: "post",
    data,
  });
}
