// 封装的意义：实现请求与逻辑解耦
import { request } from 'network/request'

export function getHomeMultiData () {
  return request({
    url: '/home/multidata'
  })
}