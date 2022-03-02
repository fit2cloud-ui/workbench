<template>
  <div>
    <div class="operate">
      <span>终端</span>
      <i class="close iconfont icon-chacha" @click="close"></i>
    </div>
    我是终端

  </div>

</template>

<script>
export default {
  name: "Terminal",
  methods: {
    close() {
      this.$emit("close", true);
    },
  },
};
</script>

<style lang="scss" scoped>
.operate {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  margin-bottom: 10px;
  .close {
      cursor: pointer;

  }
}
</style>