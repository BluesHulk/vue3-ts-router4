<template>
  <div class="login-container">{{ count }}</div>
  <div class="login" @click="loginTap">登录</div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import CryptoJS from "crypto-js";
// import { login } from "../../api/user.js";
// ref原生数据， computed计算数据熟悉，reactive是一个object类型, toRefs 使js数据类型变为vue实时数据
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  loginTap: () => void;
  numbers: number[];
  person: { name?: string };
}
export default {
  name: "login",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();
    const encryptByDES = (message: string, key: string) => {
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    };
    const cipherText = encryptByDES(
      "123456",
      "4d386d78-e565-43ff-a04f-7caedbdd86f0"
    );
    const data: DataProps = reactive({
      count: 0,
      increase: () => {
        data.count;
      },
      loginTap: () => {
        router.push("/index");
        store
          .dispatch("login", {
            username: "xadmin",
            password: cipherText,
            coCode: "laihui",
          })
          .then((res) => {
            console.log("返回结果", res);
            store.dispatch("getUserInfo").then((res) => {
              console.log(res);
            });
          });
        // login({
        //   username: "xadmin",
        //   password: cipherText,
        //   coCode: "laihui",
        // });
      },
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2, 3, 4],
      person: {},
    });
    const toRefsData = toRefs(data);

    return {
      ...toRefsData,
      encryptByDES,
      cipherText,
    };
  },
};
</script>

<style lang="scss" scoped></style>
