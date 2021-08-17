<template>
  <div class="login-container">{{ count }}</div>
  <div class="login" @click="loginTap">登录</div>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useRoute, LocationQuery, useRouter } from "vue-router";
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
            store.dispatch("getUserInfo").then((respon) => {
              const { data } = respon;
              if (data && data.length > 1) {
                await this.$router.push("/module");
              } else {
                // console.log(this.handleRoute())

                await this.$store.dispatch("user/setIndex", 0);
                await this.$store.dispatch("user/setlhSysCode", data[0].code);
                await this.$store.dispatch("routes/setRoutes", {
                  id: data.length,
                });
                await this.$router.push("/index");
                await getAllFunctionByMenuCode().then(async (res) => {
                  // console.log(res)
                  if (res.code === 200 && res.status === 0) {
                    const buttons = res.data;
                    await this.$store.dispatch(
                      "permission/setButton",
                      JSON.stringify(buttons)
                    );
                  } else {
                    this.$baseMessage(
                      res.message,
                      "error",
                      false,
                      "vab-hey-message-error"
                    );
                  }
                });
              }
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
