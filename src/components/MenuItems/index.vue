<template>
  <ul>
    <li class="menu-item" v-for="(item, index) in data" :key="index"
      @click="subMclick($event, item)" :class="item.divided ? 'border-bottom': ''"
      @mouseenter="mouseenter($event, item, index)" @mouseleave="isOpen=''">
      <div class="menu-label">
        <i class="menu-itemIcon iconfont icon-duigou"
          :style="{visibility: item.isSet?'visible':'hidden'}"></i>{{item.title}}
      </div>
      <div class="menu-right">
        <i class="menu-itemSubmenuIcon iconfont icon-youjiantou" v-if="item.submenu"></i>
        <div class="menu-itemHotkey" v-else-if="item.hotkey">{{item.hotkey}}</div>
        <menu-items v-if="item.submenu && (isOpen===(item.title+index))" :data="item.submenu"
          class="menu-subItem" />
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "MenuItems",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isOpen: "",
    };
  },
  methods: {
    mouseenter(e, item, index) {
      e.stopPropagation();
      if (item?.submenu) {
        this.isOpen = item.title + index;
      }
    },
    subMclick(e, item) {
      if (item?.submenu) {
        e.stopPropagation();
      }
      if (item?.click && typeof item.click === "function")
        return item.click(item);
    },
  },
};
</script>

<style  lang="scss" scoped>
.menu-item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  white-space: nowrap;
  line-height: 25px;
  padding-right: 5px;

  .menu-right {
    position: relative;
  }
  .menu-subItem {
    background: #141414;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
    position: absolute;
    top: -5px;
    left: 20px;
    padding: 5px 10px;
  }
  &:hover {
    background: #2d3234;
  }
  .menu-itemIcon {
    margin-right: 2px;
    margin-left: -3px;
  }
  .menu-itemSubmenuIcon {
    font-size: 13px;
  }
  .menu-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 60px;
  }
  &.border-bottom {
    border-bottom: 1px solid #5f5e5e;
    padding-bottom: 3px;
    margin-bottom: 3px;
  }
}
</style>