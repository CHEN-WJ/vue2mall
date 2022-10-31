import { ADD_COUNT, ADD_TO_CART, CHECK_GOODS, CHECK_ALL_GOODS } from './mutations-types'

export default {
  //数量+1
  [ADD_COUNT] (state, payload) {
    //由于在actions中，payload(oldProduct是goodsList的元素的引用，所以这里直接修改payload就等于修改goodsList的元素)
    payload.count++
  },

  //添加新商品
  [ADD_TO_CART] (state, payload) {
    state.goodsList.push(payload)
  },

  //翻转商品的checked选项
  [CHECK_GOODS] (state, payload) {
    let oldProudct = state.goodsList.find(item => item.iid === payload.iid)
    oldProudct.checked = !oldProudct.checked
  },

  //全选
  [CHECK_ALL_GOODS] (state, payload) {
    state.goodsList.forEach(item => item.checked = payload)
  }
}