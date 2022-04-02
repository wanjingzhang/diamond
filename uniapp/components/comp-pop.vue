<template>
	<view class="pop" v-if="display"> 
		<view class="bg full abLT"></view>
		<view class="content abCC" :class="'window'+wtype">
			<view class="txtBox abLT">
				<view class="txt112" v-if="ttype.length>6">{{ttype.split(",")[1]}}</view>
				<view class="txt113" v-if="ttype.length>6">{{ttype.split(",")[2]}}</view>
				<view class="txt abCC" v-else-if="ttype!='txt14'" :class="ttype" ></view>
        <image class="img abCC" :show-menu-by-longpress="ttype=='txt14'?true:false" :class="ttype" v-else-if="ttype=='txt14'" :src="['static/pop/'+ ttype + '.png']" ></image>
			</view> 
			<view class="btns abCB" v-if="btype.length == 1">
				<view class="btnOne" :data-btp="btype[0].type" @click.stop="popBack">{{btype[0].name}}</view>
			</view>
			<view class="btns abCB" v-if="btype.length == 2">
				<view class="btnTwo" :data-btp="btype[0].type" @click.stop="popBack">{{btype[0].name}}</view>
				<button v-if="pid!=1" class="btnTwo" :data-btp="btype[1].type" @click.stop="popBack">{{btype[1].name}}</button>
				<button v-else="pid==1" class="btnTwo" :data-btp="btype[1].type" open-type="getPhoneNumber" @getphonenumber="getPhoneNb">{{btype[1].name}}</button>
			</view>
		</view> 
	</view> 
</template>

<script>
	export default {
		name:"pop",
		props:{
			pid:{
				type:Number,
				default:0
			},
			wtype:{ // 窗口类型
				type:Number,
				default:0
			},
			ttype:{ // 文本类型
				type:String,
				default:""
			},
			btype:{ // 按钮组 一个元素单按钮样式
				type:Array,
				default:[{name:"确定",type:""}]
			},
			display:{
				type:Boolean,
				default:false
			}
			
		},
		data() {
			return {
				
			};
		}, 
		methods:{
			popBack(e){
				this.$emit("popBack",e);
			},
			getPhoneNb: function(e) { 
				this.$emit("popBack",e);
			},
		}
	}
</script>

<style lang="scss" scoped>
@import url("@/common/css/common.scss");
.pop{z-index: 99;
	.bg{background-color: rgba(0,0,0,0.5);}
	.content{ z-index: 99;
		&.window0{width:540rpx;height:683rpx;background-image: url("static/pop/bgB.png");background-size:cover;}
		&.window1{width: 490rpx;height: 577rpx;background-image: url("static/pop/bgS.png");background-size:cover;}
		.txtBox{top:280rpx;height: 160rpx;width: 100%;
			.txt{background-size: 100% 100%;
				&.txt1{width: 440rpx;height: 152rpx;background-image: url("static/pop/txt1.png");}
				&.txt2{width: 404rpx;height: 124rpx;background-image: url("static/pop/txt2.png");}
				&.txt3{width: 300rpx;height: 30rpx;background-image: url("static/pop/txt3.png");}
				&.txt4{width: 214rpx;height: 28rpx;background-image: url("static/pop/txt4.png");}
				&.txt5{width: 370rpx;height: 152rpx;background-image: url("static/pop/txt5.png");}
				&.txt6{width: 234rpx;height: 30rpx;background-image: url("static/pop/txt6.png");}
				&.txt7{width: 122rpx;height: 32rpx;background-image: url("static/pop/txt7.png?v=22");}
				&.txt8{width: 144rpx;height: 30rpx;background-image: url("static/pop/txt8.png");}
				&.txt9{width: 218rpx;height: 76rpx;background-image: url("static/pop/txt9.png");}
				&.txt10{width: 354rpx;height: 74rpx;background-image: url("static/pop/txt10.png");}
				&.txt11{width: 228rpx;height: 28rpx;background-image: url("static/pop/txt11.png");background-position: 0 -75rpx;}
				&.txt12{width: 312rpx;height: 102rpx;background-image: url("static/pop/txt12.png");}
				&.txt13{width: 292rpx;height: 78rpx;background-image: url("static/pop/txt13.png");}
			}
			.txt112{color:#6b788f;font-size: 29rpx;letter-spacing: 5rpx;text-align: center;font-weight: 400;}
			.txt113{color:#6b788f;font-size: 26rpx;letter-spacing: 5rpx;text-align: center;font-weight: 400;padding-top:46rpx;}
      .img{
        &.txt14{width: 216rpx;height: 278rpx;}
      }
		}
		
		.btns{bottom:74rpx;color:#ffffff; display: flex; width: 456rpx;justify-content: center; 
		}
	}
}
</style>
