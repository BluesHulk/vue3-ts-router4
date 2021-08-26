<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="100px"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="acount">
      <el-input v-model="ruleForm.acount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="pass">
      <el-input
        type="password"
        v-model="ruleForm.pass"
        autocomplete="off"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="loginTap('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
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
  numbers: number[];
  person: { name?: string };
  loginForm: {
    acount?: string;
    pass?: string;
  };
}
interface FormState {
  username: string
  password: string
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
     const formState: FormState = reactive({
      username: '',
      password: '',
    })
    const data: DataProps = reactive({
      loginTap: () => {
        store
          .dispatch("login", {
            username: "xadmin",
            password: cipherText,
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
                  await store.dispatch("concatRoutes").then(async (res) => {
                    console.log(res, "aaa");
                    // console.log(store.getters.router);
                    // await router.addRoute(store.getters.router);
                    // await router.push("/index");
                  });
                }
              });
            }
          });
      },
      numbers: [0, 1, 2, 3, 4],
      person: {},
      loginForm: {},
    });
    const toRefsData = toRefs(data);
    console.log(router);
    return {
      ...toRefsData,
      encryptByDES,
      cipherText,
    };
  },
};
</script>

<style lang="scss" scoped></style>
