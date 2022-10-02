<template>
	<view class="my-container ">
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
import { mapState } from 'vuex'
	import badgeMix from '@/mixins/tabbar-badge.js'
	import myLogin from "@/components/myLogin/myLogin.vue"
	import myUserinfo from "@/components/myUserinfo/myUserinfo.vue"
	export default {
		 mixins: [badgeMix],
		components: {
			myUserinfo,
			myLogin
		},
		computed: {
		    // 2. 从 m_user 模块中导入需要的 token 字符串
		    ...mapState('user', ['token']),
		  },
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
