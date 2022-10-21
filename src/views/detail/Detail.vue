<template>
  <div class="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
import DetailNavBar from './childDetail/DetailNavBar'
import DetailSwiper from './childDetail/DetailSwiper'

import { getDetail } from 'network/detail'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper
  },
  data () {
    return {
      iid: null,
      topImages: []
    }
  },
  created () {
    // 在组件创建时，就将iid等数据初始化
    this.iid = this.$route.params.iid

    //获取数据
    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>
</style>