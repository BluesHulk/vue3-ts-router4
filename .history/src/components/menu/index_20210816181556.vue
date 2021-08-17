<template>
  <div class="layout-index sidebar">
    <el-menu
      :unique-opened="true"
      @close="handleClose"
      @open="handleOpen"
      v-if="menuList && menuList.length > 0"
      :router="true"
      class="menu"
      :default-active="activepath"
      background-color=" #263B98"
      text-color="#D1D9FF"
      active-text-color="#fff"
    >
      <el-submenu
        :index="item1.path"
        v-for="item1 in menuList"
        :key="item1.name"
        :class="item1.meta && item1.meta.iShow ? 'show' : 'hide'"
      >
        <!--表示可以展开的一组 -->
        <template #title @click="clickTitle">
          <!--文字 -->
          <span>{{ item1.meta.title }}</span>
        </template>
        <el-menu-item
          class="menuItem"
          v-for="item2 in item1.children"
          :key="item2.name"
          :index="item1.path + item2.path"
        >
          <!-- <i class="el-icon-location"></i> -->
          <!--图标 -->
          <span>{{ item2.meta.title }}</span>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { RouteRecordRaw, LocationQuery, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getRouter } from "../../utils/token.js";
// import DynamicMenu from "./dyname/index.vue";
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
    const menuList = JSON.parse(getRouter());
      watch(() => route.path,() => {
console.log('监听到变化')
},
    console.log(router, "router");
    return {
      routers,
      menuList,
      handleOpen,
      handleClose,
    };
  },
  components: {
    // DynamicMenu: DynamicMenu,
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
.show {
  display: block;
}
.hide {
  display: none;
}
</style>
