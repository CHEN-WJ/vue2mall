<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <home-recommend :recommends="recommends"></home-recommend>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue';

import { getHomeMultiData } from 'network/home'

export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend
  },
  data () {
    return {
      // result: null,
      // 最终要的是banner里的list数组，所以这里类型为数组
      banners: [],
      recommends: []
    }
  },
  // 组件创建完毕后就申请数据
  created () {
    getHomeMultiData().then(
      res => {
        // console.log(res);
        // created()的this指向的是当前的组件对象即Home
        // this.result = res
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      }
    )
    //不能在此打印this.result,因为getHomeMultiData是个异步操作
  }
}
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>