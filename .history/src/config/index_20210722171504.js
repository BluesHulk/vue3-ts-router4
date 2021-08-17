
module.exports = {
  // 开发以及部署时的URL
  // hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"
  // history模式默认使用"/"或者"/二级目录/"，记住只有hash时publicPath可以为空！！！
  publicPath: "",
  // 生产环境构建文件的目录名
  outputDir: "dist",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: "static",
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 进行编译的依赖
  transpileDependencies: [],
  // 开发环境端口号
  devPort: 11000,
  // 需要自动注入并加载的模块
  providePlugin: {},
  // npm run build时是否自动生成7z压缩包
  build7z: false,
  // npm run build时是否生成gzip
  buildGzip: false,
  // npm run build时是否开启图片压缩，由于国内网路原因image-webpack-loader必须使用cnpm安装，如无法使用cnpm，请配置false
  imageCompression: true,
  baseURL: process.env.NODE_ENV === "development" ? "" : "",
  // 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: "application/json;charset=UTF-8",
  // 最长请求时间
  requestTimeout: 10000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, "200", "0"],
  // 数据状态的字段名称
  statusName: "code",
  // 状态信息的字段名称
  messageName: "msg",
  prefixBusiness: "/api/plant/business",
  prefixBs: "/api/plant/bs",
  prefixPassport: "/api/plant/passport",
    // 标题，此项修改后需要重启项目！！！ (包括初次加载雪花屏的标题 页面的标题 浏览器的标题)
    title: "来回科技",
    // 标题分隔符
    titleSeparator: " - ",
    // 标题是否反转
    // 如果为false: "page - title"
    // 如果为ture : "title - page"
    titleReverse: false,
    // 简写
    abbreviation: "来回科技",
    // pro版本copyright可随意修改
    copyright: "来回科技",
    // 缓存路由的最大数量
    keepAliveMaxNum: 20,
    // 路由模式，可选值为 history 或 hash
    routerMode: "hash",
    // 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
    routesWhiteList: ["/login", "/register", "/404", "/403", "/module"],
    // 加载时显示文字
    loadingText: "正在加载中...",
    // token名称
    tokenName: "token",
    // token在localStorage、sessionStorage、cookie存储的key的名称
    tokenTableName: "admin-token",
    // token存储位置localStorage sessionStorage cookie
    storage: "localStorage",
    // token失效回退到登录页时是否记录本次的路由（是否记录当前tab页）
    recordRoute: true,
    // 是否开启logo，不显示时设置false，请填写src/icon路径下的图标名称
    // 如需使用内置RemixIcon图标，请自行去logo组件切换注释代码(内置svg雪碧图较大，对性能有一定影响)
    logo: "logo",
    // 语言类型zh、en
    i18n: "zh",
    // 消息框消失时间
    messageDuration: 3000,
    // 在哪些环境下显示高亮错误 ['development', 'production']
    errorLog: "development",
    // 是否开启登录拦截
    loginInterception: true,
    // intelligence(前端导出路由)和all(后端导出路由)两种方式
    authentication: "all",
    // 是否支持游客模式，支持情况下，访问白名单，可查看所有asyncRoutes
    supportVisit: false,
    // 是否开启roles字段进行角色权限控制(如果是all模式后端完全处理角色并进行json组装，可设置false不处理路由中的roles字段)
    rolesControl: true,
    // vertical column comprehensive common布局时是否只保持一个子菜单的展开
    uniqueOpened: true,
    // vertical column comprehensive common布局时默认展开的菜单path，使用逗号隔开建议只展开一个
    defaultOpeneds: [],
    // 需要加loading层的请求，防止重复提交
    debounce: ["doEdit"],
    // 分栏布局和综合布局时，是否点击一级菜单默认开启第一个二级菜单
    openFirstMenu: true,
};