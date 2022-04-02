<template>
	<view class="auth full">
		<comp-pop :display="popDisplay" :pid="pop.id" :btype="pop.btype" :wtype="pop.wtype" :ttype="pop.ttype" @popBack="popBack"></comp-pop>
	</view>
</template>

<script>
	import Vue from 'vue';
	import {mapState, mapActions} from 'vuex';  
	const pops =[{
					id:0,
					btype:[{name:"不了，谢谢",type:"cancel"},{name:"注册",type:"confirm"}], // 按钮数组
					wtype:0, // 0大框
					ttype:"txt1", // 提示类型 
					desc:"首页获取用户信息"
				},
				{
					id:1,
					btype:[{name:"取消",type:"cancel"},{name:"确定",type:"confirm"}], // 按钮数组
					wtype:0, // 0大框
					ttype:"txt2", // 提示类型 
					desc:"首页获取用户手机号码"
				},
				{
					id:2,
					btype:[{name:"查看礼品卡",type:"confirm"},{name:"返回首页",type:"cancel"}], // 按钮数组
					wtype:0, // 0大框
					ttype:"txt3", // 提示类型 
					desc:"登录授权完了 获取冰淇淋券"
				},
			];
	let oldEvent;
	export default {
		name:"auth",
		data() {
			return {
				popDisplay:false,
				pop:pops[0]
			};
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods:{
			...mapActions(['login','logout']),
			startHandler(e){
				console.log("-----------")
				oldEvent = e;
				// 这里判断授权，没授权 弹窗出来 
				if(this.userInfo.IsUeseinfo == 1 && this.userInfo.IsUesePhone == 1){  
					this.$emit("AuthAll",oldEvent);
				}else if(this.userInfo.IsUeseinfo == 1 && this.userInfo.IsUesePhone == 2){
					this.popPhone();
				}else if(this.userInfo.IsUeseinfo == 2 && this.userInfo.IsUesePhone == 2){
					this.popUser(); 
				} 
			},
			popBack(e){ // 弹窗回调
				const btp = e.currentTarget.dataset["btp"];
				const id = this.pop.id;
				console.log(btp)
				
				// #ifdef MP-WEIXIN  
				if(btp == "confirm"){ // 确定
					switch (id){
						case 0:
							// 获取用户信息
							this.loginCode(e);
							break;
						case 1:
							// 获取用户手机号码
							this.getPhoneNumber(e);
							break;
						case 2: 
							this.popGift();
						default:
							break;
					}
				}else { // 取消
					this.popDisplay = false; 
					switch (id){
						case 2: 
							// 成功方法 
							this.popDisplay = false; 
							oldEvent.staystill = true;
							this.$emit("AuthAll",oldEvent);
							break;
						default:
							break;
							
					} 
				}
				//#endif    
			},
			popGift(e){
				// 冰淇淋查看 
				// 跳转到下一页
				const url = "/person/ice/ice";
				uni.navigateTo({
					url: url
				}); 	
				 
			},
			async getPhoneNumber(e){  
				if (e.detail.errMsg == 'getPhoneNumber:ok') { 
					this.popDisplay = false;  
					this.$u.api.OpenPhone({
					encryptedDataStr:e.detail.encryptedData,
					iv:e.detail.iv},(re)=>{   
						if(re?.result?.Phone){
							const obj = Object.assign(this.userInfo,{IsUesePhone:"1",UserPhone:re.result.Phone});
							this.$store.dispatch('login',obj); 
						} 
					});
					
					console.log(e.detail.encryptedData,e.detail.iv);  
					this.pop = pops[2];
					this.popDisplay = true; 
				} else {
					// 不同意获取手机
					console.log("不同意获取手机");
				} 
			},
			loginCode(ē){  
				this.popDisplay = false;  
				// 如果手机和用户信息都录入了，直接进入下一页
				if(this.userInfo.IsUeseinfo == 2){ 
					console.log(this.userInfo)
					 uni.getUserProfile({
					 	desc:"获取你的名字、头像、性别",
					 	success:(res)=> {   
					 		this.$u.api.DecodeUserInfo({
					 		UserInfo:JSON.stringify(res.userInfo)},(re2)=>{
					 			if(re2.errcode == 0){ 
									console.log("更新url")
									const obj = Object.assign(this.userInfo,{IsUeseinfo:"1",UserImg:res.userInfo.avatarUrl,UserName:res.userInfo.nickName});
									this.$store.dispatch('login',obj); 
									// 获取完了，第二次弹框，获取手机号
									// 判断这里如果是手机未授权弹
									if(this.userInfo.IsUesePhone == 2){ 
										this.popPhone();
									}else{
										this.$emit("AuthAll",oldEvent);
									}
								}else{
									// 授权失败
								}   
					 		}) 
					 		 
					 	},
					 	fail(res){
					 		console.log(res);
					 	}
					 }) 
				} 
			},
			popPhone(e){
				this.pop = pops[1]; 
				this.popDisplay = true; 
			},
			popUser(e){
				this.pop = pops[0]; 
				this.popDisplay = true; 
			},
		}
	}
</script>

<style>

</style>
