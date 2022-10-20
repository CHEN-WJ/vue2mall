// 封装的意义：实现请求与逻辑解耦
import { request } from 'network/request'

//获取轮播图，推荐等数据
export function getHomeMultiData () {
  return request({
    url: '/home/multidata'
  })
}

//获取goods数据,根据type和page获取对应数据
export function getHomeGoods (type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}