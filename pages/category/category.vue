<template>
  <view>
	  <my-seach @click="gotoSearch"></my-seach>
    <view class="scroll-view-container">
      <!-- 左侧的滚动视图区域 -->
      <scroll-view class="left-scroll-view" scroll-y :style="{height: wh + 'px'}">
         <block v-for="(item, index) in cateList " :key='index'>
			 <view :class="['left-scroll-view-item', index === active ? 'active' : '']" @click="activeChanged(index)">{{item.cat_name}}</view>
		 </block>
      </scroll-view>
      <!-- 右侧的滚动视图区域 -->
      <scroll-view class="right-scroll-view" scroll-y :style="{height: wh + 'px'}" :scroll-top="scrollTop">
         <view class="cate-lv2" v-for="(item2, i2) in cateLevelRight" :key="i2">
           <view class="cate-lv2-title">/ {{item2.cat_name}} /</view>
		    <view class="cate-lv3-list">
		         <!-- 三级分类 Item 项 -->
		         <view class="cate-lv3-item" v-for="(item3, i3) in item2.children" :key="i3"  @click="gotoGoodsList(item3)">
		           <!-- 图片 -->
		           <image :src="item3.cat_icon"></image>
		           <!-- 文本 -->
		           <text>{{item3.cat_name}}</text>
		         </view>
		       </view>
         </view>
      </scroll-view>
    </view>
  </view>
</template>

<script>
	import {
		requset
	} from "@/utils/api.js";
	import mySeach from '@/components/mySeach/mySeach.vue';

export default {
	components: {
		mySeach
	},
    data() {
      return {
        // 窗口的可用高度 = 屏幕高度 - navigationBar高度 - tabBar 高度
        wh: 0,
		cateList:[],
		 active: 0,
		 cateLevelRight: [],
		 scrollTop: 0,
      };
    },
    onLoad() {
      // 获取当前系统的信息
      const sysInfo = uni.getSystemInfoSync()
      // 为 wh 窗口可用高度动态赋值
      this.wh = sysInfo.windowHeight
	  this.getCateList(	)
    },
	methods:{
		async getCateList() {
		    // 发起请求
		    const res = await requset({url:"/api/public/v1/categories"})
		    // 判断是否获取失败
		     if (res.meta.status !== 200) return 	uni.showToast({
						title: "获取数据失败",
						duration: 1200,
						icon: "none"
					})
		    // 转存数据
		    this.cateList = res.message 
			this.cateListRight=res.message[0].children
		  },
		  activeChanged(index){
			  this.active=index
			  this.cateLevelRight=this.cateList[index].children
			  this.scrollTop = this.scrollTop ? 0 : 1
		  },
		  gotoGoodsList(item3) {
		    uni.navigateTo({
		      url: '/subpage/goods_list/goods_list?cid=' + item3.cat_id
		    })
		  },
		    gotoSearch() {
		       uni.navigateTo({
		         url: '/subpage/search/search'
		       })
		     },
	},
  }	
</script>

<style lang="scss">
.scroll-view-container {
  display: flex;

  .left-scroll-view {
    width: 120px;

    .left-scroll-view-item {
      line-height: 60px;
      background-color: #f7f7f7;
      text-align: center;
      font-size: 12px;

      // 激活项的样式
      &.active {
        background-color: #ffffff;
        position: relative;

        // 渲染激活项左侧的红色指示边线
        &::before {
          content: ' ';
          display: block;
          width: 3px;
          height: 30px;
          background-color: #c00000;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
.cate-lv2-title {
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  padding: 15px 0;
}
.cate-lv3-list {
  display: flex;
  flex-wrap: wrap;

  .cate-lv3-item {
    width: 33.33%;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
      width: 60px;
      height: 60px;
    }

    text {
      font-size: 12px;
    }
  }
}
</style>
