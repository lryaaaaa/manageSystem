import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/pages/Login'
import Home from '@/pages/Home'
import Comment from '@/pages/Home/Comment'
import Introduce from '@/pages/Home/Introduce'
import SearchBooks from '@/pages/Home/SearchBooks'
import AdminOrder from '@/pages/Home/AdminOrder'
import AdminAddBooks from '@/pages/Home/AdminAddBooks'
import AdminAdd from '@/pages/Home/AdminAdd'
import Search from '@/pages/Home/Search'

// export default new VueRouter({
//     routes: [{
//             path: '*',
//             redirect: '/Login'
//         },
//         {
//             path: '/Login',
//             component: Login
//         },
//         {
//             path: '/home',
//             component: Home,
//             children: [{
//                     path: '/',
//                     component: Introduce,
//                 },
//                 {
//                     //    主页介绍
//                     path: 'introduce',
//                     component: Introduce,
//                 },
//                 {
//                     //    书籍查询
//                     path: 'searchbook',
//                     component: SearchBooks,
//                 },
//                 {
//                     //    评论区记录
//                     path: 'comment',
//                     component: Comment,
//                 },
//                 {
//                     //查询
//                     path:'search',
//                     component:Search
//                 },
//             // 管理员
//                 {
//                     //    人员管理
//                     path: 'order',
//                     component: AdminOrder,
//                 },
                
//                 {
//                     //    管理员添加图书
//                     path: 'adminaddbooks',
//                     component: AdminAddBooks,
//                 },
//                 {
//                     //添加管理员账号
//                     path: 'adminadd',
//                     component: AdminAdd,
//                 },
            
              
//             ]
//         }
//     ]
// })
const router=new VueRouter({
        routes: [{
            path: '*',
            redirect: '/Login'
        },
        {
            path: '/Login',
            component: Login
        },
        {
            path: '/home',
            component: Home,
            children: [{
                    path: '/',
                    component: Introduce,
                },
                {
                    //    主页介绍
                    path: 'introduce',
                    component: Introduce,
                },
                {
                    //    书籍查询
                    path: 'searchbook',
                    component: SearchBooks,
                },
                {
                    //    评论区记录
                    path: 'comment',
                    component: Comment,
                },
                {
                    //查询
                    path:'search',
                    component:Search
                },
            // 管理员
                {
                    //    人员管理
                    path: 'order',
                    component: AdminOrder,
                },
                
                {
                    //    管理员添加图书
                    path: 'adminaddbooks',
                    component: AdminAddBooks,
                },
                {
                    //添加管理员账号
                    path: 'adminadd',
                    component: AdminAdd,
                },
            
              
            ]
        }
    ]
    })
//导航守卫
router.beforeEach((to,from,next)=>{
    if (to.path==='/Login') return next();
    //获取token
    const tokenStr= window.sessionStorage.getItem('token')
    if(!tokenStr) return next('/Login')
    next()
   
  })

    

    export default router