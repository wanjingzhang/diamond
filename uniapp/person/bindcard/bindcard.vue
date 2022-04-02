<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<image class="bg abLB full" :src="[OS.CDN+'/static/my/list/bg.jpg']" mode="aspectFill"></image>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<view class="content abCC">
			<image class="bg full" :src="[OS.CDN+'/static/my/bind/bg.png']"></image>
			<view class="inputBox abCT">
				<input placeholder="请输入礼品卡序号" maxlength="20" type="number" v-model="CouponsCode"/>
			</view>
			<view class="btns abCB">
				<view v-for="(item,index) in menus" class="btn btnShadow" @click.stop="exchangeHandler" > 
					{{item.name}}
				</view>
			</view>
		</view>
		<comp-pop :display="popDisplay" :pid="pop.id" :btype="pop.btype" :wtype="pop.wtype" :ttype="pop.ttype" @popBack="popBack"></comp-pop>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex'; 
	const app = getApp();
	const pops =[{
					id:0,
					btype:[{name:"确认",type:"cancel"}], // 按钮数组
					wtype:0, // 0大框
					ttype:"txt11,成功获得*课时", // 提示类型 
					desc:"获取课时"
				},
				{
					id:1,
					btype:[{name:"确认",type:"cancel"}], // 按钮数组
					wtype:0, // 0大框
					ttype:"txt12", // 提示类型 
					desc:"绑卡失败"
				} 
			];
			
	export default {
		data() {
			return {
				OS:this.$OS,
				menus:[{id:0,name:"确认",type:0}],
				CouponsCode:'',
				pop:[],
				popDisplay:false, // 是否显示, 
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			exchangeHandler(e){
				if(this.CouponsCode.trim() == ""){ 
					uni.showToast({
						icon:"none",
						title: '请输入礼品卡序号',
						duration: 2000
					});
					return;
				}
				
				this.$u.api.ExchangeCoupons({
				CouponsCode:this.CouponsCode},function(res){
					if(res.errcode == 0){
						const {Type,ExchangeCoupons} = res.result; 
						console.log(ExchangeCoupons)
						// 1 未查询到此码 2 此码已被使用 3 成功兑换
						switch(Type){
							case '1': 
							case '2': 
								this.pop=pops[1];
								this.popDisplay=true;
								break;
							case '3':
								this.pop=pops[0];
								this.pop.ttype = `txt11,成功获得${ExchangeCoupons}课时,免费体验常规课程`;
								this.popDisplay=true;
								break;
						}
						this.CouponsCode = ""
					}
				}.bind(this))
			},
			popBack(e){ // 弹窗回调
				this.popDisplay=false;
				if(this.pop['id'] == 0){
					app.baiduTrack(['voucherbindyes',`礼品卡绑定成功确认`]); 
				}
			}
		},
		onLoad(){
			// this.pop=pops[0];
			// this.pop.ttype = `txt11,成功获得${8}课时,免费体验常规课程`;
			// this.popDisplay=true;
			// console.log(1)
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>

<style lang="scss" scoped>
$blue:#b9d2ff;
$white:#ffffff;
@import url('@/common/css/common.scss');
.content{width: 677rpx;height: 875rpx;display: flex;flex-direction: column;align-items: center;
	.bg{}
	.inputBox{width: 503rpx;height: 68rpx;top: 410rpx;left: 30rpx;background: $white;
		input{line-height: 26rpx;margin:14rpx 50rpx;font-size: 26rpx;}
	}
	.btns{bottom:140rpx;width: 380rpx;
		.btn{width: 380rpx;height: 75rpx;background:$blue;font-size: 28rpx;line-height: 75rpx;text-align: center;color:$white;}
	}
}	
</style>
