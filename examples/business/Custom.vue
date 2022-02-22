<template>
  <div id="app">
    <workbench ref="workbench" :title="title" :app-menu="menu" @activated="onWidgetActivatedEvent"
      @deleted="onWidgetDeletedEvent" @drop="drop" :footer-style="{
        background: '#363636'
      }">
      <!-- 侧边栏 -->
      <div slot="sidebar" class="sidebar">
        <el-button icon="el-icon-search" circle size="mini" type="primary" @click="sidebarClick">
        </el-button>
      </div>
      <div slot="sidebar-components">
        <component :is="customSidebarCon" :name="'资源管理器'" @click="treeClick"></component>
      </div>
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
  name: "Custom",
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
      customSidebarCon: "",
      widgets: {},
    };
  },
  mounted() {},
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
    sidebarClick() {
      this.customSidebarCon = ResourceManage;
    },
    drop() {
      this.onClicked(this.dragElement);
    },
    treeClick(item) {
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
<style lang="scss" scoped>
#app {
  .sidebar {
    text-align: center;
    padding: 15px 0;
  }
}
</style>