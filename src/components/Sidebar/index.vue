<template>
  <div class="workbench-sidebar">
    <slot>
      <div class="content">
        <div class="top-bar">
          <sidebar-item :data="topData" @change="change" />
        </div>
        <div class="bottom-bar">
          <sidebar-item :data="bottomData" @change="change" />
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
export default {
  name: "Sidebar",
  components: {
    SidebarItem,
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