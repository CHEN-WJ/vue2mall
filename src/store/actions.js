import { ADD_COUNT, ADD_TO_CART } from './mutations-types'

export default {
  addGoods ({ state, commit }, payload) {
    //判断商品是否存在--方法二
    let oldProduct = state.goodsList.find(item => item.iid === payload.iid)

    //确定count数量 
    if (oldProduct) {
      // oldProduct.count += 1
      commit(ADD_COUNT, oldProduct)

    } else {
      payload.count = 1
      commit(ADD_TO_CART, payload)
    }
  }
}