<template>
  <ul class="workbench-menu-items" id="menu-items-ul">
    <li class="workbench-menu-item" v-for="(item, index) in data" :key="index"
      @click="subMclick($event, item)" :class="item.divided ? 'border-bottom': ''"
      @mouseenter="mouseenter($event, item, index)" @mouseleave="isOpen=''">
      <div class="workbench-menu-item__label">
        <i class="workbench-menu-item__setIcon"
          :style="{visibility: item.isSet?'visible':'hidden'}"></i>{{item.name}}
      </div>
      <div class="workbench-menu-item__right">
        <i class="workbench-menu-item__submenuIcon" v-if="item.submenu"></i>
        <div class="workbench-menu-item__hotkey" v-else-if="item.hotkey">{{item.hotkey}}</div>
        <menu-items v-if="item.submenu && (isOpen===(item.name+index))" :data="item.submenu"
          class="workbench-menu-subItem" />
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
        this.isOpen = item.name + index;
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

</style>