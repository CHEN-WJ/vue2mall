<template>
  <div class="bottom-bar">
    <!-- 全选 -->
    <div class="checkall">
      <check-box class="checkbox" :ischeck="isCheck"
        @click.native="checkAllClick"></check-box>
      <span>全选</span>
    </div>
    <!-- 合计 -->
    <div>
      合计：￥{{totalPrice}}
    </div>
    <!-- 结算 -->
    <div class="calculate" @click="calClick">
      去计算({{calculate}})
    </div>
  </div>
</template>

<script>
import CheckBox from '@/components/common/checkBox/CheckBox.vue';
import { CHECK_ALL_GOODS } from 'store/mutations-types.js'

import { mapGetters } from 'vuex';

export default {
  name: "CartBottomBar",
  components: {
    CheckBox
  },
  computed: {
    //商品列表
    ...mapGetters(['cartList']),
    //总价格
    totalPrice () {
      let checkGoods = this.cartList.filter(item => item.checked === true)
      let totalPrice = 0
      if (checkGoods.length) {
        totalPrice = checkGoods.reduce((totalPrice, item) => totalPrice + item.count * item.price, 0).toFixed(2)
      }
      return totalPrice
    },
    //选中商品种类数
    calculate () {
      return this.cartList.filter(item => item.checked === true).length
    },
    //商品是否全选中
    isCheck () {
      //检测是否有checked为false
      return this.cartList.length ? this.cartList.every(item => item.checked) : false
    }
  },
  methods: {
    checkAllClick () {
      // if (this.isCheck) {
      //   this.$store.commit(CHECK_ALL_GOODS, false)
      // } else {
      //   this.$store.commit(CHECK_ALL_GOODS, true)
      // }
      this.$store.commit(CHECK_ALL_GOODS, !this.isCheck)
    },
    calClick () {
      if (!this.calculate) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  height: 40px;
  width: 100%;
  background-color: #eee;
  align-items: center;
  justify-content: space-between;
}
.checkall {
  display: flex;
}

.checkbox {
  padding: 0 5px 0 10px;
}

.calculate {
  background-color: #ff0000;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  color: #fff;
}
</style>