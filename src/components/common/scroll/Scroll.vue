<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import ObserveDOM from '@better-scroll/observe-dom'
import ObserveImage from '@better-scroll/observe-image'

BScroll.use(Pullup)
BScroll.use(ObserveDOM)
BScroll.use(ObserveImage)

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    },
    // // 监听图片是否加载完成并使用refresh
    // observeImage: {
    //   type: Boolean,
    //   default: false
    // },
    // debounceTime: {
    //   type: Number,
    //   default: 100 // ms
    // }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    //初始化scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    // // 监听图片是否加载完成并使用refresh
    // // 开启 observe-image 插件
    // if (this.observeImage) {
    //   this.$set(this.scroll.options, 'observeImage', { debounceTime: this.debounceTime })
    // }

    // 监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        this.$emit('scrollPosition', position)
      })
    }
    //监听上拉加载
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
        // 需要等home请求数据完毕再finish，所以不再这里finish
        // this.scroll.finishPullUp()
      })
    }
  },
  methods: {
    //滚动到指定位置
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    //请求完数据，pullingUp需要finish
    pullingUpFinish () {
      this.scroll && this.scroll.finishPullUp()
    },
    //更新DOM结构后刷新
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    //记录scroll当前y坐标
    getSaveY () {
      return this.scroll ? this.scroll.y : 0
    }
  }

}
</script>

<style scoped>
</style>