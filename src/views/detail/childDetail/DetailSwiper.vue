<template>
  <swiper class="detailSwiper">
    <swiper-item v-for="(item, index) in topImages" :key="index" class="item">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.detailSwiper {
  height: 80vw;
}
</style>