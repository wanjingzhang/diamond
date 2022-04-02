<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<image class="bg abLB full" :src="[OS.CDN+'/static/my/my/bg.jpg']" mode="aspectFill"></image>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<view class="content abFull" :style='{ top: OS.articleTop }'>
			<view class="box abCC">
				 <view class="headBox" @click.stop="LoginHandler"  :data-bid="3">
					 <image class="head full" :src="[userInfo.hasOwnProperty('UserImg') ? userInfo.UserImg : headImg]" ></image>
				 </view>
				 <view class="nickName">{{userInfo.UserName}}</view>
				 <view class="btns">
				 	<view v-for="(item,index) in menus" class="btn btnShadow" @click.stop="navTo" :data-bid="index"> 
				 		{{item.name}}
				 	</view> 
				 </view> 
				 <view class="bookBox">
					 <view class="line"></view>
					 <!-- <view class="books">
						 <image class="book b1" :src="[OS.CDN+'/static/my/my/1.jpg']"></image>
						 <image class="book b2" :src="[OS.CDN+'/static/my/my/2.jpg']"></image>
						 <image class="book b3" :src="[OS.CDN+'/static/my/my/3.jpg']"></image>
					 </view> --> 
					 <!-- <u-scroll-list v-if="Array.isArray(data)" :indicator="false"> -->
					 <view class="books" >
						 <view v-for="(item,index) in data" :key="index" :data-id="index" @click.stop="detailHandler">
							 <image class="book" :src="item.Img" mode="aspectFill"></image>
						 </view> 
					 </view>
					 <!-- </u-scroll-list> -->
				 </view>
			</view> 
		</view> 
		<comp-bar :screenProp="OS.screenProp" ></comp-bar>
		<comp-auth ref="auth" @AuthAll="AuthAll"></comp-auth>
		<comp-pickup :display="pickup"></comp-pickup>
	</view>
</template>

<script> 
import {mapState, mapActions} from 'vuex';  
const menus = {1:"tp1",2:"tp1",3:"tp1",4:"tp2",5:"tp2"};  // 类型：1 瑜伽课 2 冥想课  3 活动列表 4 餐厅 5 品茗
const app = getApp();
	export default {
		data() {
			return {
				OS:this.$OS,
				menus:[{id:0,name:"我的预约",type:0},
						{id:2,name:"我的礼品卡",type:1},
						{id:2,name:"客服中心",type:2},], 
				headImg:"static/my/my/head.png",
				nickName:"哈哈",
				pickup:true,
				list:null,
				data:null,
			}
		},
		computed:{
			...mapState(['userInfo','pageId'])
		}, 
		methods: {
			detailHandler(e) {
				const id = e.currentTarget.dataset["id"];
				const bid = this.data[id]["ID"];
				let type = this.data[id]["Type"]; // 类型：1 瑜伽课 2 冥想课  3 活动列表 4 餐厅 5 品茗
				console.log(type , "类型：1 瑜伽课 2 冥想课  3 活动列表 4 餐厅 5 品茗");
				
				let tp2 = type;
				tp2 = tp2 == 4? 2 : tp2 == 1? 3 : 4; 
				
				const url = String(`/bk/${menus[type]}/booked/booked?bid=${bid}&type=${tp2}`);
				console.log(url);
				uni.navigateTo({
					url:url
				}) 
				
				console.log(type)
			},
			navTo(e){ 
				// 这里判断授权，没授权 弹窗出来 
				this.$refs.auth.startHandler(e);  
			}, 
			AuthAll(e){
				console.log("全部授权完成")
				if(e.staystill){
					uni.$emit('navTo',0);
				}else{
					const id = parseInt(e.currentTarget.dataset["bid"]);
					switch (id){
						case 0:
							uni.navigateTo({
								url:'/person/books/books'
							})
							break;
						case 1:
							uni.navigateTo({
								url:'/person/cardlist/cardlist'
							})
							break;
						case 2:
							uni.$emit('service');
							break;
						case 3:
							// 不用管
							break;
						default:
							break;
					}
				}
				
			},
			LoginHandler(e){
				if(this.userInfo.IsUesePhone == 2 || this.userInfo.IsUeseinfo == 2){ 
					this.$refs.auth.startHandler(e);  
				}
			}
		},
		onLoad(){ 
			this.$u.api.RecentAppointment({},(res)=>{ 
				if(res?.errcode == 0){
					console.log(res)
					if(res?.result?.Data && res.result.Data.length >0){
						this.data = res.result.Data; 
						console.log(JSON.stringify(this.data)); 
					}else{
						this.list = null;
					} 
				}
				
			})
		},onShow(){ 
			// 这里强制同步pageID 
			this.$store.dispatch('changePageId',String(2)); 
		},
		onShareAppMessage() {
			return app.onShareAppMessage(); 
		}
	}
</script>

<style lang="scss" scoped>
@import url("@/common/css/common.scss"); 
$blue: #b9d2ff;
$white: #ffffff;
$blueBorder: #7da0f7;
.bg{}
.content{
	.box{height: 90%;width:694rpx;display: flex;flex-direction: column; align-items: center;
		.headBox{width:254rpx;height: 254rpx;border-radius: 50%;overflow: hidden;
			
		}
		.nickName{color:#3c78f5;font-size: 26rpx;margin: 58rpx 0 82rpx 0 ;}
		.btns{width:386rpx; 
			.btn{background-color: $blue;text-align:center;height: 75rpx;line-height: 75rpx;width: 100%;margin-bottom: 48rpx;color:$white;font-weight: 500;}
		}
		.bookBox{width:100%;height: 280rpx;
			.line{background:url("static/my/my/line.png");width:750rpx;height: 28rpx;background-size: cover;margin-left: -28rpx; margin-bottom: 25rpx;}
			.books{
				width:100%; display:flex;flex-direction:row;justify-content: space-evenly;
				.book{width: 216rpx;height: 216rpx;background-size: cover;border:2rpx solid $blueBorder;
					.b1{background:url("");}
					.b2{background:url("static/my/my/2.jpg");}
					.b3{background:url("static/my/my/3.jpg");}
				}
			}
			
		}
	} 
} 
.screen169,.screen159{
	.content{
		.box{height: 99%;
			.nickName{margin: 18rpx 0 22rpx 0 ;}
			.btns{
				.btn{
					margin-bottom: 22rpx;
				}
				margin-bottom: 22rpx;
			}
		}
	}
}

</style>
