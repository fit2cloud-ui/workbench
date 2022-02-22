<template>
  <ul class="siderbar-item-container">
    <template v-for="(item, index) in data">
      <popper v-if="item.type==='popover'" trigger="clickToOpen" :options="{ placement: 'right' }"
        :key="index">
        <div class="sidebar-popover">
          <menu-items :data="item.submenu" />
        </div>
        <li class="action-item" slot="reference" :class="getClassName(item, index)" draggable="true"
          @click="handleClick(item, index)">
          <a :title="getName(item)">
            <i :class="item.icon"></i></a>

        </li>
      </popper>
      <li v-else :key="index" class="action-item" slot="reference"
        :class="getClassName(item, index)" draggable="true" @click="handleClick(item, index)">

        <a :title="getName(item)">
          <i :class="item.icon"></i></a>

      </li>
    </template>

  </ul>
</template>

<script>
import Popper from "vue-popperjs";
import "vue-popperjs/dist/vue-popper.css";
export default {
  name: "SiderbarItem",
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
      this.isCheck = this.isCheck === index ? "" : index;
      this.$emit("change", String(this.isCheck) ? item : "");
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
.siderbar-item-container {
  .action-item {
    text-align: center;
    // height: 48px;
    // width: 48px;
    line-height: 48px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      color: #ffffff;
    }
    &.checked {
      color: #ffffff;
      border-left: 2px solid #ffffff;
    }
    &.popover {
      color: #ffffff;
    }
  }
  .iconfont {
    font-size: 24px !important;
  }
  .sidebar-popover {
    background: #141414;
    box-shadow: 0 0 2px rgb(0 0 0 / 80%);
    padding: 5px 10px;
    color: #ffffff;
    margin-left: 40px;
    z-index: 999;
  }
}
</style>