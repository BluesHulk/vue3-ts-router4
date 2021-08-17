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
import { RouteRecordRaw, LocationQuery, useRouter } from "vue-router";
import { useStore } from "vuex";
// import { login } from "../../api/user.js";

export default {
  name: "module",
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setup() {
    const router = useRouter();
    const store = useStore();

    const routerLink = store.getters.routerLink;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = async (item: any) => {
      await store.dispatch("setlhSysCode", item.code);
      await store.dispatch("concatRoutes").then(async (res) => {
        console.log(res, "aaa");
        console.log(store.getters.router);
        res.map((respon: any) => {
          router.addRoute(respon);
        });
        // await router.addRoute(store.getters.router);
        // await router.push("/index");
      });
    };
    console.log(routerLink);
    return {
      routerLink,
      handleChange,
    };
  },
};
</script>

<style lang="scss" scoped>
.ani-opacity {
  animation: 0.5s opacity2 0s ease-in-out;
  -webkit-animation: 0.5s opacity2 0s ease-in-out;
  -moz-animation: 0.5s opacity2 0s ease-in-out;
}
@keyframes opacity2 {
  0% {
    opacity: 0;
    bottom: 0px;
  }
  100% {
    opacity: 1;
    bottom: 20px;
  }
}
@-webkit-keyframes opacity2 {
  0% {
    opacity: 0;
    bottom: 0px;
  }
  100% {
    opacity: 1;
    bottom: 20px;
  }
}
@-moz-keyframes opacity2 {
  0% {
    opacity: 0;
    bottom: 0px;
  }
  100% {
    opacity: 1;
    bottom: 20px;
  }
}
.modules-links {
  width: 1580px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
}

.modules-inner {
  width: 300px;
  height: 360px;
  background: #fff;
  border-radius: 14px;
  text-decoration: none;
  position: relative;
  cursor: pointer;
  margin-top: 105px;
  .enter {
    display: none;
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 168px;
    height: 46px;
    background: #239cff;
    line-height: 46px;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    border-radius: 23px;
    -webkit-background-size: 168px 46px;
    background-size: 168px 46px;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    @extend .ani-opacity;
  }
  .box-shadow {
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.15);
    position: absolute;
    left: 0;
    top: 0;
    width: 300px;
    height: 360px;
    display: none;
    background: rgba(255, 255, 255, 0);
    border-radius: 14px;
  }
  &:hover {
    .enter {
      display: block;
      bottom: 20px;
    }
    .box-shadow {
      box-shadow: 0px 0px 50px 10px rgba(0, 0, 0, 0.15);
      display: block;
    }
  }
  .SYS_PT_MG {
    background-image: url(./img/img_pingtai.png);
  }
  .SYS_SR_SHUINI {
    background-image: url(./img/img_shuinichang.png);
  }
  .SYS_DEALER_MG {
    background-image: url(./img/img_jingxiaoshang.png);
  }
  .SYS_SR_RMS {
    background-image: url(./img/img_yuancailiao.png);
  }
  .SYS_SR_MS {
    background-image: url(./img/img_jiaobanzhan.png);
  }
  .SYS_YS_MG {
    background-image: url(./img/img_wuliu.png);
  }
}
.modules-inner + .modules-inner {
  margin-left: 20px;
}
.modules-icon {
  height: 160px;
  -webkit-background-size: 160px;
  background-size: 160px;
  background-repeat: no-repeat;
  background-position: center;
  margin-top: 45px;
}
.modules-title {
  font-size: 14px;
  font-family: "SourceHanSansCN-Medium, SourceHanSansCN";
  font-weight: 500;
  color: #333;
  line-height: 27px;
  margin-bottom: 13px;
  text-align: center;
}
.modules-subtitle {
  font-size: 12px;
  font-family: HelveticaNeueLT-Condensed, HelveticaNeueLT;
  font-weight: normal;
  color: rgba(195, 193, 208, 1);
  line-height: 14px;
  letter-spacing: -1px;
  text-align: center;
}
</style>
