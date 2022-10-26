<template>
  <div class="goods-info" v-if="Object.keys(goodsInfo).length !== 0">
    <!-- <div class="goods-info" v-if="goodsInfo"> -->
    <p>{{goodsInfo.title}}</p>
    <div class="goods-price">
      <span class="new-price">{{goodsInfo.newPrice}} </span>
      <span class="old-price">{{goodsInfo.oldPrice}} </span>
      <span class="discount">{{goodsInfo.discount}}</span>
    </div>
    <div class="goods-other">
      <span>{{goodsInfo.columns[0]}}</span>
      <span>{{goodsInfo.columns[1]}}</span>
      <span>{{goodsInfo.services[goodsInfo.services.length-1].name}}</span>
    </div>
    <div class="info-service">
      <span v-for="index in goodsInfo.services.length-1" :key="index">
        <img :src="goodsInfo.services[index-1].icon" alt="">
        <span>{{goodsInfo.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailGoodsInfo",
  props: {
    goodsInfo: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.goods-info {
  padding: 0.625rem;

  border-bottom: 3px solid #eee;
}

.goods-info p {
  margin-bottom: 0.625rem;
}

.goods-price {
  position: relative;
}

.new-price {
  font-size: 1.5rem;
  color: var(--color-tint);
}

.old-price {
  font-size: 0.8125rem;
  text-decoration: line-through;
}

.discount {
  position: absolute;
  top: 0px;
  margin: 0 2px;
  font-size: 0.75rem;
  background-color: var(--color-tint);
  border-radius: 2.333vw;
  padding: 1px 3px;
  color: #fff;
}

.goods-other {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  line-height: 30px;
  font-size: 13px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
}

.info-service {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 20px 0 10px 0;
}

.info-service img {
  width: 12px;
  vertical-align: middle;
}
</style>