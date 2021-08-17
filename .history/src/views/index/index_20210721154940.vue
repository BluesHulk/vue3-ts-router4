<template>
  <div class="layout-index">
    <div @click="linkRouter">我是首页</div>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
// ref原生数据， computed计算数据熟悉，reactive是一个object类型, toRefs 使js数据类型变为vue实时数据
interface DataProps {
  linkRouter: () => void;
}
export default {
  name: "login",
  setup() {
    const router = useRouter();
    const data: DataProps = reactive({
      linkRouter: () => {
        router.push("/system");
      },
    });
    const toRefsData = toRefs(data);
    return {
      username,
      ...toRefsData,
    };
  },
};
</script>
<style lang="scss" scoped></style>
