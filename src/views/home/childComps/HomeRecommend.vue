<template>
  <div class="recommend">
    <div v-for="item in recommends" :key="item.title" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style>
.recommend {
  display: flex;
}

.recommend-item {
  flex: 1;
  text-align: center;
  font-size: 1rem;
  padding: 0.625rem 0 1.25rem;
  border-bottom: 0.625rem solid #eee;
}

.recommend-item img {
  width: 85%;
  margin-bottom: 5px;
}
</style>