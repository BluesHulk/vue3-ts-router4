<template>
  <el-form
    :model="formState"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="login-form"
  >
    <el-form-item label="账号" prop="username">
      <el-input v-model="formState.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="formState.password" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="loginTap()">提交</el-button>
      <el-button @click="resetForm()">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, reactive, toRefs } from "vue";
import { useRoute, LocationQuery, useRouter } from "vue-router";
import { useStore } from "vuex";
import CryptoJS from "crypto-js";
import { getAllFunctionByMenuCode } from "../../api/user.js";
// import { login } from "../../api/user.js";
// ref原生数据， computed计算数据熟悉，reactive是一个object类型, toRefs 使js数据类型变为vue实时数据
interface DataProps {
  loginTap: () => void;
}
interface FormState {
  username: string;
  password: string;
}
export default {
  name: "login",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();
    const formState: FormState = reactive({
      username: "",
      password: "",
    });
    const encryptByDES = (message: string, key: string) => {
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    };
    const cipherText = encryptByDES(
      formState.password,
      // "123456",
      "4d386d78-e565-43ff-a04f-7caedbdd86f0"
    );
    console.log(formState.password);
    const data: DataProps = reactive({
      loginTap: () => {
        store
          .dispatch("login", {
            // username: formState.username.split("@")[0],
            username: "xadmin",
            password: cipherText,
            // coCode: formState.username.split("@")[1],
            coCode: "laihui",
          })
          .then((res) => {
            if (res.code === 200 && res.status == 0) {
              store.dispatch("getUserInfo").then(async (respon) => {
                const { data } = respon;
                if (data && data.length > 1) {
                  console.log(router);
                  await router.push({
                    name: "module",
                  });
                } else {
                  await store.dispatch("setIndex", 0);
                  await store.dispatch("setlhSysCode", data[0].code);
                  await store.dispatch("setRoutes", {
                    id: data.length,
                  });
                  await router.push("/index");
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  await store.dispatch("concatRoutes").then(async () => {});
                }
              });
            }
          });
      },
      resetForm: () => {
        formState.username = "";
        formState.password = "";
      },
    });
    const toRefsData = toRefs(data);
    console.log(router);
    return {
      ...toRefsData,
      encryptByDES,
      cipherText,
      formState,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-form {
  width: 500px;
  margin: 50px auto;
}
</style>
