import request from '@/utils/request'
import {
  getToken
} from '@/utils/auth'

// 报表管理-招聘,BD,团队奖金汇总表
export function recruitmentBonus(params, query) {
  const url = '/summary/recruitmentBonus/' + params.pageNum + '/' + params.pageSize
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

// 报表管理-外包奖金汇总表
export function tprojectOutsourcingBonus(params, query) {
  const url = '/summary/tprojectOutsourcingBonus/' + params.pageNum + '/' + params.pageSize
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

