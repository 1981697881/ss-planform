import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import notpage from '@/views/404'
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    affix: true                  if set true, the tag will affix in the tags-view
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */
/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const StaticRouterMap = [{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/404'),
  hidden: true
}, {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index'),
    meta: {
      title: '首页',
      icon: 'dashboard',
      affix: true
    }
  }]
}, {
  path: '/basic',
  component: Layout,
  name: 'Basic',
  meta: {
    title: '基础资料',
    icon: 'component'
  },
  children: [{
    path: 'organizational',
    component: () => import('@/views/basic/warehouse/index'),
    name: 'Organizational',
    meta: {
      title: '库位信息'
    }
  }
  ]
}, {
  path: '/information',
  component: Layout,
  name: 'Information',
  meta: {
    title: '条码管理',
    icon: 'component'
  },
  children: [/*{
    path: 'barcodeImport',
    component: () => import('@/views/information/barcodeImport/index'),
    name: 'BarcodeImport',
    meta: {
      title: '条码导入'
    }
  },*/ {
    path: 'barcodePrinting',
    component: () => import('@/views/information/barcodePrinting/index'),
    name: 'BarcodePrinting',
    meta: {
      title: '条码打印'
    }
  }
  ]
}, {
  path: '/system',
  component: Layout,
  name: 'System',
  meta: {
    title: '系统设置',
    icon: 'component'
  },
  children: [{
    path: 'users',
    component: () => import('@/views/system/users/index'),
    name: 'Users',
    meta: {
      title: '系统用户'
    }
  }/*, {
    path: 'setOfBooks',
    component: () => import('@/views/system/setOfBooks/index'),
    name: 'SetOfBooks',
    meta: {
      title: '账套管理'
    }
  }, {
    path: 'parameter',
    component: () => import('@/views/system/parameter/index'),
    name: 'Parameter',
    meta: {
      title: '系统参数设置'
    }
  }*/
  ]
}
  /* {
     path: 'external-link',
     component: Layout,
     children: [
       {
         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
         meta: { title: '开发文档', icon: 'link', roles: ['admin', 'editor'] } // 设置该路由进入的权限，支持多个权限叠加}
       }
     ]
   },

   // 404 page must be placed at the end !!!
   /* {
     path: '*',
     redirect: '/404',
     hidden: true
   } */
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: StaticRouterMap
})
