<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]' class="dinnerDetail">
		
		<view class="scrollView abFull" :style='{top:OS.articleTop}'>
			<view class="bannerBox">
				<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000" :circular="true" class="banner" :current="current" @change="swiperChange">
					<swiper-item v-for="item,index in ImgUrl" :key="index">
						<view class="swiper-item" >
							<image class="img" :src="item.ImgUrl" mode="aspectFill"></image>
						</view>
					</swiper-item> 
				</swiper>
				<image class="preImg" :src="[OS.CDN+'/static/bk/dtail/left.png']" mode="widthFix" @click="pre"></image>
				<image class="nextImg" :src="[OS.CDN+'/static/bk/dtail/right.png']" mode="widthFix" @click="next"></image>
				
				<view class="titleBox">
					<view class="tit">{{info.Name}}</view>
					<view class="state">预约中</view>
					
					<view class="addr">
						<view class="lab">地址：</view>
						<view class="val">{{info.Place}}</view>
					</view>
					<view class="datebox">
						<view class="date">时间：{{startTime}}</view>
						<view class="num">{{number}}人已预约</view>
					</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y="true" class="scroll">
			<view>
				<view class="tit1">
					<text class="tit2"><text class="txt">活动详情</text><text class="span"></text></text>
				</view>
				<view class="detailScroll">
					<view class="s_tit">活动详情</view>
					<view class="s_txt"><rich-text :nodes='info.Technologicalprocess'></rich-text></view>
				</view>
			</view>
		</scroll-view>
		<view class="botBox">
			<view class="b_txt">剩下名额:{{numberleft}}位</view>
			<view class="btn" @click="toBooking" hover-stay-time="1000" hover-class="noPointer">立即预约</view>
		</view>
		<comp-header :capsule="OS.capsule" type="5" ></comp-header>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex';  
	let app = getApp(),that,$query;
	export default {
		data() {
			return {
				appData:{...app.globalData},
				OS:this.$OS,
				number:0,			//已预约
				numberleft:0,  	//剩余名额
				startTime:"",//时间
				ActivitiesInfo:{},
				info:{},
				ImgUrl:[],
				current:0,
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad(options){
			$query = options;
			app.baiduTrack(['activitydetail',`近期活动详情页`,]); 
		},
		onReady() {
			// if(typeof this.userInfo.SessionKey == "undefined"){
			// 	uni.$emit('navTo',0);
			// }else{
			// 	this.renderData();
			// }
			this.renderData()
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		},
		methods: {
			renderData(){
				this.$u.api.GetActivitiesInfo({CurriculumID:$query.id},(res)=>{
					if(res.errcode == 0){
						this.info = res.result.CurriculumData[0];
						this.startTime = res.result.TimePeriod;
						this.number = res.result.SubscribeUserCount;
						this.numberleft = res.result.SurplusCount  ;
						this.ImgUrl = res.result.ImgUrl  ;
						uni.setStorageSync("recentActData",res.result);
					}
					console.log(res);
				});
			},
			toBooking(){
				if(this.numberleft == 0){
					uni.showToast({
						icon:"none",
						title:"预约人数已满"
					})
				}else{
					uni.navigateTo({
						url: '/pages/recentAct/booking'
					});
				} 
			},
			
			swiperChange(e){
				this.current = e.detail.current
			},
			pre(){
				if(this.current == 0){
					this.current = this.ImgUrl.length-1;
				}else if(this.current > this.ImgUrl.length-1){
					this.current --
				}
			},
			next(){
				if(this.current ==  this.ImgUrl.length-1){
					this.current = 0;
				}else if(this.current <  this.ImgUrl.length-1){
					this.current ++
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
@import url("@/common/css/common.scss");

.screen159.dinnerDetail, .screen169.dinnerDetail{ 
	.scroll{
		.tit1{
			margin: 20rpx auto !important; 
		}
	} 
	.scroll{top:730rpx;}
}
</style>
<style scoped>
.noPointer{
	pointer-events: none;
}
.dinnerDetail .scrollView{  
	padding-top: 10rpx;
	box-sizing: border-box;
	background: #F5F6FA;
}
.dinnerDetail .bannerBox{
	position: relative;
}
.dinnerDetail .banner{
	width: 100%;
	height: 448rpx;
}
.dinnerDetail .banner .img{
	width: 100%;
}

.dinnerDetail .preImg{
	position: absolute;
	width: 48rpx;
	left: 36rpx;
	top: 50%;
	transform: translateY(-50%);
}
.dinnerDetail .nextImg{
	position: absolute;
	width: 48rpx;
	right: 36rpx;
	top: 50%;
	transform: translateY(-50%);
}
.dinnerDetail .titleBox{border: solid 1px ##B9D2FF;background: #FFFFFF;border-radius: 16rpx;width: 678rpx;position: absolute;left: 36rpx;top: 370rpx;box-shadow: 5rpx 5rpx 10rpx rgba(185,210,255,.5);overflow: hidden;padding-top: 88rpx;padding-bottom: 24rpx;}
.dinnerDetail .titleBox .tit{font-size: 32rpx;color: #000;font-weight: bold;position: absolute;top: 24rpx;left: 40rpx;}
.dinnerDetail .titleBox .addr{font-size: 24rpx;color: #000;opacity: .6;padding: 0 40rpx;display: flex;}
.dinnerDetail .titleBox .addr .lab{flex: none;;}
.dinnerDetail .titleBox .state{color: #fff;background: #B9D2FF;padding: 4rpx 40rpx 4rpx 24rpx;border-radius: 100rpx;position: absolute;font-size: 20rpx;position: absolute;right: -20rpx;top: 31rpx;}
.dinnerDetail .titleBox .datebox{font-size: 24rpx;color: #000;padding: 0 40rpx;display: flex;justify-content: space-between;margin-top: 8rpx;}
.dinnerDetail .titleBox .datebox .date{opacity: .6;font-size: 24rpx;}
.dinnerDetail .titleBox .num{font-size: 20rpx;color: #000;opacity: .2;}

.dinnerDetail .tit1{
	font-size: 28rpx;
	color: #000;
	font-weight: bold;
	margin: 40rpx auto;
	text-align: center;
}

.dinnerDetail .tit2{
	position: relative;
}

.dinnerDetail .tit2 .txt{
	z-index: 1;
	position: relative;
}

.dinnerDetail .scroll{
	width: 678rpx;
	position: absolute;
	left: 36rpx;
	top: 750rpx;
	bottom: 194rpx;
}

.dinnerDetail .detailScroll{
	border: solid 1px ##B9D2FF;
	background: #FFFFFF;
	border-radius: 16rpx;
	width: 678rpx;
	box-shadow: 0rpx 3rpx 16rpx 0rpx rgba(185, 210, 255, 0.7), 0rpx 5rpx 14rpx 0rpx rgba(0, 0, 0, 0.04);
	overflow: hidden;
	padding: 36rpx;
	box-sizing: border-box;
	margin-bottom: 36rpx;
}

.dinnerDetail .span{
	width: 72rpx;
	height: 12rpx;
	background: linear-gradient(90deg, #E9F2FF 0%, #B9D2FF 100%);
	position: absolute;
	left: 0;
	bottom: 0rpx;
	display: block;
	z-index: 0;
}

.dinnerDetail .detailScroll .s_tit{
	font-size: 24rpx;
	font-weight: 500;
	color: #000000;
	line-height: 36rpx;
	text-shadow: 0rpx 3rpx 16rpx rgba(185, 210, 255, 0.7);
}

.dinnerDetail .detailScroll rich-text{
	font-size: 24rpx;
	font-weight: 400;
	color: #000000;
	line-height: 54rpx;
	text-shadow: 0px 3px 16px rgba(185, 210, 255, 0.7);
	text-indent: 2em;
	opacity: .6;
}

.dinnerDetail .detailScroll .s_img{
	width: 100%;
	display: block;
	margin: 20rpx auto;
}

.dinnerDetail .botBox{
	width: 100%;
	height: 194rpx;
	background: #FFFFFF;
	border: 1px solid #F5F6F8;
	position: absolute;
	bottom: 0;
	left: 0;
}

.dinnerDetail .b_txt{
	font-size: 22rpx;
	font-weight: 400;
	color: #636466;
	position: absolute;
	top: 24rpx;
	width: 100%;
	text-align: center;
}

.dinnerDetail .btn{
	position: absolute;
	font-size: 22rpx;
	color: #fff;
	box-shadow: 5rpx 5rpx 10rpx rgba(0,0,0,.2);
	background: #b9d2ff;
	width: 380rpx;
	height: 68rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	font-weight: bold;
	letter-spacing: 5rpx;
	top: 74rpx;
	left: 50%;
	margin-left: -190rpx;
}
</style>
