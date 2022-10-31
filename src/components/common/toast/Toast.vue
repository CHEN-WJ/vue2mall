<template>
  <Transition name="fade">
    <div class="toast" v-show="isshow">
      {{msg}}
    </div>
  </Transition>
</template>

<script>
export default {
  name: "Toast",
  data () {
    return {
      msg: '',
      isshow: false,
      timer: null
    }
  },
  methods: {
    /**
     * 参数及作用：显示文本， 延时隐藏
     */
    show (msg = '默认值', delay = 2000) {
      this.msg = msg
      this.isshow = true

      //使用定时器，需要注意是否需要清除定时器
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isshow = false
      }, delay);
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  background-color: rgba(0, 0, 0, 0.4);
  color: #fff;
  z-index: 9;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>