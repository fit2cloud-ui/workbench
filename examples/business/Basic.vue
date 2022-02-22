<template>
  <div id="app">
    <workbench ref="workbench" :title="title" :app-menu="menu" :sidebar="sidebar"
      @activated="onWidgetActivatedEvent" @deleted="onWidgetDeletedEvent" @drop="drop">
      <component v-for="item in this.helloWorldWidgets" :key="item.id" :id="item.id"
        :is="item.components" :tab-title="item.name">
      </component>
      <div slot="footer">
        <Footer />
      </div>
    </workbench>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import ResourceManage from "../components/ResourceManage";
import Footer from "../components/Footer";
export default {
  name: "Basic",
  components: {
    HelloWorld,
    Footer,
  },

  data() {
    return {
      title: "欢迎使用 JumpServer",
      menu: [
        {
          title: "用法",
          submenu: [
            {
              title: "基本用法",
              click: () => {
                this.$router.push("/");
              },
            },
            {
              title: "自定义用法",
              click: () => {
                this.$router.push("/custom");
              },
            },
          ],
        },
        {
          title: "文件",
          submenu: [
            {
              title: "新建文件",
              hotkey: "Ctrl N",
              click: (data) => {
                console.log(data);
              },
            },
            {
              title: "新建窗口",
              divided: true,
            },
            {
              title: "自动保存",
              isSet: true,
            },
            {
              title: "首选项",
              submenu: [
                {
                  title: "设置",
                  submenu: [
                    {
                      title: "设置1",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          title: "编辑",
        },
        {
          title: "查看",
          submenu: [
            {
              title: "文件",
              hotkey: "Ctrl N",
            },
            {
              title: "窗口",
            },
          ],
        },
        {
          title: "运行",
        },
        {
          title: "终端",
        },
        {
          title: "帮助",
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
              title: "文件",
              hotkey: "Ctrl N",
            },
            {
              title: "窗口",
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
              title: "文件",
              hotkey: "Ctrl N",
            },
            {
              title: "窗口",
              divided: true,
            },
            {
              title: "新建窗口",
            },
          ],
        },
      ],
      dragElement: "",
      widgets: {},
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.onAddClicked();
    // });
  },
  computed: {
    helloWorldWidgets() {
      const widgets = [];
      for (const item of Object.values(this.widgets)) {
        // if (type === HelloWorld.name) {
        // widgets.push(id);
        // }
        widgets.push(item);
      }
      return widgets;
    },
  },
  methods: {
    drop() {
      this.onClicked(this.dragElement);
    },
    onClicked(item) {
      if (Object.keys(this.widgets).indexOf(item.id) >= 0) {
        this.$refs.workbench.activate(item);
      } else {
        this.$set(this.widgets, item.id, item);
      }
      this.dragElement = "";
    },
    onWidgetActivatedEvent(event) {
      console.log(`Activated widget ${event.id}`);
    },
    onWidgetDeletedEvent(event) {
      this.$delete(this.widgets, event.id);
      console.log(`Deleted widget ${event.id}`);
    },
  },
};
</script>
