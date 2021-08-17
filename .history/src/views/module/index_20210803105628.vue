<template>
  <div class="modules-links text-center float-container">
    <div
      v-for="(item, index) in routerLink"
      :key="item.id"
      class="modules-inner"
      @click="handleChange(item, index)"
    >
      <div class="box-shadow"></div>
      <div class="modules-icon" :class="item.code"></div>
      <div class="modules-title">{{ item.name }}</div>
      <div class="modules-subtitle">{{ item.code }}</div>
      <div class="enter">进入</div>
    </div>
  </div>
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
