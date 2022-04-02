<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<image class="bg abLB full" :src="[OS.CDN+'/static/my/list/bg.jpg']" mode="aspectFit"></image>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<view class="content abFull" :style='{ top: OS.articleTop }'>
			
			
		</view>
	</view>
</template>

<script> 
	const app = getApp();
	export default {
		data() {
			return {
				OS:this.$OS,
			}
		},
		methods: {
			
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>

<style lang="scss" scoped>
@import url('@/common/css/common.scss');
.contain{ padding-top: 80rpx;width: 618rpx; left:66rpx;right:66rpx;display: flex;flex-direction: column;align-items: center;

}	
</style>
