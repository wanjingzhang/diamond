<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]' class="yogabooking">
		<image class="bg abLT" :src="[OS.CDN+ '/static/bk/booking/bg.jpg']" mode="aspectFill"></image>
		<view  class="scrollView" :style='{height: OS.articleHeight,top:OS.articleTop}'>
			<image class="formBg" :src="[OS.CDN+'/static/image_tool/bg1.png']" mode="widthFix"></image>
			
			<image class="logo" :src="[OS.CDN+'/static/bk/bkd/logo.png']" mode="widthFix"></image>
			<image class="confirm" :src="[OS.CDN+'/static/bk/bkd/confirm.png']" mode="widthFix"></image>
			<scroll-view scroll-y="true" class='scroll'>
				<view class="formBox">
					<view class="formItem">
						<view class="lab">称谓</view>
						<view class="sexVal">
							<view class="selItem" @click="chooseSex('女士')">
								<image v-show="sex == '女士'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel.png']" ></image>
								<image v-show="sex == '先生'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel_.png']" ></image>
								<view class="txt">女士</view>
							</view>
							<view class="selItem"  @click="chooseSex('先生')">
								<image v-show="sex == '先生'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel.png']"></image>
								<image v-show="sex == '女士'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel_.png']"></image>
								<view  class="txt">先生</view>
							</view>
						</view>
					</view>
					<view class="formItem">
						<view class="lab">姓名</view>
						<view class="val">
							<input class="input" type="text" v-model="name" placeholder="请填写姓名" placeholder-class="pla"/>
						</view>
					</view>
					<view class="formItem">
						<view class="lab">联系方式</view>
						<view class="phoneVal">
							<view class="val">
								<input class="input" type="text" v-model="phone" placeholder="请授权手机号码" placeholder-class="pla" :disabled="true"/>
							</view>
							<button class="authPhone input" type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"  v-if="!phone">授权手机号码</button>
						</view>
					</view>
				
					<view class="formItem" v-if="isPay">
						<view class="lab">付款方式</view>
						<view class="sexVal">
							<view class="selItem" @click="choosePayWay('使用礼品卡')">
								<image v-show="payWay == '使用礼品卡'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel.png']"></image>
								<image v-show="payWay == '现金'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel_.png']" ></image>
								<view  class="txt">使用礼品卡</view>
							</view>
							<view class="selItem"  @click="choosePayWay('现金')">
								<image v-show="payWay == '现金'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel.png']" ></image>
								<image v-show="payWay == '使用礼品卡'" class="selImg" :src="[OS.CDN+'/static/bk/bkd/sel_.png']"></image>
								<view  class="txt">现金</view>
							</view>
						</view>
						
						<view class="payinfo" v-show="payWay == '使用礼品卡'">
							<view class="txts">
								<view class="lab1">需消耗次数: </view>
								<view class="val1"><text class="b">{{recentActData.CurriculumData[0].CouponsCount}}</text>次</view>
							</view>
							<view class="txts">
								<view class="lab1">礼品卡剩余次数: </view>
								<view class="val1"><text class="b">{{recentActData.TotalSurplus}}</text>次</view>
							</view>
						</view>
						
						<view class="payinfo" v-show="payWay == '现金'">
							<view class="txts">
								<view class="lab1">会员折扣: </view>
								<view class="val1"><text class="b">88</text>折</view>
							</view>
							<view class="txts">
								<view class="lab1">支付金额: </view>
								<view class="val1">¥<text class="b">{{recentActData.CurriculumData[0].Amount*0.88}}</text></view>
							</view>
						</view>
						
					</view>
				</view>
			</scroll-view>
			<view class="btn" @click="sure" hover-class="noPointer" hover-stay-time="1000">立即预约</view>
		</view>
		<comp-header :capsule="OS.capsule" type="4" ></comp-header>
		<comp-pop :display="popDisplay" :pid="pop.id" :btype="pop.btype" :wtype="pop.wtype" :ttype="pop.ttype" @popBack="popBack"></comp-pop>
	</view>
</template>

