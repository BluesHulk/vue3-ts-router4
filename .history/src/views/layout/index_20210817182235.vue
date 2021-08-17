<template>
  <div class="layout-index">
    <Header></Header>
    <Logo></Logo>
    <Menu>我是左侧</Menu>
    <router-view class="main-container"></router-view>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/header/index.vue";
import Logo from "@/components/logo/index.vue";
import Footer from "@/components/footer/index.vue";
import Menu from "@/components/menu/index.vue";
export default defineComponent({
  name: "layout",
  components: {
    Header,
    Footer,
    Menu,
    Logo,
  },
});
</script>
<style lang="scss" scoped>

</style>
