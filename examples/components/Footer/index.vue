<template>
  <div class="footer">
    <div class="left-items">
      <div id="status.host" class="statusbar-item has-background-color">
        <i class="iconfont icon-a-lianjielianxi"></i> codingcorp.cloudstudio.net
      </div>
      <div class="statusbar-item"><i class="iconfont icon-cuowukongxin"></i> 0 <i
          class="iconfont icon-jinggao"></i> 0</div>
    </div>
    <div class="right-items">
      <div class="statusbar-item"><i class="iconfont icon-tongzhi"></i></div>
      <div class="statusbar-item">Formatting: <i class="iconfont icon-duigou"></i></div>
      <div class="statusbar-item">Layout: U.S.</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .statusbar-item {
    display: inline-block;
    height: 100%;
    max-width: 40vw;
    vertical-align: top;
    padding: 0 10px;
    cursor: pointer;
    &:hover {
      background-color: #0385db;
    }
  }
  .left-items {
    .has-background-color {
      background-color: #16825d;
      &:hover {
        background-color: #21926b;
      }
    }
  }
  .iconfont {
    font-size: 13px !important;
    font-weight: 500;
  }
}
</style>