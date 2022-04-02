<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]' class="active">
		<image class="bg abLB full" :src="[OS.CDN+'/static/act/bg.jpg']"  mode="aspectFill"></image>
		<comp-header :capsule="OS.capsule" type="5" ></comp-header>
		<view class="content abLT full" :style='{ top: OS.articleTop }' >
			<!-- <image class="no" :src="[OS.CDN+'/static/act/no.png']" mode="aspectFit"></image> -->
			<image class="logo" :src="[OS.CDN+'/static/bk/bkd/logo.png']" ></image>
			<image class="tit1" :src="[OS.CDN+'/static/act/txt1.png']" ></image>
			
			<scroll-view scroll-y="" class="list">
				<view v-if="listData &&listData.length > 0" class="item" v-for="(item,index) in listData" :key="index">
					<image class="mask" :src="[OS.CDN+'/static/act/mask.png']"></image>
					<view class="picbox" :data-id="item.CurriculumID" @click="toDetail">
						
						<image class="pic" :src="item.CurriculumImg" mode="aspectFill" ></image>
						<view class="txts1">
							<view class="txt1">「{{item.Name}}」</view>
							<view class="date"><image class="i_date" :src="[OS.CDN+'/static/act/i_date.png']"></image> <text v-if="item.StartTime != null" class="txt3">{{item.StartTime.substr(0,16)}}</text></view>
						</view>
						<image class="i_free" v-if="!item.IsPay" :src="[OS.CDN+'/static/act/i_free.png']"></image>
					</view>
					<view class="txts2">
						<view class="txt3"><image class="i_map" :src="[OS.CDN+'/static/act/i_map.png']"></image> <text class="txt4">{{item.Place}}</text></view>
						<image class="i_detail" :src="[OS.CDN+'/static/act/i_detail.png']" :data-id="item.CurriculumID" @click.stop="toDetail"></image>
					</view>
				</view>
			</scroll-view>
			<view class="btn" @click="toBusiness" hover-stay-time="1000" hover-class="noPointer">商务合作</view>
			<comp-service></comp-service>
		</view> 
    <comp-pop :display="popDisplay" :pid="pop.id" :btype="pop.btype" :wtype="pop.wtype" :ttype="pop.ttype" @popBack="popBack"></comp-pop>
		<comp-pickup :display="pickup"></comp-pickup>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex'; 
	let app = getApp(),$query;
  const pops =[{
  	id:0,
  	btype:[{name:"返回",type:"cancel"}], // 按钮数组
  	wtype:0, // 0大框
  	ttype:"txt14", // 提示类型 
  	desc:"扫码加客服"
  }]
	export default {
		data() {
			return {
				appData:{...app.globalData},
				OS:this.$OS, 
				listData:[],
				showQR:false,
        popDisplay:false,
        pop:{}
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			getList(){
				this.$u.api.GetActivitiesList({},(res)=>{
					console.log(res);
					if(res.errcode==0){
						this.listData =res.result.Data
					}
				})
			},
			toBusiness (){
				app.baiduTrack(['businesswork',`商务合作`,]); 
         this.popDisplay = true;
         this.pop = pops[0];
				// uni.navigateTo({
				// 	url: `/pages/webview/webview?url=https://work.weixin.qq.com/u/vc615ad76f10f07f77?v=4.0.2.84632`, 
				// 	animationType: 'fade-in',
				// 	animationDuration: 300
				// })
			}, 
      popBack(e){
        this.popDisplay = false;
      },
			toDetail(e){
				let {id} = e.currentTarget.dataset;
				console.log(id);
				uni.navigateTo({
					url:"/pages/recentAct/detail?id=" + id
				})
				
			},
		},
		onLoad(){
			this.getList()
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>

<style lang="scss" scoped>
@import url('@/common/css/common.scss');
 .content{height: 80%;display: flex;flex-direction: column;align-items: center; 
	.no{width: 148rpx;height: 36rpx;}
 }	
 .logo{width: 232rpx;height: 54rpx;}
 .tit1{width: 145rpx;height: 33rpx;margin: 23rpx auto 0;}
 .list {width: 100%;height: calc(100% - 300rpx);margin-top: 40rpx;}
 .list .item{position: relative;width: 100%;padding-bottom: 20rpx;padding-top: 40rpx;}
 .list .item .mask{width: 277rpx;height: 289rpx;position: absolute;right: 0;bottom: 0;pointer-events: none;}
 .active .btn{position:relative;font-size:22rpx;color:#fff;box-shadow:5rpx 5rpx 10rpx rgba(0,0,0,.2);background:#b9d2ff;width:380rpx;height:68rpx;display:flex;align-items:center;justify-content:center;font-size:26rpx;font-weight:bold;letter-spacing:5rpx;margin:50rpx auto 0;}
 .list .item .picbox{width: 660rpx;height: 288rpx;position: relative;margin: 0 auto;}
 .list .item .txts2{}
 .list .item .pic{width: 100%;height: 100%;position: absolute;left: 0;top:0;}
 .list .item .i_free{width: 110rpx;height: 48rpx;position: absolute;left:18rpx;top:-8rpx;}
 .list .item .txts1{display: flex;justify-content: center;background: rgba(0,0,0,.5);color: #fff;position: relative;align-items: center;flex-direction: column;height: 100%;}
 .list .item .txt3{display: flex;vertical-align: middle;font-size: 24rpx;}
 .list .item .txt1{display: block;font-size: 36rpx;}
 .list .item .date{display: block;font-size: 24rpx;display: inline-flex;align-items: center;}
 .list .item .txts2{display: flex;justify-content: space-between;width: 660rpx;margin: 20rpx auto 0;padding: 0 20rpx;box-sizing: border-box;position: relative;}
 .list .item .i_date{width: 21rpx;height: 21rpx;margin-right: 8rpx;display: inline-block;vertical-align: middle;}
 .list .item .i_map{width: 18rpx;height: 23rpx;margin-right: 8rpx;display: inline-block;vertical-align: middle;margin-top: 6rpx;}
 .list .item .i_detail{width: 138rpx;height: 31rpx;right:20rpx;margin-top: 6rpx;}
 .list .item .txt4{color: #8ca7d9;font-size: 24rpx;display: inline-block;vertical-align: middle;max-width: 460rpx;}
 .cardQR{z-index: 99;
	.bg{background-color: rgba(0,0,0,0.5);}
	.qrcode{width:396rpx;height:396rpx;}
 }

</style>
