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
        <ul>
          <li v-for="(item, index) in files" :key="index" draggable="true"
            @click="click($event, item)" @dragstart="dragstart($event, item)">
            <span>{{item.name}}</span>
          </li>
        </ul>

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
      files: [
        {
          id: "HelloWorld",
          name: "HelloWorld",
        },
      ],
    };
  },
  methods: {
    click(e, item) {
      e.stopPropagation();
      this.$emit("click", item);
    },
    dragstart(e, item) {
      e.stopPropagation();
      this.$emit("dragstart", item);
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
  }
}
</style>