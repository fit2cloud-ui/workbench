<template>
  <footer class="workbench-footer" id="workbench.statusbar" :class="footerClass" :style="{...footerStyle}">
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

</style>