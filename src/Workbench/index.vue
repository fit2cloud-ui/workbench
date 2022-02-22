<template>

  <div id="workbench" class="workbench">
    <div class="grid-view">
      <div class="split-view-container">
        <div class="split-view-view top">
          <Header :title="title" :menu="appMenu" :logo="logo"></Header>
        </div>
        <div class="split-view-view" style="top: 35px">
          <div class="split-view-container">
            <div class="split-view-view">
              <Sidebar :data="sidebar" @change="sidebarChange">
                <slot name="sidebar">
                </slot>
                <slot name="sidebar-bottom">
                </slot>
              </Sidebar>
            </div>
            <div class="main">
              <split-pane :left="left" min="1" resizer-type="line"
                :resizer-style="{background:'none'}" local-key="workbench-split">
                <div slot="left" class="pane left" v-if="currentComponents">
                  <slot name="sidebar-component">
                    <component :is="currentComponents" v-bind="currentSidebar"
                      v-on="currentSidebar"></component>
                  </slot>
                </div>
                <div slot="right" class="pane right" @drop="drop($event)" @dragover.prevent>
                  <Lumino ref="lumino" v-on:lumino:deleted="onWidgetDeletedEvent"
                    v-on:lumino:activated="onWidgetActivatedEvent" tab-title-prop="tab-title">
                    <slot></slot>
                  </Lumino>
                </div>
              </split-pane>
            </div>
          </div>
        </div>
        <div class="split-view-view bottom">
          <Footer :footerClass="footerClass" :footerStyle="footerStyle">
            <slot name="footer">
            </slot>
          </Footer>
        </div>

      </div>

    </div>

  </div>

</template>

<script>
import "@/styles/index.scss";
import "@/components";

/* ions */
import "@/assets/iconfont/iconfont.css";

import "@lumino/default-theme/style/index.css";
export default {
  name: "Workbench",
  props: {
    title: String,
    appMenu: {
      type: Array,
      default: () => [],
    },
    logo: String,
    sidebar: {
      type: Array,
      default: () => [],
    },
    footerClass: String,
    footerStyle: Object,
  },

  data() {
    return {
      currentComponents: "",
      currentSidebar: "",
      widgets: {},
      left: 1,
    };
  },
  computed: {},
  watch: {},
  methods: {
    sidebarChange(item) {
      if (item.type !== "popover") {
        this.currentComponents = item?.components || "";
        this.currentSidebar = item || "";
        if (!this.currentComponents) {
          this.left = 1;
        } else {
          this.left = localStorage.getItem("Fu-SP-workbench-split") || 200;
        }
      }

      this.$emit("changeSidebar");
    },
    onWidgetActivatedEvent(event) {
      this.$emit("activated", event);
    },
    onWidgetDeletedEvent(event) {
      this.$emit("deleted", event);
    },
    drop(event) {
      this.$emit("drop", event);
    },
    activate(item){
      const {id, name} = item
      this.$refs.lumino.activateWidget(id, name)
    }
  },
};
</script>

<style lang="scss" scoped>
.workbench {
  color: #cccccc;
  font-size: 13px;
  line-height: 1.4em;
  height: 100%;
  .grid-view {
    overflow: hidden;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .split-view-container {
    height: 100%;
    position: relative;
    width: 100%;
    .split-view-view {
      position: absolute;
      white-space: normal;
      &.top {
        top: 0;
        width: 100%;
      }
      &.bottom {
        bottom: 0;
        width: 100%;
      }
    }
  }
  .main {
    height: calc(100vh - 57px);
    width: calc(100vw - 48px);
    margin-left: 48px;
    .pane {
      height: 100%;
    }
    .left {
      background-color: #252526;
    }
    .right {
      width: 100%;
    }
  }
}
</style>