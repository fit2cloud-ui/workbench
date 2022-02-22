<template>
  <div class="header">
    <img :src="logo" alt="" class="logo">
    <div class="menu" ref="menu">
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
        <!-- <div class="menubar-menu-button">
          <i class="iconfont icon-shenglvehao"></i>
        </div> -->
      </div>
    </div>
    <div class="window-title">{{title}}</div>
  </div>
</template>

<script>
import myLogo from "../../assets/logo.png";
export default {
  name: "Header",
  props: {
    logo: {
      type: String,
      default: myLogo,
    },
    title: {
      type: String,
      default: "欢迎使用",
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
.header {
  background-color: #323233;
  width: 100%;
  height: 35px;
  overflow: visible;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .logo {
    margin: 0 15px;
    height: 20px;
  }
  .menu {
    flex-shrink: 1;
    flex-wrap: wrap;
    .menubar {
      .menubar-menu-button {
        display: inline-block;
        padding: 10px 8px;
        box-sizing: border-box;
        position: relative;
        cursor: pointer;
        &:hover {
          background: #141414;
        }
      }
      .open {
        background: #141414;
        .menu-items-content {
          position: absolute;
          top: 30px;
          left: 0;
          z-index: 99;
          background: #141414;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
          padding: 5px 10px;
        }
      }
    }
  }
  .window-title {
    flex: 0 1 auto;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
@media (min-width: 1200px) {
  .window-title {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0px);
  }
}
</style>