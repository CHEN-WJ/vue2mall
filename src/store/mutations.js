import { ADD_COUNT, ADD_TO_CART } from './mutations-types'

export default {
  [ADD_COUNT] (state, payload) {
    //由于在actions中，payload(oldProduct是goodsList的元素的引用，所以这里直接修改payload就等于修改goodsList的元素)
    payload.count++
  },

  [ADD_TO_CART] (state, payload) {
    state.goodsList.push(payload)
  }
}