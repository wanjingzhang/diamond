<template>
	<view :style='{ width: OS.screenWidth + "px", height: OS.screenHeight + "px"} ' :class='["page full abLT",OS.screenProp]'>
		<comp-header :capsule="OS.capsule" type="3" ></comp-header>
		<view class="content abFull" :style='{ top: OS.articleTop }'>
			<web-view :src="url"></web-view>
		</view>
	</view>
</template>
 
<script>  
	let app = getApp();
    export default {
        data() {
            return {
				appData:{...app.globalData},
				OS:this.$OS
            }
        },
        onLoad(e) {
			console.log(e.url);
             
            this.url = decodeURI(e.url); // 获取传递过来的链接
        },
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
    }
</script>  
