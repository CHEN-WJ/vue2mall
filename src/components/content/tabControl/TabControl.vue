<template>
  <div class="tab-control">
    <!-- 只改变文字，所以不需要插槽 -->
    <div v-for="(item, index) in title" :key="item" class="tab-control-item"
      :class="{active: index === tabAcitve}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    title: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tabAcitve: 0
    }
  },
  methods: {
    itemClick (index) {
      this.tabAcitve = index
      this.$emit('itemClick', index)
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  height: 2.75rem;
  line-height: 2.75rem;
  background-color: #fff;
}

.tab-control-item {
  flex: 1;
}

.active span {
  border-bottom: 0.1875rem solid var(--color-tint);
  color: var(--color-high-text);
}

.tab-control-item span {
  padding: 0.3125rem;
}
</style>