<script> 
	import {mapState, mapActions} from 'vuex'; 
	let app = getApp(),that,$query;
	const pops =[{
		id:0,
		btype:[{name:"确定",type:"cancel"}], // 按钮数组
		wtype:0, // 0大框
		ttype:"txt6", // 提示类型 
		desc:"客服稍后联系"
	},{
		id:0,
		btype:[{name:"确定",type:"cancel"}], // 按钮数组
		wtype:0, // 0大框
		ttype:"txt7", // 提示类型 
		desc:"支付失败"
	}];
	export default {
		data() {
			return {
				appData:{...app.globalData},
				OS:this.$OS,
				sex:"女士",
				payWay:'使用礼品卡',
				name:"",
				phone:"",
				number:"",
				isPay:null,
				remark:"",
				recentActData:{},
				pop:{},
				popDisplay:false, // 是否显示, 
			}
		},
		computed:{
			...mapState(['userInfo'])
		},
		onLoad(options) {
			$query = options; 
			this.recentActData = uni.getStorageSync('recentActData');
			this.isPay  = this.recentActData.CurriculumData[0].IsPay
			console.log(this.recentActData,111);
		},
		onReady() {
			this.phone = this.userInfo.UserPhone;
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		},
		methods: {
			async getPhoneNumber(e){
				that = this;
				console.log(e.detail.errMsg);
				if (e.detail.errMsg == 'getPhoneNumber:ok') { 
					this.popDisplay = false;  
					// this.userInfo.SessionKey
					this.$u.api.OpenPhone({
					encryptedDataStr:e.detail.encryptedData,
					iv:e.detail.iv},function(re){ 
						console.log(re);
						if(re.errcode == 0){
							that.phone = re.result.Phone
						}
					});
				} else {
					// 不同意获取手机
					console.log(e.detail);
				} 
			},
			
			// 选择性别
			chooseSex(val){
				this.sex = val;
			},
			// 选择支付方式
			choosePayWay(val){
				this.payWay = val;
			},
			
			
			// 确认
			sure(){
				app.baiduTrack(['activity_yuyue',`近期活动填写立即预约`,]);  
				console.log(this.$data,222)
				if(this.name == ""){
					uni.showToast({
						icon:"none",
						title:"请填写姓名"
					})
				}else if(this.phone == ""){
					uni.showToast({
						icon:"none",
						title:"请授权手机号"
					})
				}else{
					uni.requestSubscribeMessage({
						tmplIds: ['SsDbChcHdvOFgVXYUPDhjpLdC-mzW7Onqb4OHfnLRZU','4jnMUdMj1jjyY3zxJHSgURwzLRdlz2Xyi0Yp1ETgCxY'],
						success: (res)=> {
							// CurriculumID 	瑜伽课/冥想课/活动 ID
							// CurriculumTimeID	瑜伽课/冥想课/活动 时间ID		
							// PaymentMethod	 	付款类型：1 课时券 2 现金 3 免费
							let PaymentMethod
							if(!this.isPay){
								PaymentMethod = 3
							}else{
								PaymentMethod = this.payWay=='使用礼品卡' ? 1 : 2
							}
							this.$u.api.SubscribeUser({
								CurriculumTimeID:this.recentActData.CurriculumTimeID,
								CurriculumID:this.recentActData.CurriculumData[0].CurriculumID,
								Sex:this.sex,
								PaymentMethod:PaymentMethod,
								Name:this.name,
								Phone:this.phone,
								
							},(res1)=>{
								if(res1.errcode == 0){
									if(PaymentMethod==1 || PaymentMethod == 3){
										// 礼品卡
										uni.redirectTo({
											url:"/bk/tp1/booked/booked?pay=1&bid=" + res1.result.CurriculumUserID,
										})
									}else{
										// 现金支付
										console.log()
										uni.requestPayment({
										    provider: 'wxpay',
											timeStamp: res1.result.timeStamp,
											nonceStr: res1.result.nonceStr,
											package: res1.result.package,
											signType: 'MD5',
											paySign: res1.result.paySign,
											success: (res2) =>{
												uni.redirectTo({
													url:"/bk/tp1/booked/booked?pay=1&bid=" + res1.result.CurriculumUserID,
												})
											},
											fail:(err) => {// 支付失败
												this.popDisplay = true; 
												this.pop = pops[1];
												console.log('fail:' + JSON.stringify(err));
											}
										});
									}
									
								}else{
									
									this.popDisplay = true;
									// 很抱歉，该时间段已预约满
									// 很抱歉，您的课时券不足
									this.pop = pops[0];
									if(res1.errmsg=='很抱歉，您的课时券不足'){
										this.pop.ttype = 'txt10'
									}else if(res1.errmsg=='很抱歉，该时间段已预约满'){
										this.pop.ttype = 'txt6'
									}
									
									
								}
							});
						}
					})
					
					
				}
			},
			
			popBack(){
				this.popDisplay = false;
				console.log(111);
			}
		}
	}
