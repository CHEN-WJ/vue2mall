<template>
  <div class="detail">{{iid}}</div>
</template>

<script>
export default {
  name: "Detail",
  data () {
    return {
      iid: null
    }
  },
  created () {
    // 在组件创建时，就将iid等数据初始化
    this.iid = this.$route.params.iid
  },
  destroyed () {
    console.log('destroyed');
  }
}
</script>

<style scoped>
</style>