<template>
	<view class="abCT header" :style='{ top: capsule.top,height:capsule.height }' >  
		<view :class="['title abCT', ('type'+type)]">品牌中心</view>
		<view class="btns abLT" v-if="type == 4 || type == 5"> 
			<view class="backBtn" @click.stop='gotoBack'></view>
			<view class="homeBtn" @click.stop='gotoHome'></view>
		</view> 
	</view>
</template>

<script>
	export default {
		name:"header",
		props:{ 
			type: {
				type: Number,
				default: 0, 
			},
			capsule:{
				type: Object,
				default: {} 
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			gotoBack(){
				uni.$emit('gotoBack','abc')
			},
			gotoHome(){
				uni.$emit('navTo',0)
			},
		}
	}
</script>

<style lang="scss" scoped>
@import url("@/common/css/common.scss");
.header{color:#ffffff;text-align: center;height: 60rpx;
	.title{height: 24rpx;font-size: 23rpx;top:18rpx;
		&.type3{color:#000000;}
		&.type5{color:#000000;}
	}
	.btns{background:url("static/com/nav.png");background-size:cover;width: 162rpx; height: 60rpx;left:23rpx;display: flex;
		.backBtn{width:49%;height:100%;}
		.homeBtn{width:49%;height:100%;}
	}
}

</style>