</script>

<style  scoped>
@import url('@/common/css/common.scss');
.contain{ padding-top: 80rpx;width: 618rpx; left:66rpx;right:66rpx;}	
.noPointer{pointer-events:none;}
.yogabooking{overflow:hidden;}
.yogabooking /deep/ .header{color: #000;}
.yogabooking .scrollView{width:100%;height:100%;position:absolute;padding-top:10rpx;padding-bottom:40rpx;box-sizing:border-box;}
.yogabooking .scroll{height: calc( 100% - 700rpx);margin-top: 100rpx;}
.yogabooking .bg{width:100%;height: 1624rpx;position:absolute;}

.yogabooking .formBg{width:734rpx;position:absolute;top:0;left:50%;margin-left:-367rpx;z-index:0;}
.yogabooking .logo{width:232rpx;margin:72rpx auto;display:block;position:relative;}
.yogabooking .confirm{width:334rpx;display:block;margin:0 auto;position:relative;}
.yogabooking .formBox{margin:0 auto 0;width:540rpx;position:relative;}
.yogabooking .formItem{margin-bottom:33rpx;}
.yogabooking .lab{font-size:26rpx;color:#4a566a;font-weight:bold;margin-bottom:18rpx;}
.yogabooking .val{font-size:26rpx;color:#4a566a;}
.yogabooking .sexVal{display:flex;align-items:center;justify-content:flex-start;}
.yogabooking .selImg{width:36rpx;margin-right:18rpx;height: 36rpx;}
.yogabooking .selItem{display:flex;align-items:center;justify-content:center;}
.yogabooking .selItem .txt{font-size: 26rpx;}
.yogabooking .selItem:first-of-type{margin-right:112rpx;}
.yogabooking .input{width:100%;height:68rpx;border:solid 1px #b9d2ff;padding:0 24rpx;box-sizing:border-box;}
.yogabooking .phoneVal{display:flex;justify-content:space-between;width:100%;}
.yogabooking .phoneVal .val{flex: auto;}
.yogabooking .phoneVal .authPhone{width:160rpx;background:#b9d2ff;border-radius:0;border:0;line-height:1;box-sizing:content-box;font-size:20rpx;color:#fff;display:flex;align-items:center;justify-content:center;padding:0;margin:0;box-shadow:5rpx 5rpx 10rpx rgba(0,0,0,.2);flex: none;margin-left: 20rpx;}
.yogabooking .phoneVal .authPhone::after{display:none;}
.yogabooking .phoneVal .authPhone[disabled]{background-color:rgba(205,205,205,1);}
.yogabooking .remarkVal{height:111rpx;padding:24rpx;}
.yogabooking .btnTxt{font-size:22rpx;color:#b9d2ff;text-align:center;width:100%;margin:83rpx auto 0;position:relative;}
.yogabooking .payinfo{padding-top: 64rpx;}
.yogabooking .payinfo .txts{display: flex;justify-content: space-between;margin-top: 42rpx;}
.yogabooking .payinfo .lab1{font-size: 26rpx;}
.yogabooking .payinfo .val1{font-size: 26rpx;}
.yogabooking .payinfo .b{font-weight: bold;}
.yogabooking .btn{position:relative;font-size:22rpx;color:#fff;box-shadow:5rpx 5rpx 10rpx rgba(0,0,0,.2);background:#b9d2ff;width:380rpx;height:68rpx;display:flex;align-items:center;justify-content:center;font-size:26rpx;font-weight:bold;letter-spacing:5rpx;margin:50rpx auto 0;}
.yogabooking .dateVal{display:flex;align-items:center;padding:0 24rpx;}

</style>
