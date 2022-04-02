<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<image class="bg abLB full" :src="[OS.CDN+'/static/my/list/bg.jpg']" mode="aspectFill"></image>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<view class="content abFull" :style='{ top: OS.articleTop}'>
			<image class="logo" :src="[OS.CDN+'/static/my/ice/logo.png']" mode="widthFix"></image>
			<view class="qrcode">
				<image class="qrcodebg full abLT" :src="[OS.CDN+'/static/my/ice/ercodebg.png']" mode="aspectFill"></image>
				<image class="qrimg" :src="qrCodeUrl" mode="aspectFill"></image>
			</view>
			
			<image class="notice" :src="[OS.CDN+'/static/my/ice/notice.png']" mode="aspectFill"></image> 
			<view class="btns">
				<view class="btn" :class='{freeze:IsWriteoff==true}'> 
					{{menus[IsWriteoff==true?1:0].name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex'; 
	const app = getApp();
	export default {
		data() {
			return {
				OS:this.$OS,
				menus:[{id:0,name:"未使用",type:0},{id:1,name:"已使用",type:1}], 
				qrCodeUrl:'',
				IsWriteoff:false, // 是否核销过
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			
		},
		onReady() { 
			if(typeof this.userInfo.SessionKey == "undefined"){
				uni.$emit('navTo',0);
			}
			else{
				this.$u.api.GetUserCoupons({},function(res){
					if(res.errcode == 0){
						this.qrCodeUrl = res.result.Rookievoucher.QRCodeImg;
						this.IsWriteoff = res.result.Rookievoucher.IsWriteoff; 
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
$gray:#cdcdcd;
.content{ padding-top: 80rpx; left:66rpx;right:66rpx;display: flex;flex-direction: column;align-items: center;
	.logo{width: 232rpx;}
	.qrcode{width: 544rpx;height:384rpx;margin:80rpx 0 35rpx;position: relative; display: flex;justify-content: center;align-items: center;
		.qrcodebg{width: 544rpx;height:384rpx;top: 12rpx;}
		.qrimg{width: 200rpx;height:200rpx;z-index: 1;}
	}
	.notice{width: 546rpx;height: 384rpx;}
	
	.btns{margin-top:100rpx;
		.btn{width: 380rpx;height: 75rpx;background:$blue;font-size: 28rpx;line-height: 75rpx;text-align: center;color:$white;
			&.freeze{background:$gray;}
		}
	}
}	

.screen159,.screen169{
	.content{bottom:0;
		.qrcode{margin: 0 0 5rpx;}
		.notice{margin: 20rpx 0 40rpx;}
		.btns{margin-top:0rpx;height: 75rpx;}
	} 
}

</style>
