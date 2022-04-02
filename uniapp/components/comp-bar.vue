<template>
	<view :class='["btns abCB",screenProp]'>
		<view class="btn normal" :class="{active:pageId == 0 ,index:pageId == 0}"  @click.stop="navTo" data-mtp="0">首页</view>
		<view class="btn middle"> 
			<view class="bg abLB" @click.stop="navTo" data-mtp="1" ></view> 
		</view>
		<view class="btn normal" :class="{active:pageId == 2 ,index:pageId == 0}" @click.stop="navTo" data-mtp="2">我的</view>
	</view>
</template>

<script>    	
	import {mapState, mapActions} from 'vuex';
	let app = getApp();
	export default {
		name:"bar",
		data() {
			return {
				OS:this.$OS,
			};
		}, 
		computed:{
			...mapState(['userInfo','pageId'])
		},
		props:{
			screenProp: {
				type: String,
				default: "", 
			} 
		},
		methods:{
			navTo(e){ 
				// 如果没授权调用父组件的授权回调
				if(this.userInfo.IsUesePhone == 2 ||  this.userInfo.IsUeseinfo == 2 ){ 
					this.$emit("startHandler",e);
				}else{
					const mtp = e.currentTarget.dataset["mtp"];
					console.log(mtp)
					if(mtp != this.pageId){
						uni.$emit('navTo',mtp)
					} 
					if(mtp == 1){ 
						app.baiduTrack(['3d',`3D场景`]);
					}
				}
				
			}
		}
	}
</script>

<style lang="scss" scoped>
@import url("@/common/css/common.scss");
$white:#ffffff;
$black:#010101;
.btns{width:642rpx;height: 250rpx;display: flex; flex-direction: row; justify-content: space-around;align-items: flex-end;
	.btn{position: relative;text-align: center;letter-spacing: 10rpx; 
		&.middle{width: 235rpx;height: 250rpx;
			.bg{width: 235rpx;height: 250rpx;background-image: url("static/com/cent.png");background-size: cover;bottom: -40rpx;} 
		}
		&.normal{width: 232rpx;height: 55rpx;line-height: 55rpx;font-size: 23rpx; bottom: 30rpx; color:$white;}
		&.index{color:$black;}
		&.active{
			&:after{
				display: block;width:104rpx;height:3rpx;content: " ";background-color: #b9d2ff;transform: translate(50%, 0);
			}
		}
	}
} 

.screen189{ 
	&.btns{
		bottom: 40rpx !important ;
	} 
} 



.screen159,.screen169{   
	&.btns{
		bottom: -10rpx;
	} 
}
 
 
	
</style> 
