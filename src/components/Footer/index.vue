<template>
  <footer class="statusbar" id="workbench.statusbar" :class="footerClass" :style="{...footerStyle}">
    <slot></slot>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    footerClass: String,
    footerStyle: Object,
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.statusbar {
  box-sizing: border-box;
  cursor: default;
  font-size: 12px;
  height: 22px;
  line-height: 22px;
  overflow: visible;
  width: 100%;
  background-color: #007acc;
  color: #ffffff;
  font-weight: 800;
}
</style>