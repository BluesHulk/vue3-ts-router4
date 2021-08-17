<template>
  <div class="login-container">{{ count }}</div>
  <div class="login" @click="loginTap">登录</div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useRoute, LocationQuery, useRouter } from "vue-router";
import { useStore } from "vuex";
// import { login } from "../../api/user.js";

export default {
  name: "login",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();

    const routerLink = store.getters.routerLink;

    return {
      routerLink,
    };
  },
};
</script>

<style lang="scss" scoped></style>
