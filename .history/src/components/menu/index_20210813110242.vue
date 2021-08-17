<template>
  <div class="layout-index">
    <div>我是菜单</div>
  </div>
</template>
<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { RouteRecordRaw, LocationQuery, useRouter } from "vue-router";
import { useStore } from "vuex";
// import { login } from "../../api/user.js";

export default {
  name: "menu",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();

    const routers = store.getters.router;
    return {
      routers,
    };
  },
};
</script>
<style lang="scss" scoped></style>
