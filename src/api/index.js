import { service } from 'boot/axios'
// 获取布局配置
// INDEX查询首页，COMPANY_INTRODUCE查询公司介绍
export function searchLayoutInfo (layoutKey) {
  return service({
    url: '/api/layout/searchLayoutInfo',
    method: 'get',
    params: {
      layoutKey
    }
  })
}
// 保存客户提交信息
export function saveCustomerInfo (params) {
  return service({
    url: '/api/layout/saveCustomerInfo',
    method: 'post',
    params: { ...params }
  })
}
// 获取新闻列表
export function searchNewsList (params) {
  return service({
    url: '/api/layout/searchNewsList',
    method: 'get',
    params: {
      ...params
    }
  })
}
