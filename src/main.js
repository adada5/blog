import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
//全局css
import './assets/css/global.css'
//阿里icon
import './assets/css/icon/iconfont.css'
//typo.css
import "./assets/css/typo.css";
//moment 时间显示
import './util/dateTimeFormatUtils.js'


//semantic-ui-vue
import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
Vue.use(SuiVue)

//Markdown编辑器插件
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor)

Vue.config.productionTip = false

new Vue({
  // Markdown编辑器插件双向绑定的值
  data() {
    return { value: '' }
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
