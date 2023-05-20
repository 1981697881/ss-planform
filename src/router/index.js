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
    path: 'users',
    component: () => import('@/views/system/users/index'),
    name: 'Users',
    meta: {
      title: '用户管理'
    }
  }, {
    path: 'organizational',
    component: () => import('@/views/basic/organizational/index'),
    name: 'Organizational',
    meta: {
      title: '组织架构'
    }
  }, {
    path: 'duties',
    component: () => import('@/views/basic/duties/index'),
    name: 'Duties',
    meta: {
      title: '职务体系'
    }
  }, {
    path: 'clerk',
    component: () => import('@/views/basic/clerk/index'),
    name: 'Clerk',
    meta: {
      title: '职员管理'
    }
  }, {
    path: 'team',
    component: () => import('@/views/basic/team/index'),
    name: 'Team',
    meta: {
      title: '团队管理'
    }
  }, {
    path: 'essential',
    component: () => import('@/views/basic/essential/index'),
    name: 'Essential',
    meta: {
      title: '参数表'
    }
  }, {
    path: 'dictionaries',
    component: () => import('@/views/basic/dictionaries/index'),
    name: 'Dictionaries',
    meta: {
      title: '字典表'
    }
  }, {
    path: 'commissionRatio',
    component: () => import('@/views/basic/commissionRatio/index'),
    name: 'CommissionRatio',
    meta: {
      title: '提成比例设定'
    }
  }, {
    path: 'contractTerms',
    component: () => import('@/views/basic/contractTerms/index'),
    name: 'ContractTerms',
    meta: {
      title: '合同条款'
    }
  }, {
    path: 'bdRoll',
    component: () => import('@/views/basic/bdRoll/index'),
    name: 'BdRoll',
    meta: {
      title: 'BD名单导入'
    }
  }
  ]
}, {
  path: '/information',
  component: Layout,
  name: 'Information',
  meta: {
    title: '工资数据管理',
    icon: 'component'
  },
  children: [{
    path: 'workTeam',
    component: () => import('@/views/information/workTeam/index'),
    name: 'WorkTeam',
    meta: {
      title: '团队管理'
    }
  }, {
    path: 'outsourcedProjects',
    component: () => import('@/views/information/outsourcedProjects/index'),
    name: 'OutsourcedProjects',
    meta: {
      title: '外包项目管理'
    }
  }, {
    path: 'opening',
    component: () => import('@/views/information/opening/index'),
    name: 'Opening',
    meta: {
      title: '期初数据导入'
    }
  }, {
    path: 'bonusPlan',
    component: () => import('@/views/information/bonusPlan/index'),
    name: 'BonusPlan',
    meta: {
      title: '外包奖金方案'
    }
  }, {
    path: 'recruitmentBonus',
    component: () => import('@/views/information/recruitmentBonus/index'),
    name: 'RecruitmentBonus',
    meta: {
      title: '招聘奖金管理'
    }
  }, {
    path: 'bdBonus',
    component: () => import('@/views/information/bdBonus/index'),
    name: 'BdBonus',
    meta: {
      title: 'BD奖金管理'
    }
  }, {
    path: 'teamBonus',
    component: () => import('@/views/information/teamBonus/index'),
    name: 'TeamBonus',
    meta: {
      title: '团队奖金管理'
    }
  }, {
    path: 'outsourcingBonus',
    component: () => import('@/views/information/outsourcingBonus/index'),
    name: 'OutsourcingBonus',
    meta: {
      title: '外包奖金管理'
    }
  }
  ]
}, {
  path: '/reportForm',
  component: Layout,
  name: 'ReportForm',
  meta: {
    title: '工资报表',
    icon: 'component'
  },
  children: [{
    path: 'bonusSummary',
    component: () => import('@/views/reportForm/bonusSummary/index'),
    name: 'BonusSummary',
    meta: {
      title: '奖金汇总表'
    }
  }, {
    path: 'outsourcingBonusSummary',
    component: () => import('@/views/reportForm/outsourcingBonusSummary/index'),
    name: 'OutsourcingBonusSummary',
    meta: {
      title: '外包奖金汇总表'
    }
  }, {
    path: 'incomeDetail',
    component: () => import('@/views/reportForm/incomeDetail/index'),
    name: 'IncomeDetail',
    meta: {
      title: '奖金明细表'
    }
  }, {
    path: 'outsourcingBonusDetails',
    component: () => import('@/views/reportForm/outsourcingBonusDetails/index'),
    name: 'OutsourcingBonusDetails',
    meta: {
      title: '外包奖金明细表'
    }
  }
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
