import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'
// 用户管理-获取列表
export function getUsersList(data) {
  const url = '/Admin/user/list/' + data.pageNum + '/' + data.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 用户管理-新增
export function addUsers(params) {
  const url = '/Admin/user/add/'
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'post',
    data: params
  })
}
// 用户管理-修改
export function alterUsers(params) {
  const url = '/Admin/user/update/'
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 用户管理-删除
export function delUsers(params) {
  const url = '/Admin/user/delete/' + params
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}
// 职员管理-获取列表
export function getClerkList(params, query) {
  const url = '/Admin/employee/list/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 职员管理-获取调整列表
export function getTuserAlterList(params, query) {
  const url = '/tuser/tuserAlterList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 职员管理-新增
export function addClerk(params) {
  return request({
    url: '/employee/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 职员管理-调整
export function addAlter(params) {
  return request({
    url: '/tuser/addAlter',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

// 职员管理-修改
export function alterClerk(params) {
  return request({
    url: '/employee/update',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    data: params
  })
}

// 职员管理-获取详情
export function clerkInfo(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('ssrx')
    },
    method: 'get'
  })
}

// 职员管理-获取部门下拉
export function clerkDepartment(params) {
  return request({
    url: '/table/list' + params,
    headers: {
      'authorization': getToken('ssrx')
    },
    method: 'get',
    params
  })
}

// 职员管理-删除
export function delClerk(params) {
  return request({
    url: '/employee/del/' + params,
    headers: {
      'authorization': getToken('ssrx')
    },
    method: 'delete',
  })
}
// 员工管理-获取列表
export function getTuserList(params, query) {
  const url = '/tuser/tuserList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}
// 员工管理-获取列表
export function getTuserBatchList(params, query) {
  const url = '/tuser/tuserBatchList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 员工管理-新增
export function addTuser(params) {
  return request({
    url: '/tuser/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 员工管理-删除
export function deleteTuser(params) {
  return request({
    url: '/tuser/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 字典类别-获取列表
export function getDictTypeList(params, query) {
  const url = '/dictType/dictTypeList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 字典类别-新增
export function addDictType(params) {
  return request({
    url: '/dictType/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 字典类别-删除
export function deleteDictType(params) {
  return request({
    url: '/dictType/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 字典-获取列表
export function getDictList(params, query) {
  const url = '/dict/dictList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 字典-新增
export function addDict(params) {
  return request({
    url: '/dict/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 字典-删除
export function deleteDict(params) {
  return request({
    url: '/dict/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 职务-获取列表
export function getDutyList(params, query) {
  const url = '/duty/dutyList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 职务-新增
export function addDuty(params) {
  return request({
    url: '/duty/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 职务-删除
export function deleteDuty(params) {
  return request({
    url: '/duty/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 组织架构-获取列表
export function getOrganizationsList(params, query) {
  const url = '/organizations/organizationsList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 组织架构-新增
export function addOrganizations(params) {
  return request({
    url: '/organizations/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 组织架构-删除
export function deleteOrganizations(params) {
  return request({
    url: '/organizations/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 删除图片
export function deleteImg(params) {
  return request({
    url: '/file/deleteImg',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 参数表-获取列表
export function getSystemProfileList(params, query) {
  const url = '/systemProfile/systemProfileList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 参数表-修改
export function updateProduction(params) {
  return request({
    url: '/systemProfile/update',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 团队管理-获取列表
export function getTTeamList(params, query) {
  const url = '/tteam/tteamList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 团队管理-新增
export function addTTeam(params) {
  return request({
    url: '/tteam/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 团队管理-删除
export function deleteTTeam(params) {
  return request({
    url: '/tteam/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 合同条款-获取列表
export function getTcontractList(params, query) {
  const url = '/tcontract/tcontractList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 合同条款-新增
export function addTcontract(params) {
  return request({
    url: '/tcontract/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 合同条款-删除
export function deleteTcontract(params) {
  return request({
    url: '/tcontract/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 提成比例设定管理-获取列表
export function getTcommissionList(params, query) {
  const url = '/tcommission/tcommissionList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// 提成比例设定管理-新增
export function addTcommission(params) {
  return request({
    url: '/tcommission/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 提成比例设定管理-删除
export function deleteTcommission(params) {
  return request({
    url: '/tcommission/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// BD名单导入-获取列表
export function getTbonusManagementList(params, query) {
  const url = '/tbonusManagement/tbonusManagementList/' + params.pageNum + '/' + params.pageSize
  return request({
    url: url,
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: query
  })
}

// BD名单导入-新增
export function addTbonusManagement(params) {
  return request({
    url: '/tbonusManagement/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// BD名单导入-删除
export function deleteTbonusManagement(params) {
  return request({
    url: '/tbonusManagement/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}

