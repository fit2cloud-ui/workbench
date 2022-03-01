<template>
  <div class="workbench-sidebar">
    <slot>
      <div class="content">
        <div class="top-bar">
          <siderbar-item :data="topData" @change="change" />
        </div>
        <div class="bottom-bar">
          <siderbar-item :data="bottomData" @change="change" />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import SiderbarItem from "./SiderbarItem";
export default {
  name: "Sidebar",
  components: {
    SiderbarItem,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    topData() {
      return this.data.filter((item) => item?.location !== "bottom");
    },
    bottomData() {
      return this.data.filter((item) => item?.location === "bottom");
    },
  },
  data() {
    return {};
  },
  methods: {
    change(item) {
      this.$emit("change", item);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>