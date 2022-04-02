// 此vm参数为页面的实例，可以通过它引用vuex中的变量
import store from '@/store/index.js'

module.exports = (vm) => {
    // 初始化请求配置
    uni.$u.http.setConfig((config) => {
        /* config 为默认全局配置*/
		// #ifdef H5
			config.baseURL = '/api'; // 请求本地域名
		// #endif
		
		if (process.env.NODE_ENV === 'development') {
			console.log('开发环境');
			config.baseURL = 'https://';
		} else {
			console.log('生产环境');
			config.baseURL = 'https://';
		}
		
		config.dataType = 'json'; // 返回后对数据进行第一次JSON.parse
		config.showLoading = true; // 是否显示请求中的loading
		config.loadingText = '请求中...'; //请求中的文字提醒
		config.loadingTime = 800; // 此时间内请求还没回来的话就显示加载动画
		config.originalData = true; // 是否在拦截器中返回服务端的原始数据
		config.loadingMask = true; // 展示loading的时候，是否给一个透明的蒙层，防止单击穿透
		config.dataType = 'application/x-www-form-urlencoded';
        return config
    })
	
	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
	    // 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
	    config.data = config.data || {}
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		if(config?.custom?.auth) { 
			config.data.SessionKey = store.state.userInfo.SessionKey
		}
	    return config 
	}, config => { // 可使用async await 做异步操作
	    return Promise.reject(config)
	}) 
}