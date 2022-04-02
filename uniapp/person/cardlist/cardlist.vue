<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<image class="bg abLB full" :src="[OS.CDN+'/static/my/list/bg.jpg']" mode="aspectFill"></image>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<view class="contain abFull" :style='{ top: OS.articleTop }'>
			<image class="logo" :src="[OS.CDN+'/static/my/list/logo.png']" mode=""></image>
			<view v-if="login" class="list">
				<image class="iceCream shadow " mode="aspectFill" :src="[OS.CDN+'/static/my/list/icecream.jpg']" @click.stop="navTo" data-btp="0"></image>
				<view class="classes shadow" @click.stop="navTo" data-btp="1">
					<view class="count abRT"><view class="tips">剩余次数: </view><view class="text"> {{num.left.length==0?'0':''}}{{num.left}}/{{num.total}}次</view></view>
					<image class="full" mode="aspectFill" :src="[OS.CDN+'/static/my/list/card.png']"></image>
				</view>
			</view>
			<view v-else class="noBox">
				<image class="no" :src="[OS.CDN+'/static/my/list/no.png']"></image>
			</view>
			<view class="btns">
				<view v-for="(item,index) in menus" class="btn btnShadow" @click.stop="bindCard" > 
					{{item.name}}
				</view>
			</view>
		</view>
	<comp-pop :display="popDisplay" :pid="pop.id" :btype="pop.btype" :wtype="pop.wtype" :ttype="pop.ttype" @popBack="popBack"></comp-pop>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex'; 
	const pops =[{
		id:0,
		btype:[{name:"不了，谢谢",type:"cancel"},{name:"注册",type:"confirm"}], // 按钮数组
		wtype:0, // 0大框
		ttype:"txt1", // 提示类型 
		desc:"首页获取用户信息"
	}];
	const app = getApp();
	export default {
		data() {
			return {
				OS:this.$OS,
				pop:pops[0],
				menus:[{id:0,name:"绑定礼品卡",type:0}],
				popDisplay:false,
				login:true,
				num:{total:10,left:4}
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			navTo(e){
				const btp = parseInt(e.currentTarget.dataset["btp"]);
				let url;
				switch (btp){
					case 0:
					url = "/person/ice/ice";
						break;
					case 0:
					url = "/person/exchange/exchange";
						break;
				} 
				uni.navigateTo({
					url: url
				}); 
			},
			bindCard(e){
				const url = "/person/bindcard/bindcard";
				uni.navigateTo({
					url: url
				});
			}
		},
		onShow() { 
			if(typeof this.userInfo.SessionKey == "undefined"){
				uni.$emit('navTo',0);
			}
			else{
				this.$u.api.GetUserCoupons({},function(res){
					if(res.errcode == 0){ 
						this.num.total = res.result.Coupons.TotalNumber;
						this.num.left = res.result.Coupons.TotalSurplus;
					}
					console.log(res);
				}.bind(this));
			} 
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>

<style lang="scss" scoped>
@import url('@/common/css/common.scss');
$blue:#b9d2ff;
$white:#ffffff;
$gray:#717f98;
.contain{ padding-top: 80rpx;width: 618rpx; left:66rpx;right:66rpx;display: flex;flex-direction: column;align-items: center;
	.logo{width:232rpx;height: 116rpx;}
	
	
	.noBox{height: 606rpx;width: 100%;display: flex;flex-direction: column;align-items: center;justify-content: center;
		.no{width: 246rpx;height: 78rpx;}
	} 
	
	.list{
		.shadow{box-shadow: 0 0 12rpx 8rpx rgba(197, 217, 255, 0.53);}
		.iceCream{width: 618rpx;height: 205rpx;margin:40rpx 0 38rpx 0;border-radius: 10rpx;overflow: hidden;}
		.classes{width: 618rpx;height: 297rpx;position: relative;border-radius: 10rpx;overflow: hidden;
			.count{top:36rpx;right:16rpx;width: 290rpx;color:#3c78f5;height: 30rpx;display: flex;flex-direction: row;justify-content: flex-end;
				.tips{width: 124rpx;color:$gray;font-size: 24rpx;line-height: 30rpx;}
				.text{max-width: 170rpx;text-align: right;overflow: hidden;line-height: 30rpx;font-size: 24rpx;font-weight: 400;}
			}
			image{width: 618rpx;height: 297rpx;}
		}
	}
	
	.btns{margin-top:100rpx;
		.btn{width: 380rpx;height: 75rpx;background:$blue;font-size: 28rpx;line-height: 75rpx;text-align: center;color:$white;}
	}
}
</style>
