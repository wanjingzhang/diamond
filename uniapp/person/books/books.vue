<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<image class="bg abLB full" :src="[OS.CDN+'/static/my/list/bg.jpg']" mode="aspectFill"></image>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<view class="content abFull" :style='{ top: OS.articleTop }'>
			<view class="menus">
				<view v-for="(item,index) in menus" class="menu" :class='{active:index==selected}' @click.stop="changeType" :data-bid="item.id"> 
					{{item.name}}
				</view> 
			</view>
			<image class="logo" :src="[OS.CDN+'/static/my/books/logo.png']" ></image>
			<view class="books">
				<u-swiper v-if="Array.isArray(list3)"
						:list="list3" 
						height="400"
						:circular="false"
						:autoplay="false"
						radius="5"
						previousMargin="70"
						nextMargin="70" 
						bgColor="rgba(0,0,0,0)" 
						mode="aspectFill"
						@change="change"
						:current="current"
				></u-swiper>
				<view v-if="list3.length > 0">
					<view class="detail">
						<view class="tit">「{{menus[selected].name}}」</view>
						<view v-if="Data[current]['SubscribeUserType'] != 1" class="status" :class="{fail:Data[current]['SubscribeUserType'] == 2}" >{{status[Data[current]["SubscribeUserType"]]}}</view>
						<view v-else-if="Data[current]['SubscribeUserType'] == 1" class="status clock" >{{Data[current]["StartTime"]}}</view>
					</view>
					<view class="btns">
						<view class="btn btnShadow" :data-type="menus[selected].type" @click.stop="detailHandler">查看详情</view>
					</view>
				</view> 
				<view v-else class="noBox abLT">
					<image class="no"  :src="[OS.CDN+'/static/bk/bkd/no.png']" mode="aspectFit"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex'; 
	const status = {1:'成功预约',2:'预约失效',3:'预约审核中',4:'已核销',5:'已过期'};
	const app = getApp();
	export default {
		data() {
			return {
				OS:this.$OS,
				menus:[{id:0,name:"瑜伽课程",type:0,path:"tp1"},
						{id:1,name:"冥想课程",type:1,path:"tp1"},
						{id:2,name:"餐厅预约",type:2,path:"tp2"},
						{id:3,name:"品茗预约",type:3,path:"tp2"},
						{id:4,name:"近期活动",type:4,path:"tp1"}
					],
				list3:null,
				Data:[],
				selected:0, 
				current:0, 
				status:status
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		methods: {
			// 轮播切换事件
			change(e) {
				// 当前的激活索引 
				if(typeof e.current == "number"){
					const { current } = e;
					this.current = current 
				}
				
			},
			changeType(e){ 
				const bid = e.currentTarget.dataset["bid"];
				this.selected = parseInt(bid); 
				this.loadList(bid);
			}, 
			detailHandler(e){  
				const type = e.currentTarget.dataset['type']; 
				const bid = (this.selected <2 || this.selected >3) ? this.Data[this.current].CurriculumUserID:this.Data[this.current].SubscribeUserID;
				console.log(type, " - ",bid);
				let url = String(`/bk/${this.menus[this.selected]['path']}/booked/booked?bid=${bid}&type=${type}`); 
				 
				console.log(url);
				uni.navigateTo({
					url:url
				}) 
			},
			makeData(data){
				// 造图片数据
				// Restaurant_Siptea_Img: "https://adama.beats-digital.com/adamaAdmin/assets/%E9%BB%98%E8%AE%A4%E5%9B%BE%E6%A0%87.png"
				// StartTime: "2022-03-25 00:00"
				// SubscribeUserID: 2
				// SubscribeUserType: 3 
				if(data.length > 0){
					this.Data = data;
					let imgs = [];
					data.map((item)=>{imgs.push(item.Restaurant_Siptea_Img)});
					this.current=0;
					this.list3 = imgs;
				}else{
					this.current=0;
					this.Data = [];
					this.list3 = null;
				} 
			},
			loadList(bid){ 
				switch (bid){
					case 0:
					case 1: 
						bid += 1;
						console.log(bid);
						//类型 1 瑜伽课 2 冥想课 3 活动列表
						this.$u.api.GetSubscribeUserList({Type:bid},(res)=>{
							// 获取列表
							if(res.errcode == 0 && res.result.Data.length>0){
								console.log(res.result.Data) 
								this.makeData(res.result.Data);
								
							}else{
								this.current = -1;
								this.makeData([])
							}
						})
						break;
					case 4: 
						this.$u.api.GetSubscribeUserList({Type:3},(res)=>{
							// 获取列表
							if(res.errcode == 0 && res.result.Data.length>0){
								console.log(res.result.Data) 
								this.makeData(res.result.Data);
							}else{
								this.makeData([])
							}
						})
						break;
					case 2:
					case 3:
						bid = (bid % 2) + 1;
						console.log(bid);
						//  类型 1 餐厅 2 品茗
						this.$u.api.GetSipteaSubscribeUserList({Type:bid},(res)=>{
							// 获取列表
							if(res.errcode == 0 && res.result.Data.length>0){
								console.log(res.result.Data) 
								this.makeData(res.result.Data);
							}else{
								this.makeData([])
							} 
						})
						break;
					default:
						break;
				} 
			}
		},
		onReady() { 
			if(typeof this.userInfo.SessionKey == "undefined"){
				uni.$emit('navTo',0);
			}
			else{
				this.loadList(0);
			}
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>

<style lang="scss" scoped>
@import url('@/common/css/common.scss');
$fontColor:#b9d2ff;
$activeColor:#3c78f5;
$title:#4a566a;
$status:#4a566a;
$blue:#b9d2ff;
$white:#ffffff;
$fail:#3c78f5;
.content{ padding-top: 80rpx;width: 100%; display: flex;flex-direction: column;align-items: center;
	.menus{border-top: 1rpx solid $fontColor;border-bottom: 1rpx solid $fontColor; width:100%;display: flex;flex-direction: row;justify-content: space-evenly;
		.menu{height: 58rpx;font-size: 22rpx;line-height: 58rpx;color: $fontColor;
			&.active{color:$activeColor;border-bottom: 2rpx solid $activeColor;
			}
		}
	}
	.logo{width: 229rpx;height: 113rpx;margin:50rpx 0 48rpx 0;}
	.books{height: 758rpx;width:100%; position: relative;
		.detail{margin-top:34rpx;text-align: center;
			.tit{color:$title;font-size:35rpx;text-align:center;margin-bottom:22rpx;font-weight: 600;}
			.status{color:$status;font-size:24rpx;text-align:center;position: relative;width:auto;display: inline-block;
				&.fail{color:$fail;}
				&.clock:after{content:" ";display:block;width:22rpx;height:22rpx;background-image: url("static/bk/bkd/clock.png");background-size: cover; position: absolute;top: 6rpx;left: -26rpx;}
			}
		} 
		.btns{margin-top:90rpx;
			.btn{width: 380rpx;height: 75rpx;background:$blue;line-height: 75rpx;font-size: 27rpx;font-weight: 600;margin: auto;text-align: center;color:$white;}
		}
		.noBox{ width:100%;height: 80%;display: flex;justify-content: center;align-items: center;
			.no{width: 146rpx;height: 36rpx;}
		}
	}
} 

.screen159,.screen169{
	.content{
		.logo{margin:20rpx 0 28rpx 0;}
		.books{.btns{margin-top: 20rpx;}
		}
	}
} 
</style>
<style>
	.u-swiper,.u-swiper__wrapper{height: 642rpx !important;} 
	.u-swiper__wrapper__item__wrapper{box-shadow: 5rpx 5rpx 10rpx rgba(0,0,0,.2);}
	.u-swiper .u-swiper__wrapper image{height: 642rpx !important;border-radius:0 !important;}
	
	.screen169 .u-swiper,.u-swiper__wrapper{height: 542rpx !important;}
	.screen169 .u-swiper .u-swiper__wrapper image{height: 542rpx !important;border-radius:0 !important;}
</style>
