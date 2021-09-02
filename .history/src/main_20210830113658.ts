import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { RouteLocationNormalized } from 'vue-router'
import { toLoginRoute } from '@/utils/routes.js'
import routesWhiteList from './config/index.js'
import './styles/index.scss'

createApp(App).use(store).use(router).use(ElementPlus).mount("#app");


function getPageTitle(pageTitle: unknown) {
  const titleReverse = false
  const title = '来回科技'
  let newTitles = []
  if (pageTitle) newTitles.push(pageTitle)
  if (title) newTitles.push(title)
  if (titleReverse) newTitles = newTitles.reverse()
  return newTitles.join('-')
}


