<template>
  <div class="login-container">
    <div class="login-hellow">
      <div class="hellow">
        <p class="hellow-mes">您好，欢迎使用</p>
        <p class="hellow-welcome">来回好运物流系统（LMS）</p>
      </div>
      <div class="login-box">
        <el-form
          :model="formState"
          status-icon
          ref="ruleForm"
          label-width="50px"
          class="login-form"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              v-model="formState.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formState.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-button class="login-btn" type="primary" @click="loginTap()"
            >登录</el-button
          >
          <router-link to="/register" class="register">
            <div style="margin-top: 20px">注册</div>
          </router-link>
        </el-form>
      </div>
    </div>
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
      username: "xadmin@laihui",
      password: "123456",
    });
    const encryptByDES = (message: string, key: string) => {
      var keyHex = CryptoJS.enc.Utf8.parse(key);
      var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    };

    const data: DataProps = reactive({
      loginTap: () => {
        const cipherText = encryptByDES(
          formState.password,
          "4d386d78-e565-43ff-a04f-7caedbdd86f0"
        );
        store
          .dispatch("login", {
            username: formState.username.split("@")[0],
            password: formState.password,
            tenantCode: formState.username.split("@")[1],
          })
          .then((res) => {
            if (res.code === 200 && res.status == 0) {
              store.dispatch("getUserInfo").then(async (respon) => {
                const { data } = respon;
                if (data && data.length > 1) {
                  // console.log(router);
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
    return {
      ...toRefsData,
      encryptByDES,
      formState,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-container {
  height: 100vh;
  background: url("~@/assets/login_images/bg.png") center center fixed no-repeat;
  background-size: 100% 100%;
  .login-hellow {
    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    .hellow {
      width: 664px;
      height: 848px;
      background-size: 664px 848px;
      .hellow-mes {
        font-weight: 600;
        color: rgb(255, 255, 255);
        padding: 10px 0px;
        margin: 0px;
        width: 552px;
        margin-top: 30px;
        margin-left: 180px;
        font-size: 32px;
      }
      .hellow-welcome {
        font-weight: 600;
        color: rgb(255, 255, 255);
        padding: 10px 0px;
        margin: 0px;
        width: 552px;
        margin-top: 0px;
        margin-left: 180px;
        font-size: 32px;
      }
    }
    .login-box {
      flex: 1;
      height: 848px;
      background-size: 741px 848px;
      position: relative;
    }
  }
}

.login-form {
  position: absolute;
  max-width: 100%;
  padding: 7.5vh;
  width: 530px;
  overflow: hidden;
  background: url("~@/assets/login_images/white.png") no-repeat;
  background-size: 100% 100%;
  right: 165px;
  top: 240px;
  .title {
    font-size: 30px;
    font-weight: 500;
    color: #333333;
  }

  .title-tips {
    margin-top: 29px;
    font-size: 26px;
    font-weight: 400;
    color: #fff;
  }

  .login-btn {
    display: inherit;
    width: 385px;
    height: 50px;
    margin-top: 5px;
    border: 0;

    &:hover {
      opacity: 0.9;
    }

    .forget-passwordword {
      width: 100%;
      margin-top: 40px;
      text-align: left;

      .forget-password {
        width: 129px;
        height: 19px;
        font-size: 20px;
        font-weight: 400;
        color: rgba(92, 102, 240, 1);
      }
    }
  }

  .tips {
    margin-bottom: 10px;
    font-size: 14px;
    color: #fff;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      margin: 0 auto 40px auto;
      font-size: 34px;
      font-weight: bold;
      color: blue;
      text-align: center;
    }
  }

  i {
    position: absolute;
    top: 8px;
    left: 5px;
    z-index: 2;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  .show-password {
    position: absolute;
    right: 25px;
    left: -35px;
    font-size: 16px;
    color: #d7dee3;
    cursor: pointer;
    user-select: none;
  }

  ::v-deep {
    .el-form-item {
      padding-right: 0;
      margin: 20px 0;
      color: #454545;
      background: transparent;
      border: 1px solid transparent;
      border-radius: 2px;

      &__content {
        min-height: 32px;
        line-height: 32px;
      }

      &__error {
        position: absolute;
        top: 100%;
        left: 18px;
        font-size: 10;
        line-height: 18px;
        color: red;
      }
    }

    .el-input {
      box-sizing: border-box;

      input {
        height: 48px;
        padding-left: 35px;
        font-size: 14px;
        line-height: 58px;
        background: #f6f4fc;
        border: 0;
      }
      input:focus {
        border: 1px solid #2a9fff;
        transition: border 0s;
      }
    }
  }
  .register {
    display: inline-block;
    width: 50px;
    color: #0b83e8;
    line-height: 1;
    float: right;
  }
}
</style>
