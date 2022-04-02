<template>
	<view v-if="svsShow" class="sysPicker full abLT">
		<view class="cls full" @click.stop="cls"></view>
		<view class="pickerBox abLB">
			<view class="title">客服中心</view>
			<button class="option" open-type="contact" @contact="msgHandler" data-btp="0">在线客服</button> 
			<!-- <view class="option" @click='msgHandler' data-btp="1">客服电话</view> -->
		</view> 
	</view>
</template>

<script> 
import {mapState, mapActions} from 'vuex';
const app = getApp();
	// '客服中心', '在线客服', '客服电话'
	export default {
		name:"sysPicker",
		props:{
			display:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				
			};
		},computed:{
			...mapState(['svsShow'])
		}, 
		methods:{ 
			cls(){
				this.$store.dispatch('hidesvs')
			},
			msgHandler(e){ 
				const dtp = parseInt(e.currentTarget.dataset['btp']); 
				console.log(dtp)
				if(dtp == 1){ 
					this.cls();
					app.baiduTrack(['service_phone',`客服电话`,]); 
					uni.makePhoneCall({
						phoneNumber: '114' //仅为示例
					});
					// uni.showActionSheet({
					// 	itemList: ['客服电话','呼叫'],
					// 	success: function (res) { 
					// 		console.log('选中了第' + (res.tapIndex) + '个按钮'); 
					// 		const index2 = res.tapIndex;
					// 		if(index2 == 1){
								
					// 		}
					// 	},
					// 	fail: function (res) {
					// 		console.log(res.errMsg);
					// 	}
					// }); 
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import url("@/common/css/common.scss");
$white:#ffffff;
$gray:#e4e4e4;
$gray2:#f7f7f7;
.sysPicker{background-color: rgba($color: #000000, $alpha: 0.5);z-index: 10;
	.pickerBox{
		width: 100%;background-color: $gray;border-bottom: 10rpx solid $white;border-radius: 20rpx 20rpx 0 0;overflow: hidden;
		.title{height: 120rpx;line-height: 120rpx;text-align: center;font-size:30rpx;background-color: $white;margin-bottom: 4rpx;}
		.option{height: 120rpx;line-height: 120rpx;text-align: center;font-size:30rpx;background-color: $white;border-bottom: 1rpx solid $gray2;}
	}
	
}

</style>
