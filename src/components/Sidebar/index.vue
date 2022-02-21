<template>
  <div class="sidebar">
    <slot name="sidebar">
      <div class="content">
        <div class="top-bar">
          <ul class="actions-container">
            <li class="action-item" :class="isCheck===`top${index}`? 'checked' :''"
              v-for="(item, index) in topData" :key="index" draggable="true"
              @click="handleClick(item, `top${index}`)">
              <a :title="getName(item)">
                <i :class="item.icon"></i></a>
            </li>
          </ul>
        </div>
        <div class="bottom-bar">
          <slot name="sidebar-bottom">
            <ul class="actions-container">
              <li class="action-item" :class="isCheck===`bottom${index}`? 'checked' :''"
                v-for="(item, index) in bottomData" :key="index" draggable="true"
                @click="handleClick(item, `bottom${index}`)">
                <a :title="getName(item)">
                  <i :class="item.icon"></i></a>
              </li>
            </ul>
          </slot>
        </div>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    topData() {
      return this.data.filter((item) => item?.location !== "bottom");
    },
    bottomData() {
      return this.data.filter((item) => item?.location === "bottom");
    },
  },
  data() {
    return {
      isCheck: "",
    };
  },
  methods: {
    handleClick(item, index) {
      this.isCheck = this.isCheck === index ? "" : index;

      this.$emit("change", String(this.isCheck) ? item : "");
    },
    getName(item) {
      return item?.name + (item?.hotkey ? `(${item.hotkey})` : "");
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar {
  background-color: #333333;
  color: #999999;
  width: 48px;
  height: calc(100vh - 57px);
  overflow: auto;
  .content {
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    box-sizing: border-box;
  }
  .action-item {
    position: relative;
    text-align: center;
    height: 48px;
    width: 48px;
    line-height: 48px;
    box-sizing: border-box;
    cursor: pointer;
    &:hover {
      color: #ffffff;
    }
    &.checked {
      color: #ffffff;
      border-left: 2px solid #ffffff;
    }
  }
  .iconfont {
    font-size: 24px !important;
  }
}
</style>