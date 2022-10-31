export default {
  //获取商品列表的长度
  cartLength (state) {
    return state.goodsList.length
  },

  // 获取商品列表
  cartList (state) {
    return state.goodsList
  }
}