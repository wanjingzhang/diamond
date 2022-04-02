<template> 
	<image class="service abRT" :src="[OS.CDN+'/static/com/svs.png']"  @click.stop="service"></image>
</template>

<script> 
	export default {
		name:"service",
		data() {
			return {
				OS:this.$OS,
			};
		},
		methods:{
			service(){
				uni.$emit('service');
			}
		}
	}
</script>

<style lang="scss" scoped>
@import url("@/common/css/common.scss");
.service{width: 106rpx;height: 100rpx;top:20rpx;}
</style>
