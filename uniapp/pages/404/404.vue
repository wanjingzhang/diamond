<template>
	<view>
		<h1>当前页面不存在！</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad(){
			let timer = setTimeout(()=>{
				clearInterval(timer);
				uni.navigateTo({
					url: '/pages/index/index'
				})
			},2000)
		},
		methods: {
			
		},
		onShareAppMessage() {
			return app.onShareAppMessage();
		}
	}
</script>

<style>

</style>
