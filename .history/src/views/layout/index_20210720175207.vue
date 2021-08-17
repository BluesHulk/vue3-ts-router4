<template>
  <div class="layout-index">
    <Header></Header>
    <Menu>我是左侧</Menu>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/index.vue";
import Footer from "@/components/footer/index.vue";
import Menu from "@/components/menu/index.vue";
export default defineComponent({
  name: "layout",
  components: {
    Header,
    Footer,
    Menu,
  },
});
</script>
<style lang="scss" scoped></style>
