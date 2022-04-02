<template>
  <view :style="{ width: OS.screenWidth + 'px', height: OS.screenHeight + 'px' }" :class="['page full abLT', OS.screenProp]">
    <comp-header :capsule="OS.capsule" type="3"></comp-header>
    <view class="content abFull" :style="{ top: OS.articleTop }">
      <view class="box">
        <!--@touchstart='touchstart' @touchmove='touchmove' @touchend='touchend' -->
        <view class="bgBox">
          <!-- <image v-for="(item,index) in menus" class="bg abLT" mode="aspectFit" :src="[OS.CDN+'/static/main/bg'+index+'.jpg']" :class="{active:index==selected}"></image> -->
          <swiper
            class="swiper"
            :autoplay="false"
            :vertical="true"
            :circular="true"
            @change="changeHandler"
            :current="selected">
            <swiper-item v-for="(item, index) in menus" class="swiperItem">
              <image class="images" mode="aspectFill" :src="[OS.CDN + '/static/main/bg' + index + '_.jpg']"></image>
            </swiper-item>
          </swiper>
          <image class="start abRB" :src="[OS.CDN + '/static/main/book.png']" @click.stop="startHandler"></image>
        </view>
        <view class="btns">
          <image class="btn active" :src="[OS.CDN + '/static/main/btn1.jpg']" @click.stop="recentAct" data-type="recent"></image>
          <image class="btn mall" :src="[OS.CDN + '/static/main/btn2.jpg']" @click.stop="shoppingAct" data-type="shop"></image>
        </view>
        <view class="start"></view>
      </view>
      <view class="btns abLT" id="btnBox">
        <view class="btnBg abLT" :style="{ transform: `translateY(${btnTop - boxTop}px)` }"></view>
        <view
          v-for="(item, index) in menus"
          :id="['btn' + index]"
          class="btn"
          :class="{ active: index == selected }"
          @click.stop="changeMenu"
          :data-id="index">
          {{ item.name }}
        </view>
      </view>
      <comp-service></comp-service>
    </view>
    <comp-bar :screenProp="OS.screenProp" @startHandler="startHandler"></comp-bar>
    <comp-auth ref="auth" @AuthAll="AuthAll"></comp-auth>
    <comp-pickup :display="pickup"></comp-pickup>
  </view>
</template>

<script>
import { mapState, mapActions } from 'vuex'
const app = getApp()
const menus = [
  { id: 1, name: '瑜伽课程预约', bd: 'yoga_detail', type: 1, url: 'yoga1' },
  { id: 2, name: '冥想课程预约', bd: 'think_detail', type: 1, url: 'yoga1' },
  { id: 3, name: '餐厅/露台预约', bd: 'canteen_detail', type: 2, url: 'dinner3' },
  { id: 4, name: '品茗预约', bd: 'tea_detail', type: 2, url: 'tea4' }
]
const code = ''

