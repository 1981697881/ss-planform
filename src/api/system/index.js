import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
// 用户菜单权限
export function getSysAuth(params) {
  return request({
    url: '/sysUser/getSysAuth?userId=' + params,
    headers: {
      'authorization': getToken('hlrx')
    },
    method: 'POST'
  })
}
// 用户仓库权限
export function getUserStockAuth(params) {
  return request({
    url: '/sysUser/getUserStockAuth?userId=' + params,
    headers: {
      'authorization': getToken('hlrx')
    },
    method: 'POST'
  })
}// 用户仓库权限
export function sysUserEdit(params) {
  return request({
    url: '/sysUser/sysUserEdit?id=' + params,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
}
// 用户权限管理-新增
export function addUsers(params) {
  const url = '/sysUser/sysUserSave'
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 用户权限管理-保存菜单权限
export function sysUserSave(params) {
  const url = '/sysUser/sysAuthSave'
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}// 用户权限管理-保存仓库权限
export function userStockSave(params) {
  const url = '/sysUser/userStockSave'
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 用户权限管理-获取列表
export function getUsersList(data) {
  const url = '/sysUser/getSysUserAll'
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    params: data
  })
}// 用户权限管理-获取职员列表
export function getK3User(data) {
  const url = '/sysUser/getK3User'
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: data
  })
}

// 用户权限管理-修改
export function alterUsers(params) {
  const url = '/Admin/user/update/'
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 用户权限管理-删除
export function delUsers(params) {
  const url = '/sysUser/sysUserDel?id=' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户权限管理-禁用
export function disableUsers(params) {
  return request({
   url: '/table/list',
    headers: {
      'authorization': getToken('hlrx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-启用
export function enableUsers(params) {
  return request({
   url: '/table/list',
    headers: {
      'authorization': getToken('hlrx')
    },
    method: 'get',
    params
  })
}
// 用户管理-获取详情信息
export function getUsersInfo(params) {
  const url = '/Admin/user/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('hlrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 权限按钮-查找
export function getByUserAndPrId(params) {
  return request({
   url: '/sys-menu/getByUserAndPrId/' + params,
    headers: {
      'authorization': getToken('hlrx')
    },
    method: 'get'
  })
}
// 用户权限管理-职员下拉
export function getClerk(params) {
  return request({
   url: '/table/list',
    headers: {
      'authorization': getToken('hlrx')
    },
    method: 'get',
    params
  })
}
// 用户权限管理-获取菜单树
export function getMenuList(params) {
  return request({
   url: '/sys-menu/getSysMenuTree',
    headers: {
      'authorization': getToken('hlrx')
    },
    method: 'get',
  })
}
