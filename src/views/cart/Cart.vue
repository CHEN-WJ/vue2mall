<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list class="cart-list"></cart-list>
    <!-- 结算 -->
    <cart-bottom-bar class="bottom-bar" />
  </div>
</template>

<script>
import CartList from './childCart/CartList'
import CartBottomBar from './childCart/CartBottomBar'

import NavBar from 'components/common/navbar/NavBar'

import { mapGetters } from 'vuex'

export default {
  name: 'Cart',
  components: {
    CartList,
    CartBottomBar,
    NavBar,
  },
  computed: {
    // mapGetters方法一：
    // ...mapGetters(['cartLength'])
    // mapGetters方法二：别名
    ...mapGetters({
      length: 'cartLength'
    })
  }
}
</script>

<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}

.cart-list {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow: hidden;
}

.bottom-bar {
  position: absolute;
  bottom: 49px;
}
</style>