export default {
  data () {
    return {
      OS: this.$OS,
      menus: menus,
      selected: 0,
      bgUrl: '/static/main/bg0.jpg',
      lastX: 0,
      lastY: 0,
      text: '',
      upOrDown: '',
      btnTop: 0,
      boxTop: 0
    }
  },
  computed: {
    ...mapState(['userInfo', 'pageId'])
  },
  methods: {
    ...mapActions(['login', 'logout']),
    changeHandler (event) {
      const { current } = event.detail
      // console.log(current)
      this.idChange(current)
    },
    touchstart (event) {
      const currentX = event.touches[0].pageX
      const currentY = event.touches[0].pageY
      this.currentY = currentY
      this.lastY = currentY
      this.upOrDown = ''
    },
    touchmove (event) {
      const currentY = event.touches[0].pageY
      // 将当前坐标进行保存以进行下一次计算
      this.currentY = currentY
    },
    touchend (e) {
      const ty = Math.ceil(this.currentY - this.lastY)
      // console.log("ty",ty);
      const text = ''
      if (ty < -20) {
        if (this.selected >= 3) {
          this.idChange(0)
        } else {
          this.idChange(this.selected + 1)
        }
      } else if (ty > 20) {
        if (this.selected <= 0) {
          this.idChange(3)
        } else {
          this.idChange(this.selected - 1)
        }
      } else {
        this.upOrDown = ''
      }
    },
    changeMenu (e) {
      const id = e.currentTarget.dataset['id']
      this.idChange(id)
    },
    idChange (id) {
      this.bgUrl = '/static/main/bg' + id + '.jpg'
      app.baiduTrack(['index', `首页${menus[id]['name']}`])
      this.selected = id
      const query = uni.createSelectorQuery().in(this)
      query
        .select('#btn' + id)
        .boundingClientRect(data => {
          this.btnTop = Math.ceil(data.top) //  Math.ceil(data.top-this.boxTop) + "px";
          // console.log(this.btnTop)
        })
        .exec()
    },
    startHandler (e) {
      // 这里判断授权，没授权 弹窗出来
      this.$refs.auth.startHandler(e)
    },
    AuthAll (e) {
      if (e.staystill) {
      } else {
        const type = e.currentTarget.dataset['type']
        // console.log(type)
        if (type == 'recent') {
          app.baiduTrack(['activitylist', `近期活动`])
          uni.navigateTo({
            url: '/pages/recentAct/recentAct'
          })
        } else if (type == 'shop') {
          app.baiduTrack(['mall', `商城`])
          uni.navigateToMiniProgram({
            appId: 'wxfe7c4e62541a2f99',
            path: 'pages/shop/index',
            success (res) {
              console.log('success')
            },
            fail (res) {
              console.log('fail')
            },
            complete (res) {
              console.log('complete')
            }
          })
        } else {
          app.baiduTrack([this.menus[this.selected]['bd'], `首页-${this.menus[this.selected]['name']}-即刻预约`])
          // 跳转到下一页
          const url = '/bk/' + menus[this.selected]['url'] + '/detail/detail?id=' + menus[this.selected].id
          console.log(url)
          uni.navigateTo({
            url: url
          })
        }
      }
    },
    popGift (e) {
      // 冰淇淋查看
      const url = '/person/ice/ice'
      uni.navigateTo({
        url: url
      })
    },
    recentAct (e) {
      // 这里判断授权，没授权 弹窗出来
      this.$refs.auth.startHandler(e)
    },
    shoppingAct (e) {
      // 这里判断授权，没授权 弹窗出来
      this.$refs.auth.startHandler(e)
    }
  },
  onReady () {},
  onShow () {
    // 这里强制同步pageID
    this.$store.dispatch('changePageId', String(0))
    this.selected = 0
    const query = uni.createSelectorQuery().in(this)
    query
      .select('#btnBox')
      .boundingClientRect(data => {
        this.boxTop = Math.ceil(data.top)
      })
      .exec()

    query
      .select('#btn0')
      .boundingClientRect(data2 => {
        this.btnTop = Math.ceil(data2.top)
      })
      .exec()
  },
  onShareAppMessage () {
    return app.onShareAppMessage()
  }
}
</script>

<style lang="scss" scoped>
@import url('@/common/css/common.scss');
.content {
  .box {
    width: 645rpx;
    margin: 0 auto;
    height: calc(100% - 260rpx);
    .bgBox {
      height: calc(100% - 188rpx);
      width: 100%;
      position: relative;
      border-radius: 322rpx 322rpx 0 0;
      transform: translateY(0);
      overflow: hidden;
      .swiper {
        width: 100%;
        height: 100%;
        .swiperItem {
          width: 100%;
          height: 100%;
          .images {
            width: 643rpx;
            height: 982rpx;
          }
        }
      }
      .bg {
        width: 643rpx;
        height: 982rpx;
        will-change: transform;
        opacity: 0;
        transition: all 0.5s;
        &.active {
          opacity: 1;
        }
      }
      .start {
        width: 136rpx;
        height: 24rpx;
        right: 36rpx;
        bottom: 30rpx;
      }
    }
    .btns {
      width: 100%;
      height: 202rpx;
      margin-top: 20rpx;
      .btn {
        width: 322rpx;
        height: 202rpx;
      }
    }
  }
  > .btns {
    top: calc(100% - 80%);
    background: url('static/main/menubg.png');
    background-size: cover;
    width: 300rpx;
    height: 250rpx;
    padding: 100rpx 34rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    > .btn {
      width: 260rpx;
      height: 40rpx;
      margin: 20rpx 0;
      font-size: 22rpx;
      line-height: 40rpx;
      padding-left: 62rpx;
      color: #ffffff;
      font-weight: 700;
      box-sizing: border-box;
      letter-spacing: 5rpx;
      z-index: 1;
      // &.active{background: #b9d2ff;}
    }
    .btnBg {
      background: #b9d2ff;
      width: 260rpx;
      height: 40rpx;
      top: 0;
      left: 20rpx;
      transition: transform 0.1s ease-out;
    }
  }
}

.screen189 {
  .content {
    .box {
      height: calc(100% - 300rpx);
    }
  }
}

.screen159,
.screen169 {
  .content .box .bgBox .bg {
    top: 0%;
  }
}
</style>
