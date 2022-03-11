<template>
  <div id="workbench" class="workbench">
    <div class="workbench__wrapper">
      <div class="workbench__header">
        <Header :title="title" :menu="appMenu" :logo="logo"></Header>
      </div>
      <div class="workbench__main">
        <div class="workbench__aside">
          <Sidebar :data="sidebar" @change="sidebarChange">
            <slot name="sidebar"></slot>
          </Sidebar>
        </div>
        <div class="workbench__content">
          <split-pane :left="left" min="1" resizer-type="line" :resizer-style="{background:'none'}"
            local-key="WB-split-left">
            <template v-slot:left>
              <div class="workbench__split-pane left">
                <slot name="sidebar-components">
                  <component :is="currentComponents" v-bind="currentSidebar" v-on="currentSidebar">
                  </component>
                </slot>
              </div>
            </template>
            <template v-slot:right>
              <div class="workbench__split-pane right" @drop="drop($event)" @dragover.prevent>
                <split-pane :bottom="bottom" min="1" direction="vertical" resizer-type="line"
                  local-key="WB-split-bottom" :resizer-class="bottom<=1 && 'noneBg'"
                  @changeSplit="changeSplit">
                  <template v-slot:top>
                    <Lumino ref="lumino" v-on:lumino:deleted="onWidgetDeletedEvent"
                      v-on:lumino:activated="onWidgetActivatedEvent"
                      v-on:lumino:contextmenu="onWidgetContextmenuEvent" tab-title-prop="tab-title"
                      :height="bottom" :contextmenu="contextmenu">
                      <slot></slot>
                    </Lumino>
                  </template>
                  <template v-slot:bottom>
                    <slot name="bottom-panel"></slot>
                  </template>
                </split-pane>
              </div>
            </template>
          </split-pane>
        </div>
      </div>
      <!-- </div> -->
      <div class="workbench__footer">
        <Footer :footerClass="footerClass" :footerStyle="footerStyle">
          <slot name="footer">
          </slot>
        </Footer>
      </div>

    </div>

  </div>

</template>

<script>
import "@/components";

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
    contextmenu: {
      type: Array,
      default: () => [],
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
          localStorage.getItem("workbench-SP-WB-split-bottom")
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
          localStorage.getItem("workbench-SP-WB-split-left")
        );
        this.left = localHorizontal?.left || 200;
      } else {
        this.left = 1;
      }
    },
    changeSplit(val) {
      this.bottom = val || 200;
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
    onWidgetContextmenuEvent(event) {
      this.$emit("onContextmenu", event);
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
</style>