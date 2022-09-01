<template>
	<view class="content">
		<!-- 轮播图 -->
		<view class="sweiperList">
			<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,index) in swiperList" :key="item.goods_id">
					<navigator class="swiper-item" :url="'/subpage/goods_detail/goods_detail?id='+item.goods_id">
						<image :src="item.image_src" mode="widthFix"></image>
					</navigator>

				</swiper-item>
			</swiper>
		</view>
		<!-- 分类 -->
		<view class="nav-list">
			<view class="nav-item" v-for="(item, i) in navList" :key="i" @click="navtos(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,index) in floorList" :key="index">
				<!-- 楼层的标题 -->
				<image :src="item.floor_title.image_src" mode="widthFix" class="floor-title"></image>
				<view class="floor-img-box">
					<!-- 左侧大图片的盒子 -->
					<view class="left-img-box">
						<image :src="item.product_list[0].image_src"
							:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					</view>
					<!-- 右侧 4 个小图片的盒子 -->
					<view class="right-img-box">
						<view class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0">
							<image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}">
							</image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		requset
	} from "@/utils/api.js"
	export default {
		data() {
			return {
				swiperList: [],
				navList: [],
				floorList: [],
			}
		},
		onLoad() {
			this.getSwiperList(),
				this.getNavList(),
				this.getFloorList()
		},
		methods: {
			navtos(e) {
				let towhere = e.name
				console.log(e.name)
				if (towhere == '分类') {
					uni.switchTab({
						url: '/pages/category/category'
					});
				}
			},
			async getSwiperList() {
				let res = await requset({
					url: "/api/public/v1/home/swiperdata"
				})
				if (res.meta.status == 200) {
					this.swiperList = res.message
				} else if (res.meta.status !== 200) {
					uni.showToast({
						title: "获取数据失败",
						duration: 1200,
						icon: "none"
					})
				}
			},
			async getNavList() {
				let res = await requset({
					url: "/api/public/v1/home/catitems"
				})
				if (res.meta.status == 200) {
					this.navList = res.message
				} else if (res.meta.status !== 200) {
					uni.showToast({
						title: "获取数据失败",
						duration: 1200,
						icon: "none"
					})
				}
			},
			async getFloorList() {
				let res = await requset({
					url: "/api/public/v1/home/floordata",
				})
				if (res.meta.status == 200) {
					this.floorList = res.message
				} else if (res.meta.status !== 200) {
					uni.showToast({
						title: "获取数据失败",
						duration: 1200,
						icon: "none"
					})
				}

			},

		},


	}
</script>

<style lang="scss">
	swiper {
		height: 330rpx;

		.swiper-item,
		image {
			width: 100%;
			height: 100%;
		}
	}

	.nav-list {
		display: flex;
		justify-content: space-around;
		margin: 15px 0;

		.nav-img {
			width: 128rpx;
			height: 140rpx;
		}
	}

	.floor-title {
		height: 60rpx;
		width: 100%;
		display: flex;
	}

	.right-img-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}

	.floor-img-box {
		display: flex;
		padding-left: 10rpx;
	}
</style>
