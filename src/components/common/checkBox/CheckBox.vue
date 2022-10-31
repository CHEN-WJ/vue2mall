<template>
  <div class="check-box">
    <img src="~assets/img/cart/tick.svg" alt="" class="base"
      :class="{showimg: ischeck}">
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    ischeck: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>

<style scoped>
.base {
  border-radius: 50%;
  border: 2px solid #aaa;
  vertical-align: middle;
}

.showimg {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>