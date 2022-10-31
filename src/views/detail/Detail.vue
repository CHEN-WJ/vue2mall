<template>
  <div class="detail">
    <detail-nav-bar @itemIndex="itemIndex" class="detail-nav" ref="navBar" />
    <scroll class="detail-scroll" ref="scroll" @scrollPosition="scrollPosition"
      :probe-type="3">
      <detail-swiper :top-images="topImages" />
      <detail-goods-info :goods-info="goodsInfo"></detail-goods-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-detail-info :detail-info="detailInfo" @imgLoad="imgLoad">
      </detail-detail-info>
      <detail-params-info ref="params" :params-info="paramsInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommend" />
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addToCart="addToCart" />
    <back-top @click.native="topClick" v-show="showTop" />
    <!-- <toast :msg="msg" :show="show" class="toast"></toast> -->
  </div>
</template>

<script>
import DetailNavBar from './childDetail/DetailNavBar'
import DetailSwiper from './childDetail/DetailSwiper'
import DetailGoodsInfo from './childDetail/DetailGoodsInfo'
import DetailShopInfo from './childDetail/DetailShopInfo'
import DetailDetailInfo from './childDetail/DetailDetailInfo'
import DetailParamsInfo from './childDetail/DetailParamsInfo'
import DetailCommentInfo from './childDetail/DetailCommentInfo'
import DetailBottomBar from './childDetail/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'

import { getDetail, getRecommend, GoodsInfo, Shop, ParamsInfo } from 'network/detail'
import { mixin, backTopMixin } from 'common/mixins'
import { mapActions } from 'vuex'

// import Toast from 'components/common/toast/Toast'

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailGoodsInfo,
    DetailShopInfo,
    DetailDetailInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goodsInfo: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend: [],
      itemOffsetTops: [],
      // msg: '',
      // show: false
    }
  },
  mixins: [mixin, backTopMixin],
  methods: {
    //映射actions
    ...mapActions(['addGoods']),
    // 图片加载后调用
    imgLoad () {
      //刷新，防止better-scroll问题
      this.$refs.scroll.refresh()

      //保存对应offsetTop数据
      this.itemOffsetTops = []
      this.itemOffsetTops.push(0)
      this.itemOffsetTops.push(this.$refs.params.$el.offsetTop)
      this.itemOffsetTops.push(this.$refs.comment.$el.offsetTop)
      this.itemOffsetTops.push(this.$refs.recommend.$el.offsetTop)
    },

    //选项卡联动之点击事件
    itemIndex (index) {
      this.$refs.scroll.scrollTo(0, -this.itemOffsetTops[index], 100)
    },

    //选项卡联动之滚动距离，从大到小
    scrollPosition (position) {
      for (let i in this.itemOffsetTops) {
        //从大到小比较
        if (-position.y >= this.itemOffsetTops[this.itemOffsetTops.length - 1 - i]) {
          const index = this.$refs.navBar.currentIndex
          //当前位置是否和当前值相等，防止过于频繁赋值
          if (index === this.itemOffsetTops.length - 1 - i) {
            break
          } else {
            this.$refs.navBar.currentIndex = this.itemOffsetTops.length - 1 - i
            break
          }
        }
      }

      // 监听position的y坐标，超过阈值即显示
      this.isShowTop(position)
    },

    //购物车
    addToCart () {
      //1. 获取购物车需要展示的信息
      const cart = {}
      cart.iid = this.iid
      cart.imgURL = this.topImages[0]
      cart.title = this.goodsInfo.title
      cart.desc = this.goodsInfo.desc
      cart.price = this.goodsInfo.realPrice

      //2. 将商品添加到购物车中
      // this.$store.dispatch('addGoods', cart).then(res => {
      //   //添加成功回调
      //   console.log(res);
      // })
      this.addGoods(cart).then(res => {
        //添加成功回调
        this.$toast.show(res, 1500)
      })
    }
  },
  created () {
    // 在组件创建时，就将iid等数据初始化
    this.iid = this.$route.params.iid

    //获取detail数据
    getDetail(this.iid).then(res => {
      const data = res.result
      //获取轮播图数据
      this.topImages = data.itemInfo.topImages

      //获取商品基本信息
      this.goodsInfo = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)

      //获取店铺信息
      this.shop = new Shop(data.shopInfo)

      //获取商品详细数据
      this.detailInfo = data.detailInfo

      //获取参数数据
      this.paramsInfo = new ParamsInfo(data.itemParams.info, data.itemParams.rule)

      //获取评论数据
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0]
      }
    })

    //获取detail-recommend数据
    getRecommend().then(res => {
      this.recommend = res.data.list
    })
  },
  destroyed () {
    //销毁监听itemImgListener函数的bus事件
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

/* .detail-scroll {
  height: calc(100% - 44px);
} */

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.detail-scroll {
  /* position: relative; */
  /* top: 0; */
  position: absolute;
  top: 44px;
  bottom: 58px;
  left: 0;
  right: 0;
}

.bottom-bar {
  position: absolute;
  bottom: 0;
}
</style>