import App from './App'
import OS from '@/common/js/os.js' 

// #ifndef VUE3 
import Vue from 'vue' 
 
Vue.config.productionTip = false


// 调用 store vuex 状态管理
import store from '@/store/index.js'

// 引入组件
import uView from 'uview-ui'
Vue.use(uView)  

const app = new Vue({
    ...App,
	store
})

Vue.prototype.$OS = OS();   

// 拦截器封装
import httpInterceptor from "@/api/http.interceptor.js"
Vue.use(httpInterceptor,app);
// API封装
import httpApi from '@/api/http.api.js'
Vue.use(httpApi,app);

app.$mount()


// #endif

// #ifdef VUE3  
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif