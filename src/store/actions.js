import { ADD_COUNT, ADD_TO_CART } from './mutations-types'

export default {
  addGoods ({ state, commit }, payload) {
    return new Promise((resolve, reject) => {
      //判断商品是否存在--方法二
      let oldProduct = state.goodsList.find(item => item.iid === payload.iid)

      //确定count数量 
      if (oldProduct) {
        // oldProduct.count += 1
        commit(ADD_COUNT, oldProduct)
        resolve('商品数量+1')
      } else {
        payload.checked = true
        payload.count = 1
        commit(ADD_TO_CART, payload)
        resolve('添加新的商品')
      }
    })
  }
}