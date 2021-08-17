import path from "path";
import { isExternal } from "../utils/validate.js";
import { hasAccess } from "@/utils/hasAccess";
import { recordRoute } from "@/config";

/**
 * @description all模式渲染后端返回路由,支持包含views路径的所有页面
 * @param asyncRoutes
 * @returns {*}
 */
export function convertRouter(asyncRoutes) {
  //
  return asyncRoutes.map((route) => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = (resolve) => require(["@/vab/layouts"], resolve);
      } else {
        const comType = typeof route.component;
        if (comType === "function") {
          const path = (route.component = route.component);
        } else {
          const index = route.component.indexOf("views");
          if (index) {
            const path =
              index > 0
                ? route.component.slice(index)
                : `views/${route.component}`;
            route.component = (resolve) => require([`@/${path}`], resolve);
          }
        }
      }
    }
    if (route.children && route.children.length)
      route.children = convertRouter(route.children);
    if (route.children && route.children.length === 0) delete route.children;
    return route;
  });
}

/**
 * @description 根据roles数组拦截路由
 * @param routes 路由
 * @param rolesControl 是否进行权限控制
 * @param baseUrl 基础路由
 * @returns {[]}
 */
export function filterRoutes(routes, rolesControl, baseUrl = "/") {
  return routes
    .filter((route) => {
      if (rolesControl && route.meta && route.meta.roles)
        return hasAccess(route.meta.roles);
      else return true;
    })
    .map((route) => {
      if (route.path !== "*" && !isExternal(route.path))
        route.path = path.resolve(baseUrl, route.path);
      if (route.children)
        route.children = filterRoutes(route.children, rolesControl, route.path);
      return route;
    });
}

/**
 * 根据当前route获取激活菜单
 * @param route 当前路由
 * @param isTabsBar 是否是标签
 * @returns {string|*}
 */
export function handleActivePath(route, isTabsBar = false) {
  const { meta, path, fullPath } = route;
  const rawPath = route.matched
    ? route.matched[route.matched.length - 1].path
    : path;
  if (isTabsBar) return meta.dynamicNewTab ? fullPath : rawPath;
  if (meta.activeMenu) return meta.activeMenu;
  return fullPath ? fullPath : rawPath;
}

/**
 * 获取当前跳转登录页的Route
 * @param currentPath 当前页面地址
 */
export function toLoginRoute(currentPath) {
  if (recordRoute && currentPath !== "/")
    return {
      path: "/login",
      query: { redirect: currentPath },
      replace: true,
    };
  else return { path: "/login", replace: true };
}

export function filterAsyncRouter(routerMap, roles) {
  const mls = [];
  routerMap.forEach((item) => {
    for (let i = 0; i < roles.length; i++) {
      const citem = roles[i];
      // var iIName, cCode
      // if (item && item.name) iIName = item.name.toLowerCase()
      // if (citem && citem.code) cCode = citem.code.toLowerCase()
      if (item.name === citem.code) {
        const c = [];
        item.rid = citem.rid;
        item.code = citem.code;
        const d = Object.assign({}, item);
        if (citem.children && citem.children.length > 0) {
          if (item.children && item.children.length > 0) {
            item.children.forEach((aitem) => {
              for (let a = 0; a < citem.children.length; a++) {
                const element = citem.children[a];
                // var aiName, eCode
                // if (aiName && aitem.name) aiName = aitem.name.toLowerCase()
                // if (element && element.code) eCode = element.code.toLowerCase()
                if (aitem.name === element.code) {
                  aitem.rid = element.rid;
                  aitem.code = element.code;
                  c.push(aitem);
                  break;
                }
                if (aitem.isdetail) {
                  c.push(aitem);
                  break;
                }
              }
            });
          }
        }
        d.children = c;
        mls.push(d);
        break;
      }
    }
  });
  return mls;
}
