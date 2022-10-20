<template>
  <div class="goods-list-item" @click="itemClick">
    <!-- vue的图片监听：@load -->
    <img :src="item.show.img" alt="" @load="itemImgLoad">
    <!-- <img :src="item.show.img" alt=""> -->
    <div class="item-info">
      <p>{{item.title}}</p>
      <span class="price">{{item.price}}</span>
      <span class="cfav">{{item.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    // 图片加载完毕事件
    itemImgLoad () {
      this.$bus.$emit('itemImgLoad')
    },

    //跳转到详情页
    itemClick () {
      const id = this.item.iid
      this.$router.push('/detail/' + id)
    }
  }
}
</script>

<style>
.goods-list-item {
  font-size: 0.75rem;
  width: 48%;
}

.item-info {
  padding: 5px 0;
  text-align: center;
}

.price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.cfav {
  position: relative;
}

.cfav::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

.goods-list-item p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.goods-list-item img {
  width: 100%;
  border-radius: 5px;
}
</style>