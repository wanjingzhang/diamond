const install = (Vue,vm) =>{
	let api = {} 
	// --------------- 公共接口 --------------------
	// 小程序授权
	api.AppLogin = (params,cb) => post('?method=AppLogin',params,cb);
	 
	vm.$u.api = api;
} 

const get = (url,params,cb) =>{
	uni.$u.http.get(url, {
	    params: params, /* 会加在url上 */
	    header: {}, /* 会与全局header合并，如有同名属性，局部覆盖全局 */
	    dataType: 'application/x-www-form-urlencoded',
	    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
	    custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	    // #ifndef MP-ALIPAY
	    responseType: 'text',
	    // #endif
	    // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
	    timeout: 60000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
	    // #endif
	    // #ifdef APP-PLUS
	    sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
	    // #endif
	    // #ifdef APP-PLUS
	    firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
	    // #endif
	    // #ifdef H5
	    withCredentials: false, // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
	    // #endif
	    // 返回当前请求的task, options。请勿在此处修改options。非必填
	    getTask: (task, options) => {
	         // 相当于设置超时时间500ms
	         // setTimeout(() => {
	         //   task.abort()
	         // }, 500)
	    },
	    //validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置。演示，非必填选项
		//	return statusCode >= 200 && statusCode < 300
		//}
	}).then(res => { 
		cb(res.data)
	}).catch(err => {
		cb(err)
	})
}
 
const post = (url,params,cb) =>{
	uni.$u.http.post(url, {}, {
		data:params, /* formdata */
	    // params: params, /* url paramaters */
	    header: {'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'}, /* formdata style */
	    dataType: 'application/x-www-form-urlencoded',
	    // 注：如果局部custom与全局custom有同名属性，则后面的属性会覆盖前面的属性，相当于Object.assign(全局，局部)
	    custom: {auth: true}, // 可以加一些自定义参数，在拦截器等地方使用。比如这里我加了一个auth，可在拦截器里拿到，如果true就传token
	    // #ifndef MP-ALIPAY
	    responseType: 'text',
	    // #endif
	    // #ifdef H5 || APP-PLUS || MP-ALIPAY || MP-WEIXIN
	    timeout: 60000, // H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
	    // #endif
	    // #ifdef APP-PLUS
	    sslVerify: true, // 验证 ssl 证书 仅5+App安卓端支持（HBuilderX 2.3.3+）
	    // #endif
	   // #ifdef APP-PLUS
	    firstIpv4: false, // DNS解析时优先使用ipv4 仅 App-Android 支持 (HBuilderX 2.8.0+)
	    // #endif
	    // #ifdef H5
	    withCredentials: false, // 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
	    // #endif
	    // 返回当前请求的task, options。请勿在此处修改options。非必填
	    getTask: (task, options) => {
	         // 相当于设置超时时间500ms
	         // setTimeout(() => {
	         //   task.abort()
	         // }, 500)
	    },
	    //validateStatus: (statusCode) => { // statusCode 必存在。此处示例为全局默认配置。演示，非必填选项
	  	//	return statusCode >= 200 && statusCode < 300
	  	//}
	}).then(res => {
		cb(res.data)
	}).catch(err => {
		cb(err)
	})
}

export default{
	install
}






