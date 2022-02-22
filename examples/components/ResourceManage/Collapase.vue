<template>
  <div class="collapse">
    <div class="collapse-item" v-for="(item, index) in collapseList" :key="index"
      @click="handleExpanded(index)">
      <div class="pane-header" draggable="true"
        :style="index===0 && 'border-top: none !important;'">
        <i class="icon-expanded iconfont icon-youjiantou"></i>
        <h3 class="title">{{item.title}}</h3>
      </div>
      <div class="pane-content">
        <el-tree class="tree" :data="data" :props="defaultProps" @node-click="handleNodeClick"
          draggable @node-drag-start="handleDragStart" :highlight-current="true">
        </el-tree>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "Collapase",
  data() {
    return {
      collapseList: [
        {
          title: "打开的编辑器",
        },
        // {
        //   title: "文件",
        // },
        // {
        //   title: "大纲",
        // },
      ],
      isExpanded: 0,
      data: [
        {
          name: "一级 1",
          children: [
            {
              name: "二级 1-1",
              children: [
                {
                  id: "1-1-1",
                  name: "三级 1-1-1",
                  components: "HelloWorld",
                },
              ],
            },
          ],
        },
        {
          name: "一级 2",
          children: [
            {
              id: "2-1",
              name: "二级 2-1",
              components: "HelloWorld",
            },
            {
              id: "2-2",
              name: "二级 2-2",
              components: "HelloWorld",
            },
          ],
        },
        {
          name: "一级 3",
          children: [
            {
              name: "二级 3-1",
              children: [
                {
                  id: "3-1-1",
                  name: "三级 3-1-1",
                  components: "HelloWorld",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  methods: {
    handleNodeClick(data) {
      if (data?.components) {
        this.$emit("click", data);
      }
    },

    handleDragStart(node) {
      console.log(node);
      if (node?.data?.components) {
        this.$emit("dragstart", node.data);
      }
    },
    handleExpanded(index) {
      this.isExpanded = this.isExpanded === index ? "" : index;
    },
  },
};
</script>

<style lang="scss" scoped>
.collapse {
  .collapse-item {
    .pane-header {
      border-top: 1px solid rgba(204, 204, 204, 0.2);
      display: flex;
      line-height: 22px;
      cursor: pointer;
      h3.title {
        -webkit-margin-before: 0;
        -webkit-margin-after: 0;
        font-size: 12px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .icon-expanded {
        font-size: 12px;
        margin: 0 2px;
      }
    }
    .pane-content {
      padding-left: 12px;
      line-height: 25px;
    }
    .tree {
      background: none;
      color: #d8d7d7;
      font-weight: bold;
    }
  }
}
::v-deep
  .el-tree--highlight-current
  .el-tree-node.is-current
  > .el-tree-node__content {
  background: none;
  color: rgba(219, 132, 18, 0.8);
}
</style>