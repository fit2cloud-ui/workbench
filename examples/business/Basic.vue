<template>
  <div>
    <workbench ref="workbench" :title="title" :app-menu="menu" :sidebar="sidebar" :logo="myLogo"
      @changeSidebar="changeSidebar" @activated="onWidgetActivatedEvent"
      @deleted="onWidgetDeletedEvent" @drop="drop" :visible-bottom-panel="visibleTerminal"
      @onContextmenu="onWidgetContextmenu" :contextmenu="contextmenu">
      <component v-for="item in helloWorldWidgets" :key="item.id" :id="item.id"
        :is="item.components" :tab-title="item.name" :iconClass="item.iconClass">
      </component>
      <template v-slot:bottom-panel>
        <Terminal @close="closeTerminal" />
      </template>
      <template v-slot:footer>
        <Footer />
      </template>
    </workbench>
  </div>
</template>

<script>
import myLogo from "../assets/logo.png";
import ResourceManage from "../components/ResourceManage";
import Footer from "../components/Footer";
import Terminal from "../components/Terminal";
export default {
  name: "Basic",
  components: {
    Footer,
    Terminal,
  },

  data() {
    return {
      myLogo,
      title: "欢迎使用 JumpServer",
      menu: [
        {
          name: "用法",
          submenu: [
            {
              name: "基本用法",
              click: () => {
                this.$router.push("/");
              },
            },
            {
              name: "自定义用法",
              click: () => {
                this.$router.push("/custom");
              },
            },
          ],
        },
        {
          name: "文件",
          submenu: [
            {
              name: "新建文件",
              hotkey: "Ctrl N",
              click: (data) => {
                console.log(data);
              },
            },
            {
              name: "新建窗口",
              divided: true,
            },
            {
              name: "自动保存",
              isSet: true,
            },
            {
              name: "首选项",
              submenu: [
                {
                  name: "设置",
                  submenu: [
                    {
                      name: "设置1",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "编辑",
        },
        {
          name: "查看",
          submenu: [
            {
              name: "文件",
              hotkey: "Ctrl N",
            },
            {
              name: "窗口",
            },
          ],
        },
        {
          name: "运行",
        },
        {
          name: "终端",
          submenu: [
            {
              name: "新建终端",
              click: () => {
                this.visibleTerminal = true;
              },
            },
            {
              name: "窗口",
            },
          ],
        },
        {
          name: "帮助",
        },
      ],
      sidebar: [
        {
          icon: "iconfont icon-ziyuan",
          name: "资源管理器",
          hotkey: "⇧⌘E",
          components: ResourceManage,
          click: (item) => {
            this.onClicked(item);
          },
          dragstart: (item) => {
            this.dragElement = item;
          },
        },
        {
          icon: "iconfont icon-fangdajing",
          name: "搜索",
          components: ResourceManage,
        },
        {
          icon: "iconfont icon-git-branch",
          name: "源代码管理",
          hotkey: "⌃⇧G",
          components: ResourceManage,
        },
        {
          icon: "iconfont icon-yingyongguanli",
          name: "扩展",
          hotkey: "⇧⌘X",
          components: ResourceManage,
        },
        {
          icon: "iconfont icon-zhanghaoguanli",
          name: "帐户",
          location: "bottom",
          type: "popover",
          submenu: [
            {
              name: "文件",
              hotkey: "Ctrl N",
            },
            {
              name: "窗口",
            },
          ],
        },
        {
          icon: "iconfont icon-shezhi-xianxing",
          name: "管理",
          location: "bottom",
          type: "popover",
          submenu: [
            {
              name: "文件",
              hotkey: "Ctrl N",
            },
            {
              name: "窗口",
              divided: true,
            },
            {
              name: "新建窗口",
            },
          ],
        },
      ],
      dragElement: "",
      widgets: {},
      visibleTerminal: false,

      // 右键菜单
      contextmenu: [
        {
          id: "Cut",
          label: "剪切",
          execute: function () {
            console.log("cut");
          },
          key: "Accel X",
        },
        {
          type: "divided"
        },
        {
          id: "Copy File",
          label: "复制",
          execute: function () {
            console.log("Copy");
          },
        },
      ],
    };
  },
  mounted() {
  },
  computed: {
    helloWorldWidgets() {
      const widgets = [];
      for (const item of Object.values(this.widgets)) {
        widgets.push(item);
      }
      return widgets;
    },
  },
  methods: {
    closeTerminal(bool) {
      if (bool) {
        this.visibleTerminal = false;
      }
    },
    changeSidebar(item) {
      console.log(item);
    },
    drop() {
      this.onClicked(this.dragElement);
    },
    onClicked(item) {
      if (Object.keys(this.widgets).indexOf(item.id) >= 0) {
        this.$refs.workbench.activate(item.id);
      } else {
        this.$set(this.widgets, item.id, item);
      }
      this.dragElement = "";
    },
    onWidgetActivatedEvent(event) {
      console.log(event);
      console.log(`Activated widget ${event.id}`);
    },
    onWidgetDeletedEvent(event) {
      this.$delete(this.widgets, event.id);
      console.log(`Deleted widget ${event.id}`);
    },
    onWidgetContextmenu(id) {
      console.log(`Contextmenu widget ${id}`);
    },
  },
};
</script>
