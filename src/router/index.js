import Vue from 'vue'
import VueRouter from 'vue-router'
import { getGlobalData } from "../utils/globalData";

Vue.use(VueRouter)


const routes = [
    {
        path: "/", // 父路由路径
        component: () => import('../App.vue'), // 父路由组件，传入 vue component
        name: "App", // 路由名称
        // 设置子路由
        children: [
            {
                path: "login", // 子路由路径
                component: () => import('../views/Login.vue'), // 子路由组件，会替换父组件中<router-view>中的内容
                name: "Login" // 路由名称
            },
            {
                // 应用首页
                path: "home",
                component: () => import('../views/home/Home.vue'),
                name: "Home",
                children: [
                    // 服务列表
                    { path: "service", component: () => import('../views/home/Service.vue'), name: "Service" },
                    // 产品容器
                    {
                        path: "product",
                        component: () => import('../views/home/product/Product.vue'),
                        name: "Product",
                        children: [
                            // 子路由内容
                            // 产品列表
                            { path: "list", component: () => import('../views/home/product/ProductList.vue'), name: "ProductList" },
                            // 产品新增
                            { path: "add/0", component: () => import('../views/home/product/ProductEdit.vue'), name: "ProductAdd" },
                            // 产品编辑
                            // 我们能看到，新增和编辑其实最终使用的是同一个组件，所以后面会有一些需要兼容处理的地方
                            // :id可匹配任意值，且可在组件中通过this.$route.params.id获取该值
                            { path: "edit/:id", component: () => import('../views/home/product/ProductEdit.vue'), name: "ProductEdit" }
                        ]
                    }
                ]
            }
        ]
    }
];

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== "Login") {
        // 非 login 页面，检查是否登录
        // 这里简单前端模拟是否填写了用户名，真实环境需要走后台登录，缓存到本地
        if (!getGlobalData("username")) {
            next({ name: "Login" });
        }
    }
    // 其他情况正常执行
    next();
});

export default router