import request from '@/utils/request'
import { prefixBusiness } from '@/config' //接口前缀的名称 会更改

// 查询短到发卡分页
export function stOrderTemplatequery(data) {
  return request({
    url: prefixBusiness + '/co/stOrderTemplate/query',
    method: 'post',
    data,
  })
}

// 查询短到发卡修改
export function stOrderTemplateupdate(data) {
  return request({
    url: prefixBusiness + '/co/stOrderTemplate/update',
    method: 'post',
    data,
  })
}

// 查询短到发卡删除
export function stOrderTemplatedelete(data) {
  return request({
    url: prefixBusiness + '/co/stOrderTemplate/delete',
    method: 'post',
    data,
  })
}
