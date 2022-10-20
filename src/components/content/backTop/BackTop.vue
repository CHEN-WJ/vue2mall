<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="回到顶部">
  </div>
</template>

<script>
export default {
  name: "BackTop",

}
</script>

<style scoped>
.back-top {
  position: fixed;
  bottom: 3.125rem;
  right: 0.625rem;
}

.back-top img {
  width: 2.6875rem;
  height: 2.6875rem;
}
</style>