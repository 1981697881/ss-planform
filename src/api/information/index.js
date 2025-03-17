import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 团队管理-获取列表
export function getTteamList(params, query) {
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
export function addTteam(params) {
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
export function deleteTteam(params) {
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
// 外包项目管理-获取列表
export function getTprojectList(params, query) {
  const url = '/tproject/tprojectList/' + params.pageNum + '/' + params.pageSize
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

// 外包项目管理-新增
export function addTproject(params) {
  return request({
    url: '/tproject/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 外包项目管理-删除
export function deleteTproject(params) {
  return request({
    url: '/tproject/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
/*// 期初数据导入-获取列表
export function getTteamList(params, query) {
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

// 期初数据导入-新增
export function addTteam(params) {
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
// 期初数据导入-删除
export function deleteTteam(params) {
  return request({
    url: '/tteam/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}*/
// 外包奖金方案-获取列表
export function getTbonusList(params, query) {
  const url = '/tbonus/tbonusList/' + params.pageNum + '/' + params.pageSize
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

// 外包奖金方案-新增
export function addTbonus(params) {
  return request({
    url: '/tbonus/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 外包奖金方案-删除
export function deleteTbonus(params) {
  return request({
    url: '/tbonus/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 招聘奖金管理-获取列表
export function getRecruitmentBonusList(params, query) {
  const url = '/recruitmentBonus/recruitmentBonusList/' + params.pageNum + '/' + params.pageSize
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

// 招聘奖金管理-新增
export function addRecruitmentBonus(params) {
  return request({
    url: '/recruitmentBonus/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 招聘奖金管理-计算
export function countRecruitmentBonus(params) {
  return request({
    url: '/recruitmentBonus/count',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 奖金管理-批量计算
export function BatchCount(params) {
  return request({
    url: '/recruitmentBonus/BatchCount',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 招聘奖金管理-删除
export function deleteRecruitmentBonus(params) {
  return request({
    url: '/recruitmentBonus/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
/*// BD奖金管理-获取列表
export function getTteamList(params, query) {
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

// BD奖金管理-新增
export function addTteam(params) {
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
// BD奖金管理-删除
export function deleteTteam(params) {
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
// 团队奖金管理-获取列表
export function getTteamList(params, query) {
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

// 团队奖金管理-新增
export function addTteam(params) {
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
// 团队奖金管理-删除
export function deleteTteam(params) {
  return request({
    url: '/tteam/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}*/
// 外包奖金管理-获取列表
export function getTprojectOutsourcingBonusList(params, query) {
  const url = '/tprojectOutsourcingBonus/tprojectOutsourcingBonusList/' + params.pageNum + '/' + params.pageSize
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

// 外包奖金管理-新增
export function addTprojectOutsourcingBonus(params) {
  return request({
    url: '/tprojectOutsourcingBonus/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 外包奖金管理-删除
export function deleteTprojectOutsourcingBonus(params) {
  return request({
    url: '/tprojectOutsourcingBonus/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 项目外包奖金（外包客服明细模块）-获取列表
export function getToutsourcingCustomerServiceList(params, query) {
  const url = '/toutsourcingCustomerService/toutsourcingCustomerServiceList/' + params.pageNum + '/' + params.pageSize
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

// 项目外包奖金（外包客服明细模块）-新增
export function addToutsourcingCustomerService(params) {
  return request({
    url: '/toutsourcingCustomerService/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 项目外包奖金（外包客服明细模块）-删除
export function deleteToutsourcingCustomerService(params) {
  return request({
    url: '/toutsourcingCustomerService/deleteMany',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 项目外包奖金（外包招聘费用明细模块）-获取列表
export function getToutsourcingRecruitmentFeeList(params, query) {
  const url = '/toutsourcingRecruitmentFee/toutsourcingRecruitmentFeeList/' + params.pageNum + '/' + params.pageSize
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

// 项目外包奖金（外包招聘费用明细模块）-新增
export function addToutsourcingRecruitmentFee(params) {
  return request({
    url: '/toutsourcingRecruitmentFee/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 项目外包奖金（外包招聘费用明细模块）-删除
export function deleteToutsourcingRecruitmentFee(params) {
  return request({
    url: '/toutsourcingRecruitmentFee/deleteMany',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 项目外包奖金（外包项目费用明细模块）-获取列表
export function getToutsourceProjectList(params, query) {
  const url = '/toutsourceProject/toutsourceProjectList/' + params.pageNum + '/' + params.pageSize
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

// 项目外包奖金（外包项目费用明细模块）-新增
export function addToutsourceProject(params) {
  return request({
    url: '/toutsourceProject/batchInsert',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 项目外包奖金（外包项目费用明细模块）-删除
export function deleteToutsourceProject(params) {
  return request({
    url: '/toutsourceProject/deleteMany',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 支付清单-获取列表
export function getPaymentList(params, query) {
  const url = '/paymentList/paymentList/' + params.pageNum + '/' + params.pageSize
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

// 支付清单-新增
export function addPaymentList(params) {
  return request({
    url: '/paymentList/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 支付清单-删除
export function deletePaymentList(params) {
  return request({
    url: '/paymentList/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 招聘奖金费用明细-获取列表
export function getSelectList(params, query) {
  const url = '/expenseDetails/select/' + params.pageNum + '/' + params.pageSize
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

// 招聘奖金费用明细-新增
export function addExpenseDetails(params) {
  return request({
    url: '/expenseDetails/add',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
// 招聘奖金费用明细-删除
export function deleteExpenseDetails(params) {
  return request({
    url: '/expenseDetails/delete',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}// 招聘奖金-更新
export function updateRecruitmentBonus(params) {
  return request({
    url: '/recruitmentBonus/update',
    headers: {
      'authorization': getToken('ssrx'),
      'Content-Type': 'application/json'
    },
    method: 'POST',
    data: params
  })
}
