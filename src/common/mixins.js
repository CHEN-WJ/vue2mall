import { debounce } from 'common/util'
import BackTop from 'components/content/backTop/BackTop'

/**
 * 作用：图片监听并防抖
 */
export const mixin = {
  data () {
    itemImgListener: null
  },
  mounted () {
    //对refresh()进行防抖
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    //监听事件总线 -- 存在缺陷不建议使用
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  },
}

/**
 * 作用：返回顶部
 * 前提：需要在组件实时计算滚动距离的函数中，添加isShowTop(position)方法
 */
export const backTopMixin = {
  components: {
    BackTop
  },
  data () {
    return {
      showTop: false,
    }
  },
  methods: {
    //返回顶部
    topClick () {
      this.$refs.scroll.scrollTo(0, 0, 300)
    },

    // 监听position的y坐标，超过阈值即显示
    isShowTop (position) {
      this.showTop = -position.y > 1000
    }
  }
}