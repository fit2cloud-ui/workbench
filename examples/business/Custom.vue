<template>
  <div id="custom">
    <workbench ref="workbench" :title="title" :app-menu="menu" :logo="myLogo"
      @activated="onWidgetActivatedEvent" @deleted="onWidgetDeletedEvent" @drop="drop"
      :footer-style="{
        background: '#0070c8'
      }">
      <!-- 侧边栏 -->
      <template v-slot:sidebar class="sidebar">
        <el-button icon="el-icon-search" circle size="mini" type="primary" @click="sidebarClick">
        </el-button>
      </template>
      <template v-slot:sidebar-components>
        <component :is="customSidebarCon" :name="'资源管理器'" @click="treeClick"></component>
      </template>
      <component v-for="item in this.helloWorldWidgets" :key="item.id" :id="item.id"
        :is="item.components" :tab-title="item.name">
      </component>
      <template v-slot:footer>
        <Footer />
      </template>
    </workbench>
  </div>
</template>

<script>
import myLogo from "../assets/logo.png";
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
        },
        {
          name: "帮助",
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
#custom {
  .sidebar {
    text-align: center;
    padding: 15px 0;
  }
}
</style>