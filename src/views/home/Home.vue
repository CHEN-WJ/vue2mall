<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :title="['流行','新款','精选']" @itemClick="itemClick"
      ref="tabControl1" v-show="isShowTabControl" class="tab-control">
    </tab-control>

    <scroll class="content" ref="scroll" :probe-type="3"
      @scrollPosition="scrollPosition" :pull-up-load="true"
      @pullingUp="pullingUp">
      <!-- 监听图片是否加载完成并使用refresh: :observe-image="true" :debounce-time="200" -->
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommends="recommends"></home-recommend>
      <home-feature></home-feature>
      <tab-control :title="['流行','新款','精选']" @itemClick="itemClick"
        ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="topClick" v-show="showTop" />
  </div>
</template>

<script>
// import规范
import HomeSwiper from './childComps/HomeSwiper.vue'
import HomeRecommend from './childComps/HomeRecommend.vue';
import HomeFeature from './childComps/HomeFeature.vue'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultiData, getHomeGoods } from 'network/home'
import { debounce } from 'common/util'

export default {
  name: 'Home',
  components: {
    // 顺序规范
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
  },
  data () {
    return {
      // result: null,
      // 最终要的是banner里的list数组，所以这里类型为数组
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      defaultType: 'pop',
      showTop: false,
      isTabControlTop: false,
      tabControlTop: 0,
      isShowTabControl: false,
      saveY: 0
    }
  },
  computed: {
    showGoods () {
      return this.goods[this.defaultType].list
    }
  },
  // 组件创建完毕后就申请数据
  created () {
    //获取轮播图，推荐等数据
    this.getHomeMultiData()
    //获取goods数据,根据type和page获取对应数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    //对refresh()进行防抖
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    //监听事件总线 -- 存在缺陷不建议使用
    this.$bus.$on('itemImgLoad', () => {
      refresh()
    })
  },
  updated () {
    //获取tabControl的offsetTop的值
    if (!this.isTabControlTop) {
      this.tabControlTop = this.$refs.tabControl2.$el.offsetTop
      this.isTabControlTop = true
    }
  },
  activated () {
    // 经验之谈：加个刷新，否则可能出现问题
    this.$refs.scroll.refresh()
    //进去时滚动到saveY位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated () {
    //记录离开时的位置
    this.saveY = this.$refs.scroll.getSaveY()
  },
  beforeDestroy () {
    this.$bus.$off('itemImgLoad')
  },
  methods: {
    /**
     * 监听事件
     */
    //选项卡tab-control切换
    itemClick (index) {
      switch (index) {
        case 0:
          this.defaultType = 'pop'
          break
        case 1:
          this.defaultType = 'new'
          break
        case 2:
          this.defaultType = 'sell'
          break
      }
      this.$refs.tabControl1.tabAcitve = index
      this.$refs.tabControl2.tabAcitve = index
    },
    //返回顶部
    topClick () {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },
    //监听滚动
    scrollPosition (position) {
      // 监听backTop，获取position的y坐标
      this.showTop = -position.y > 1000

      // 监听tabControl
      this.isShowTabControl = -position.y > this.tabControlTop
    },
    //上拉加载
    pullingUp () {
      this.getHomeGoods(this.defaultType)
      this.$refs.scroll.refresh()
    },

    /*
    *网络请求
    */
    //获取轮播图，推荐等数据
    getHomeMultiData () {
      getHomeMultiData().then(
        res => {
          // console.log(res);
          // created()的this指向的是当前的组件对象即Home
          // this.result = res
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        }
        //不能在此打印this.result,因为getHomeMultiData是个异步操作
      )
    },
    //获取goods数据,根据type和page获取对应数据
    getHomeGoods (type) {
      //不要将参数写死，因为之后上拉加载还用复用
      const page = this.goods[type].page + 1
      //注意访问对象
      // console.log(this.goods[type]); // goods.sell
      // console.log(this.goods.type); // undefined
      getHomeGoods(type, page).then(
        res => {
          // console.log(res);
          // push的特殊语法
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //如果是上拉加载，那么需要finish
          this.$refs.scroll.pullingUpFinish()

        }
      )
    }
  }
}
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}

.home-nav {
  position: relative;
  z-index: 9;
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  position: absolute;
  top: 2.75rem;
  bottom: 3.0625rem;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>