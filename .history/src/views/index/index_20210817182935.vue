<template>
  <div class="layout-index">
    <div @click="linkRouter" class="content">我是首页</div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { getRouter } from "../../utils/token.js";
// ref原生数据， computed计算数据熟悉，reactive是一个object类型, toRefs 使js数据类型变为vue实时数据
interface DataProps {
  linkRouter: () => void;
}
export default {
  name: "login",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();
    const data: DataProps = reactive({
      linkRouter: () => {
        router.push("/system");
      },
    });
    console.log(store.getters.router, "router222");
    console.log(JSON.parse(getRouter()));
    const toRefsData = toRefs(data);
    return {
      ...toRefsData,
    };
  },
};
</script>
<style lang="scss" scoped>
.layout-index {
  .content {
    margin-top: 200px;
  }
}
</style>
