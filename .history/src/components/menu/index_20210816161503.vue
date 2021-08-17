<template>
  <div class="layout-index sidebar">
    <el-menu
      :uniqueOpened="true"
      :router="true"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-submenu index="5">
        <template #title>
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1">选项1</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { RouteRecordRaw, LocationQuery, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getRouter } from "../../utils/token.js";
// import { login } from "../../api/user.js";

export default {
  name: "menu",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();

    const routers = store.getters.router;
    const handleOpen = (key: any, keyPath: any) => {
      console.log(key, keyPath);
    };
    const handleClose = (key: any, keyPath: any) => {
      console.log(key, keyPath);
    };
    const menuList = getRouter();
    console.log(router, "router");
    return {
      routers,
      menuList,
      handleOpen,
      handleClose,
    };
  },
};
</script>
<style lang="scss" scoped>
/* 侧边栏 */
.sidebar {
  width: 200px !important;
  height: 100%;
  background: #304156;
  transition: all 0.25s;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  overflow-x: hidden;
  .iconfont {
    margin-right: 8px;
    color: #fff;
    font-size: 18px;
  }
  > div.menu-container > li.el-menu-item,
  > div.menu-container > li.el-submenu > .el-submenu__title {
    border-bottom: 1px solid rgba(238, 238, 238, 0.1);
  }
  .el-menu-item {
    background: #304156 !important;
  }
  /* 菜单hover时的背景 */
  .el-submenu__title:hover,
  .el-menu-item:hover {
    background: #223041 !important;
  }
  /* 菜单active时的背景 */
  /* .el-menu-item.is-active {
        background: #293748 !important;
    } */
}
</style>
