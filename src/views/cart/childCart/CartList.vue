<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :key="index"
        :item-info="item">
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import CartListItem from './CartListItem';

import Scroll from 'components/common/scroll/Scroll'

import { mapGetters } from 'vuex';

export default {
  name: "CartList",
  components: {
    CartListItem,
    Scroll
  },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.content {
  height: 100%;
}
</style>