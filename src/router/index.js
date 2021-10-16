import Vue from 'vue'
import VueRouter from 'vue-router'

const index = () => import('../views/index')
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Tag = () => import('../views/tag/Tag')
const Blog = () => import('../views/blog/Blog')
const Moments = () => import('../views/moments/Moments')
const Archives = () => import('../views/archives/Archives')
const About = () => import('../views/about/About')

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
