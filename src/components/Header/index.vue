<template>
  <div class="workbench-header">
    <div class="logo">
      <img :src="logo" alt=""  v-if="logo">
    </div>
    <div class="workbench-menu" ref="menu">
      <div class="menubar">
        <div class="menubar-menu-button" :class="isOpen===index? 'open' :''"
          v-for="(item, index) in menuList" :key="index" style="visibility: visible;"
          @click="toShow(index)" @mouseover="mouseover(index)">
          <div class="menubar-menu-title"><i class="menu-icon" v-if="item.icon"></i>{{item.name}}
          </div>
          <div class="menu-items-content" v-if="isOpen===index && item.submenu">
            <menu-items :data="item.submenu" />
          </div>
        </div>
      </div>
    </div>
    <div class="window-title">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    logo: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    menu: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    menuList() {
      return this.menu;
    },
  },
  data() {
    return {
      isOpen: "",
    };
  },

  mounted() {
    let that = this;
    document.addEventListener("click", function (e) {
      if (!that.$refs.menu?.contains(e.target)) {
        that.isOpen = "";
      }
    });
  },
  methods: {
    toShow(i) {
      this.isOpen = this.isOpen === i ? "" : i;
    },
    mouseover(i) {
      if (String(this.isOpen)) {
        this.isOpen = i;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>