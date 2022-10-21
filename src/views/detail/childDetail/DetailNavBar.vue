<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="返回">
    </div>
    <div slot="center" class="nav-center">
      <div v-for="(item, index) in titles" class="title"
        :class="{active: currentIndex === index}" @click="itemClick(index)">
        {{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data () {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      currentIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.currentIndex = index
    },
    backClick () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.nav-center {
  display: flex;
  font-size: 0.8125rem;
}

.title {
  flex: 1;
}

.active {
  color: var(--color-tint);
}

.back img {
  margin-top: 0.6875rem;
}
</style>