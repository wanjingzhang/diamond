<template> 
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'> 
		<image class="bg abLT full" :src="[OS.CDN+'/static/mall/bg.jpg']" mode="aspectFill"></image>
		<!-- <comp-header :capsule="OS.capsule" type="5" ></comp-header> -->
		<view class="content abFull"> 
			<image class="logo abCC" :src="[OS.CDN+'/static/mall/logo.png']"></image>
			<view class="btns abCT"  v-if="!auto">
				<view class="btnOne btnShadow" @click.stop="gotoMall">跳转商城</view>
			</view> 
		</view>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex'; 
	export default {
		data() {
			return {
				OS:this.$OS,
				menus:[{id:0,name:"我的预约",type:0},
						{id:2,name:"我的礼品卡",type:1},
						{id:2,name:"客服中心",type:2},],
				count:0,
				auto:true,
			}
		},
		methods: {
			gotoMall(e){
				uni.navigateToMiniProgram({
				  appId: 'wxfe7c4e62541a2f99',
				  path: 'pages/shop/index?c='+Math.random()*2,
				  extraData: {
				    'data1': 'test'
				  },
				  success:(res)=>{
				    // 打开成功  
				  },
				  fail:(res)=>{
					  this.auto = false;  
				  }
				})
			}
		},
		onReady(option) { 
			
		},
		onShow(options){
			this.count += 1;
			console.log("gotoAnother",this.count)
			this.$store.dispatch('changePageId',String(4)); 
			
			this.gotoMall();
			console.log("跳转执行完了,show")
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>

<style lang="scss" scoped>
@import url('@/common/css/common.scss');
.bg{width: 750rpx;height: 1624rpx;} 
.content{ padding-top: 80rpx;width: 618rpx; left:66rpx;right:66rpx;display: flex;flex-direction: column;align-items: center;
	.logo{width: 434rpx;height: 148rpx;top: -10%;}  
	.btns{height: 148rpx;top: 55%; text-align: center;}
}	
</style>
