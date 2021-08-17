<template>
  <div class="layout-index">
    <div @click="linkRouter">我是signfor</div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
// ref原生数据， computed计算数据熟悉，reactive是一个object类型, toRefs 使js数据类型变为vue实时数据
interface DataProps {
  linkRouter: () => void;
}
export default {
  name: "signfor",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();
    const data: DataProps = reactive({
      linkRouter: () => {
        router.push("/system");
      },
    });
    const toRefsData = toRefs(data);
    return {
      ...toRefsData,
    };
  },
};
</script>
<style lang="scss" scoped></style>
