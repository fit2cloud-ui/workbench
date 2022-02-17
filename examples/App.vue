<template>
  <div id="app">
    <workbench :title="title" :app-menu="menu" :sidebar="sidebar"
      @activated="onWidgetActivatedEvent" @deleted="onWidgetDeletedEvent" @drop="drop">
      <HelloWorld v-for="id of this.helloWorldWidgets" :key="id" :id="id">
      </HelloWorld>
      <div slot="footer">
        <Footer />
      </div>
    </workbench>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import ResourceManage from "./components/ResourceManage";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: {
    HelloWorld,
    Footer,
  },

  data() {
    return {
      title: "欢迎使用 JumpServer",
      menu: [
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
        },
        {
          title: "转到",
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
            console.log(item);
            this.onAddHelloWorldButtonClicked(item);
          },
          dragstart: (item)=> {
            this.dragElement = item

          }
        },
        {
          icon: "iconfont icon-fangdajing",
          name: "搜索",
        },
        {
          icon: "iconfont icon-git-branch",
          name: "源代码管理",
          hotkey: "⌃⇧G",
        },
        {
          icon: "iconfont icon-yingyongguanli",
          name: "扩展",
          hotkey: "⇧⌘X",
        },
        {
          icon: "iconfont icon-zhanghaoguanli",
          name: "帐户",
          location: "bottom",
        },
        {
          icon: "iconfont icon-shezhi-xianxing",
          name: "管理",
          location: "bottom",
        },
      ],
      dragElement: "",
      widgets: {},
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.onAddHelloWorldButtonClicked();
    // });
  },
  computed: {
    helloWorldWidgets() {
      const widgets = [];
      for (const [id, type] of Object.entries(this.widgets)) {
        if (type === HelloWorld.name) {
          widgets.push(id);
        }
      }
      return widgets;
    },
  },
  methods: {
    drop() {
      this.onAddHelloWorldButtonClicked(this.dragElement)
    },
    onAddHelloWorldButtonClicked(item) {
      const id = `${new Date().getTime()}`;
      // eslint-disable-next-line no-console
      console.log(`Adding new widget ${item.name}, ID ${id}`);
      this.$set(this.widgets, id, item.name);
      console.log(this.widgets);
      this.dragElement = ""
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
