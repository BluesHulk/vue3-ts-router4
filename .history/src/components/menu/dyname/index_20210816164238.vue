<template>
  <div class="menu-container">
    <template v-for="v in menuList">
      <el-submenu
        :index="v.name"
        v-if="v.children && v.children.length > 0"
        :key="v.name"
      >
        <template #title>
          <i class="iconfont" :class="v.meta.icon"></i>
          <span>{{ v.meta.name }}</span>
        </template>
        <el-menu-item-group>
          <my-nav :menuList="v.children"></my-nav>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item :key="v.name" :index="v.name" v-else>
        <i class="iconfont" :class="v.meta.icon"></i>
        <template #title>{{ v.meta.name }}</template>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "menu",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped></style>
