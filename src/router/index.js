import Vue from 'vue'
import VueRouter from 'vue-router'

const index = () => import('../views/index')
const login = () => import('../views/login')

const Admin = () => import('../views/admin/Admin')
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Tag = () => import('../views/tag/Tag')
const Blog = () => import('../views/blog/Blog')
const Moments = () => import('../views/moments/Moments')
const Archives = () => import('../views/archives/Archives')
const About = () => import('../views/about/About')

const AddArticle = () => import('../views/admin/childComps/articleManage/AddArticle')
const EditArticle = () => import('../views/admin/childComps/articleManage/EditArticle')
const AddMoment = () => import('../views/admin/childComps/momentManage/AddMoment')
const EditMoment = () => import('../views/admin/childComps/momentManage/EditMoment')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    redirect: '/Home',
    children: [{
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/category/:cate',
      name: 'category',
      component: Category,
      meta: {
        title: '分类'
      }
    },
    {
      path: '/tag/:tag',
      name: 'tag',
      component: Tag,
      meta: {
        title: '标签'
      }
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/moments',
      name: 'moments',
      component: Moments
    },
    {
      path: '/archives',
      name: 'archives',
      component: Archives
    },{
      path: '/about',
      name: 'about',
      component: About
    },]
  },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/admin/addartcle',
      component: AddArticle
    },
    {
      path: '/admin/editartcle/:id',
      component: EditArticle
    },
    {
      path: '/admin/addmoment',
      name: 'addmoment',
      component: AddMoment
    },
    {
      path: '/admin/editmoment/:id',
      name: 'editmoment',
      component: EditMoment
    }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
	// to将要访问的路径
	// from代表从哪个路径跳转而来
	// next是一个函数，表示放行
	// next()放行  next('/login')强制跳转
  const reg = RegExp(/admin/)
  if ( reg.test(to.path) || to.path === '/admin') {
    //获取token
    const tokenStr = window.localStorage.getItem('token')
    if (!tokenStr) return next("/login")
  }else{
    window.localStorage.removeItem('token')
  }
	
	next()
})

export default router
