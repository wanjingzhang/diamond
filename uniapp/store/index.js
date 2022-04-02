// 导入 vue 和 Vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导出Store
const store = new Vuex.Store({
	state:{ 
		userInfo: uni.getStorageSync('userInfo') ? uni.getStorageSync('userInfo') : '',
		svsShow:false, // 显示隐藏服务弹框
		pageId:0,// 页面ID 首页:0 我的:2
	},
	getters:{
		
	},
	mutations:{
		MLOGIN(state, userInfo){ 
			uni.getStorageSync('userInfo',Object.assign(state.userInfo,userInfo));
			console.log("----MLOGIN-------");  
			state.userInfo = userInfo; 
			console.log(state.userInfo);
		},
		MLOGOUT(state){
			uni.clearStorage();
			state.userInfo = {desc:'退出状态'};
		},
		// 显示隐藏服务弹框
		HIDESVS(state){
			state.svsShow = false;
		},
		SHOWSVS(state){
			state.svsShow = true;
		},
		PAGEID(state,id){
			state.pageId = id;
			console.log("----PAGEID-------",id);  
		} 
	},
	actions:{
		login(context, userInfo){
			context.commit('MLOGIN',userInfo);
		},
		logout(context){
			context.commit("MLOGOUT");
		},
		hidesvs(context){
			context.commit("HIDESVS");
		},
		showsvs(context){
			context.commit("SHOWSVS");
		},
		changePageId(context,id){
			context.commit("PAGEID",id);
		}  
	}
})

export default store