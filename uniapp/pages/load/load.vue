<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' class="page full abLT"> 
		<image class="abLT full" mode="aspectFill" :src="[OS.CDN+'/static/ld/bg.jpg']"></image>
		<view class="content abCC">
			<image class="logo abCT" :src="[OS.CDN+'/static/ld/logo.png']"></image>
			<view class="percentBar abLT">
				<view class="bar" :style='{width: percent + "%"}' ></view>
			</view>
			<view class="num abCT">
				{{percent}}%
			</view>
		</view> 
		<comp-header :capsule="OS.capsule" type="2" ></comp-header>
	</view>
</template>

<script>   
	export default {
		data() {
			return {
				percent:50, 
				OS:this.$OS
			}
		},
		components:{ 
			
		},
		methods: {
			opening(){
				let perInterval = setInterval(()=>{
					if(this.percent > 96){
						clearInterval(perInterval);
						this.percent = 100;
						
						setTimeout(()=>{
							// 跳转页面
							uni.reLaunch({
								url:'/pages/main/main'
							}) 
						},500)
						
					}else{
						this.percent += Math.ceil((Math.random()*3));
					} 
				},80);
			} 
		},
		created() {
			this.opening();
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>
 
<style lang="scss" scoped>
	@import url("@/common/css/common.scss");
	.logo{height:68rpx;width: 293rpx;}
	.content{width:500rpx;height: 270rpx;
		.percentBar{top:163rpx;height:7rpx;width:100%;background:rgba($color: #ffffff, $alpha: 0.38);
			.bar{width:0%;height: 100%;background:#ffffff;}
		}
		.num{
			top:230rpx;text-align: center;color:#ffffff;
		}
	}
</style>