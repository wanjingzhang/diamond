<script> 
import Vue from 'vue';
import {mapState, mapActions} from 'vuex';   
 
const mtjwxsdk = require("@/common/js/baidu/mtj-wx-sdk.js");
let Scene = "default"; //来源
let SceneValue = ""; //场景值 
let trd; // test 3D场景

if (process.env.NODE_ENV === 'development') {
	trd = "https://"; // test 3D场景
}else{
	trd = "https://"; // 正式 3D场景
}

		 
export default {
		globalData:{
			text:'text'
		}, 
		methods:{ 
			Login(){ 
				uni.login({
					 success: async (res) =>{
						// 获取code 通过后台换取用户信息
						// 写入code
						console.log("===========")
						const code = res.code;   
						this.$u.api.AppLogin({ 
							Appcode:code,
							UserSource: this.globalData.Scene,
							WXUserSource: this.globalData.SceneValue}, (re)=>{
								if(re.errcode == 0){ 
									let obj = Object.assign(this.globalData,re.result);   
									console.log(obj);
									// obj.IsUesePhone = "2";
									// obj.IsUeseinfo = "2";
									// obj.UserImg = ""; 
									// obj.UserName = "";
									// obj.UserPhone = "";
									
									obj.UserImg = obj.UserImg != ""? obj.UserImg : "static/my/my/head.png";
									obj.UserName = obj.UserName != ""? obj.UserName : "昵称";
									this.globalData = obj;  
									this.$store.dispatch('login',this.globalData); 
								}
								console.log("cb")
								console.log(re)
							})  
					},
					fail(res) {
						console.log(res);
					}
				})
				
				//小程序版本更新逻辑
				this.updateManager();
			},
			baiduTrack(obj){
				if(obj && obj[0] && obj[1]){  
					this.mtj.trackEvent(obj[0],{"desc":obj[1]});
					console.log("baidu Track:",obj[0], "[", obj[1] ,"]");
				}
			},
			onShareAppMessage(shareObj){
				console.log("onShareAppMessage")
				let obj = Object.assign({
					title:'品牌中心',
					path:'/pages/load/load',
					imageUrl:"xx.png?v=" + Math.random()
				},shareObj) 
				return obj;
			},
			updateManager() {
				const updateManager = wx.getUpdateManager();
				updateManager.onUpdateReady(function() {
					wx.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用？',
						success: function(res) {
							if (res.confirm) {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})
			}
		},
		onLaunch: function(options) {  
			this.mtjwxsdk = mtjwxsdk;
			this.globalData.Scene = options.query.scene ? options.query.scene : "Default";
			this.globalData.SceneValue =  options.scene ? options.scene : "Default";  
			  
			// 返回到前一页
			uni.$on('gotoBack',()=>{
				console.log('back to previous page')
				uni.navigateBack({
					delta: 1,
					animationType: 'pop-out',
					animationDuration: 200,
					success:(res) =>{
						const pages = getCurrentPages(); // 获取栈实例
						const currentRoute  = pages[pages.length-1].route; // 获取当前页面路由 
						if(currentRoute == "person/index/index"){
							// 修改 PageId
							this.$store.dispatch('changePageId','2'); 
						}else if(currentRoute.indexOf("person/")){
							// 修改 PageId
							this.$store.dispatch('changePageId','0'); 
						} 
					}
				})
			}) 
			
			// 呼叫服务 
			uni.$on('service',function(){  
				// 客服中心下拉弹出    
				this.$store.dispatch('showsvs')  
				const app = getApp();
				app.baiduTrack(['service_online',`在线客服`]);   
			})
			
			uni.$on('navTo',(id)=>{
				console.log("navTo",id)
				id = parseInt(id);
				
				switch (id){
					case 0: 
						uni.reLaunch({
							url:'/pages/main/main',
							animationType: 'fade-in',
							animationDuration: 300
						})
						// 修改 PageId
						// this.$store.dispatch('changePageId',String(id)); 
						break;
					case 2: 
						uni.navigateTo({
							url:'/person/index/index',
							animationType: 'fade-in',
							animationDuration: 300
						})
						// 修改 PageId
						// this.$store.dispatch('changePageId',String(id)); 
						break;
					case 1:
						uni.navigateTo({
							url: `/pages/webview/webview?url=${encodeURI(trd)}`, 
							animationType: 'fade-in',
							animationDuration: 300
						})
						break;
					case 3:
						const _url = encodeURIComponent(`${trd+'/?privateRoom=privateRoom'}`);
						console.log(_url);
						uni.navigateTo({
							url: `/pages/webview/webview?url=${_url}`, 
							animationType: 'fade-in',
							animationDuration: 300
						})
						break;
					default:
						break;
				}
				
			})
			  
			console.log('App Launch'); 
			
		},
		onShow: function() {
			this.Login(); 
			 
			console.log("onShow", this.$store.state.pageId)
			console.log('onShow2')
			if(this.$store.state.pageId == 4){
				// 打开成功 去ar页面
				console.log("打开成功 去ar页面")
				uni.$emit("gotoBack") 
			} 
			 
			
			console.log('App Show')
		},
		onHide: function() {
			this.$store.dispatch('hidesvs') 
			console.log('App Hide')
		},
		onPageNotFound(){
			// 跳转到404页面
			uni.navigateTo({
				url:'/pages/404/404'
			})
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */ 
	@import 'uview-ui/index.scss';
	
</style>
