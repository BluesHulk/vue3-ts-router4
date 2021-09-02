<template>
  <div class="layout-index">
    <div class="login-container">3</div>
    <div class="login">areahouse</div>
  </div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useRoute, LocationQuery, useRouter } from "vue-router";
import { useStore } from "vuex";
import CryptoJS from "crypto-js";
import { getAllFunctionByMenuCode } from "../../api/user.js";
// import { login } from "../../api/user.js";
// ref原生数据， computed计算数据熟悉，reactive是一个object类型, toRefs 使js数据类型变为vue实时数据

export default {
  name: "login",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
