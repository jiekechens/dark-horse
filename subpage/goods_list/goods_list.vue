<template>
	<view>
	    <view class="goods-list">
	      <view v-for="(goods, i) in goodsList" :key="i" @click="gotoDetail(item)">
	         <myGoods :goods="goods"></myGoods>
	      </view>
	    </view>
	  </view>
</template>

<script>
	import {requset} from "@/utils/api.js"
	import myGoods from '@/components/myGoods/myGoods.vue'
	export default {
		components:{
			  myGoods
		},
		data() {
			return {
				queryObj: {
					// 查询关键词
					query: '',
					// 商品分类Id
					cid: '',
					// 页码值
					pagenum: 1,
					// 每页显示多少条数据
					pagesize: 10
				},
				  goodsList: [],
				   isloading: false,
				    // 总数量，用来实现分页
				    total: 0,
					 defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};

		},
		onLoad(options) {
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			 this.getGoodsList()
		},
		onReachBottom() {
		  // 判断是否正在请求其它数据，如果是，则不发起额外的请求
		  
		  if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) return  uni.showToast({
		  	title:'没有更多数据了',
			icon:"none",
			duration:1200
		  })
		  if (this.isloading) return
		  this.queryObj.pagenum += 1
		  this.getGoodsList()	
		},
		onPullDownRefresh() {
		  // 1. 重置关键数据
		  this.queryObj.pagenum = 1
		  this.total = 0
		  this.isloading = false
		  this.goodsList = []
		
		  // 2. 重新发起请求
		  this.getGoodsList(() => uni.stopPullDownRefresh())
		},
		methods: {
		  // 获取商品列表数据的方法
		  async getGoodsList(cd) {
		    // 发起请求
			this.isloading = true
		    const res = await requset({url:'/api/public/v1/goods/search', data:{...this.queryObj}})
		    if (res.meta.status !== 200) return uni.showToast({
		    	title:"请求超时",
				icon:"none",
				duration:1200
		    })
			cb && cb()
		    // 为数据赋值
		     this.goodsList = [...this.goodsList, ...res.message.goods]
		    this.total = res.message.total
			 this.isloading = false
		  },
		  gotoDetail(item) {
		    uni.navigateTo({
		      url: '/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id
		    })
		  },
		},
	}
</script>

<style lang="scss">
.goods-item {
  display: flex;
  padding: 10px 5px;
  border-bottom: 1px solid #f0f0f0;

  .goods-item-left {
    margin-right: 5px;

    .goods-pic {
      width: 100px;
      height: 100px;
      display: block;
    }
  }

  .goods-item-right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goods-name {
      font-size: 13px;
    }

    .goods-price {
      font-size: 16px;
      color: #c00000;
    }
  }
}
</style>
