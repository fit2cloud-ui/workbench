<template>
  <ul class="workbench-sidebar-item">
    <template v-for="(item, index) in data">
      <popper v-if="item.type==='popover'" trigger="clickToOpen" :options="{ placement: 'right' }"
        :key="index">
        <div class="workbench-sidebar-item__popover">
          <menu-items :data="item.submenu" />
        </div>
        <li class="action-item" slot="reference" :class="getClassName(item, index)" draggable="true"
          @click="handleClick(item, index)">
          <a :title="getName(item)">
            <i :class="item.icon" class="workbench-sidebar-item__icon"></i></a>

        </li>
      </popper>
      <li v-else :key="index" class="action-item" slot="reference"
        :class="getClassName(item, index)" draggable="true" @click="handleClick(item, index)">

        <a :title="getName(item)">
          <i :class="item.icon" class="workbench-sidebar-item__icon"></i></a>

      </li>
    </template>

  </ul>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
export default {
  name: "SidebarItem",
  components: {
    Popper,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isCheck: "",
      isPopover: false,
      popoverStyle: Object,
      popoverContent: [],
      popoverName: "",
    };
  },
  methods: {
    handleClick(item, index) {
      if (item.type !== "popover") {
        this.isCheck = this.isCheck === index ? "" : index;
        this.$emit("change", String(this.isCheck) ? item : "");
      } else {
        this.$emit("change", item);
      }
    },
    getClassName(item, index) {
      if (this.isCheck === index) {
        return item.type === "popover" ? "" : "checked";
      } else {
        return "";
      }
    },
    getName(item) {
      return item?.name + (item?.hotkey ? `(${item.hotkey})` : "");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>