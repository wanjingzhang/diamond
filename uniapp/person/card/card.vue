<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<image class="bg abLB full" :src="[OS.CDN+'/static/bk/bkd/bg.jpg']" mode="aspectFill"></image>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<view class="content abFull" :style='{ top: OS.articleTop }'>
			
			
		</view>
	</view>
</template>

<script> 
	export default {
		data() {
			return {
				OS:this.$OS,
				menus:[{id:0,name:"我的预约",type:0},
						{id:2,name:"我的礼品卡",type:1},
						{id:2,name:"客服中心",type:2},],
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
