<template>
  <div class="resource-manage">
    <div class="title">
      <div class="title-label">{{name}}</div>
      <div>
        <i class="iconfont icon-shenglvehao"></i>
      </div>
    </div>
    <Collapase @click="click" @dragstart="dragstart" />

  </div>
</template>

<script>
import Collapase from "./Collapase.vue";
export default {
  name: "ResourceManage",
  props: {
    name: String,
  },
  components: {
    Collapase,
  },
  methods: {
    click(item) {
      this.$emit("click", item);
    },
    dragstart(item) {
      this.$emit("dragstart", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-manage {
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 35px;
    padding-left: 8px;
    padding-right: 8px;
    line-height: 35px;
    .title-label {
      overflow: hidden;
      padding-left: 12px;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>