import request from '@/utils/request'
import { prefixBs } from '@/config' //接口前缀的名称 会更改

export function getMenuTreeBySystemCode(data) {
  return request({
    url: prefixBs + '/user/getMenuTreeBySystemCode',
    method: 'post',
    data,
  })
}

export function MenuTreeBySystemCode(data) {
  return request({
    url: prefixBs + '/menu/getMenuTreeByRoleCode',
    method: 'post',
    data,
  })
}
