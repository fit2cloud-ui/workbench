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
              </Sidebar>

            </div>
            <div class="main">
              <split-pane :left="left" min="1" resizer-type="line"
                :resizer-style="{background:'none'}" local-key="WB-split-left">
                <div slot="left" class="pane left">
                  <slot name="sidebar-components">
                    <component :is="currentComponents" v-bind="currentSidebar"
                      v-on="currentSidebar"></component>
                  </slot>
                </div>
                <div slot="right" class="pane right" @drop="drop($event)" @dragover.prevent>
                  <split-pane :bottom="bottom" min="1" direction="vertical" resizer-type="line"
                    local-key="WB-split-bottom"
                    :resizer-style="{background:'rgba(128, 128, 128, 0.35)'}">
                    <div slot="top">
                      <Lumino ref="lumino" v-on:lumino:deleted="onWidgetDeletedEvent"
                        v-on:lumino:activated="onWidgetActivatedEvent" tab-title-prop="tab-title"
                        :height="bottom">
                        <slot></slot>
                      </Lumino>
                    </div>
                    <div slot="bottom">
                      <slot name="bottom-panel"></slot>
                    </div>
                  </split-pane>
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
/* ions */
import "@/assets/iconfont/iconfont.css";
import "@/components";
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
    visibleBottomPanel: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      currentComponents: "",
      currentSidebar: "",
      widgets: {},
      left: 1,
      bottom: 1,
    };
  },
  watch: {
    visibleBottomPanel(val) {
      if (val) {
        const localVertical = JSON.parse(
          localStorage.getItem("Fu-SP-WB-split-bottom")
        );
        this.bottom = localVertical?.bottom || 200;
      } else {
        this.bottom = 1;
      }
    },
  },
  computed: {},
  updated() {
    this.isShowLeft();
  },
  methods: {
    isShowLeft() {
      if (this.$slots["sidebar-components"] || this.currentComponents) {
        const localHorizontal = JSON.parse(
          localStorage.getItem("Fu-SP-WB-split-left")
        );
        this.left = localHorizontal?.left || 200;
      } else {
        this.left = 1;
      }
    },
    sidebarChange(item) {
      if (item.type !== "popover") {
        this.currentComponents = item?.components || "";
        this.currentSidebar = item || "";
        this.isShowLeft();
      }

      this.$emit("changeSidebar", item);
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
    activate(id) {
      this.$refs.lumino.activateWidget(id);
    },
  },
};
</script>

<style lang="scss" scoped>
#workbench {
  color: #cccccc;
  font-size: 13px;
  line-height: 1.4em;
  height: 100vh;
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