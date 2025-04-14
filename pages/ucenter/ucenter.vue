<template>
	<view class="profile-container">
		<!-- 顶部背景和个人信息 -->
		<view class="profile-header">
			<view class="header-bg"></view>
			<view class="user-profile">
				<view class="avatar-container" @click="toUserInfo">
					<cloud-image 
						width="160rpx" 
						height="160rpx" 
						v-if="hasLogin && userInfo.avatar_file && userInfo.avatar_file.url" 
						:src="userInfo.avatar_file.url"
						class="avatar-image"
					></cloud-image>
					<view v-else class="default-avatar">
						<uni-icons color="#ffffff" size="50" type="person-filled" />
					</view>
				</view>
				<view class="user-info">
					<text class="username">{{hasLogin ? (userInfo.nickname || userInfo.username || userInfo.mobile) : $t('mine.notLogged')}}</text>
				</view>
			</view>
		</view>

		<!-- 钱包组件 -->
		<view class="wallet-card">
			<view class="wallet-header">
				<text class="wallet-title">我的钱包</text>
				<text class="wallet-more" @click="navigateToWallet">查看详情 ></text>
			</view>
			<view class="wallet-content">
				<view class="wallet-item">
					<text class="amount">{{userInfo.balance || 0}}</text>
					<text class="label">余额</text>
				</view>
			</view>
		</view>

		<!-- 功能列表 -->
		<view class="function-lists">
			<uni-list class="function-list" v-for="(sublist, index) in ucenterList" :key="index">
				<uni-list-item
					v-for="(item, i) in sublist"
					:key="i"
					:title="item.title"
					:link="true"
					:rightText="item.rightText"
					:clickable="true"
					:to="item.to"
					@click="ucenterListClick(item)"
					:show-extra-icon="true"
					:extraIcon="{type: item.icon, color: '#666'}"
				>
					<template v-slot:footer>
						<view v-if="item.showBadge" class="item-footer">
							<text class="item-footer-text">{{item.rightText}}</text>
							<view class="item-footer-badge"></view>
						</view>
					</template>
				</uni-list-item>
			</uni-list>
		</view>
	</view>
</template>

<script>
	import checkUpdate from '@/uni_modules/uni-upgrade-center-app/utils/check-update';
	import callCheckVersion from '@/uni_modules/uni-upgrade-center-app/utils/call-check-version';
	// #ifdef APP
	import UniShare from '@/uni_modules/uni-share/js_sdk/uni-share.js';
	const uniShare = new UniShare()
	// #endif
	const db = uniCloud.database();
	import {
		store,
		mutations
	} from '@/uni_modules/uni-id-pages/common/store.js'
	export default {
		
		// #ifdef APP
		onBackPress({from}) {
			if(from=='backbutton'){
				this.$nextTick(function(){
					uniShare.hide()
				})
				return uniShare.isShow;
			}
		},
		// #endif
		data() {
			return {
				ucenterList: [
					[
						// #ifdef APP-PLUS
						{
							"title": this.$t('mine.toEvaluate'),
							"event": 'gotoMarket',
							"icon": "star"
						},
						//#endif
						{
							"title":this.$t('mine.readArticles'),
							"to": '/pages/grid/grid',
							"icon": "flag"
						},
						{
							"title": this.$t('mine.myScore'),
							"to": '',
							"event": 'getScore',
							"icon": "paperplane"
						}
						// #ifdef APP-PLUS
						, {
							"title": this.$t('mine.invite'),
							"event": 'share',
							"icon": "redo"
						}
						// #endif
					],
					[{
						"title": this.$t('mine.feedback'),
						"to": '/uni_modules/uni-feedback/pages/opendb-feedback/opendb-feedback',
						"icon": "help"
					}, {
						"title": this.$t('mine.settings'),
						"to": '/pages/ucenter/settings/settings',
						"icon": "gear"
					}],
					// #ifdef APP-PLUS
					[{
						"title": this.$t('mine.about'),
						"to": '/pages/ucenter/about/about',
						"icon": "info"
					}]
					// #endif
				],
				listStyles: {
					"height": "150rpx",
					"width": "150rpx",
					"border": {
						"color": "#eee",
						"width": "1px",
						"style": "solid",
						"radius": "100%"
					}
				}
			}
		},
		onLoad() {
			//#ifdef APP-PLUS
			this.ucenterList[this.ucenterList.length - 2].unshift({
				title:this.$t('mine.checkUpdate'),
				rightText: this.appVersion.version + '-' + this.appVersion.versionCode,
				event: 'checkVersion',
				icon: 'loop',
				showBadge: this.appVersion.hasNew
			})
			//#endif
		},
		onShow() {
		},
		computed: {
			userInfo() {
				return store.userInfo
			},
			hasLogin(){
				return store.hasLogin
			},
			// #ifdef APP-PLUS
			appVersion() {
				return getApp().appVersion
			},
			// #endif
			appConfig() {
				return getApp().globalData.config
			}
		},
		methods: {
			navigateToWallet() {
				if (!this.hasLogin) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					});
					return;
				}
				// 跳转到钱包详情页面
				uni.navigateTo({
					url: '/pages/wallet/wallet'
				});
			},
			toSettings() {
				uni.navigateTo({
					url: "/pages/ucenter/settings/settings"
				})
			},
			ucenterListClick(item) {
				if (!item.to && item.event) {
					this[item.event]();
				} else if (item.to) {
					uni.switchTab({
						url: item.to,
						fail: () => {
							uni.navigateTo({ url: item.to });
						}
					});
				}
			},
			async checkVersion() {
				let res = await callCheckVersion()
				console.log(res);
				if (res.result.code > 0) {
					checkUpdate()
				} else {
					uni.showToast({
						title: res.result.message,
						icon: 'none'
					});
				}
			},
			toUserInfo() {
				uni.navigateTo({
					url: '/uni_modules/uni-id-pages/pages/userinfo/userinfo'
				})
			},
			gotoMarket() {
				// #ifdef APP-PLUS
				if (uni.getSystemInfoSync().platform == "ios") {
					let appstoreid = this.appConfig.marketId.ios;
					console.log({appstoreid});
					plus.runtime.openURL("itms-apps://" + 'itunes.apple.com/cn/app/wechat/' + appstoreid + '?mt=8',err=>{
						console.log('plus.runtime.openURL err:' + JSON.stringify(err));
					});
				}
				if (uni.getSystemInfoSync().platform == "android") {
					var Uri = plus.android.importClass("android.net.Uri");
					var uri = Uri.parse("market://details?id=" + this.appConfig.marketId.android);
					var Intent = plus.android.importClass('android.content.Intent');
					var intent = new Intent(Intent.ACTION_VIEW, uri);
					var main = plus.android.runtimeMainActivity();
					main.startActivity(intent);
				}
				// #endif
			},
			getScore() {
				if (!this.userInfo) return uni.showToast({
					title: this.$t('mine.checkScore'),
					icon: 'none'
				});
				uni.showLoading({
					mask: true
				})
				db.collection("uni-id-scores")
					.where('"user_id" == $env.uid')
					.field('score,balance')
					.orderBy("create_date", "desc")
					.limit(1)
					.get()
					.then((res) => {
						console.log(res);
						const data = res.result.data[0];
						let msg = '';
						msg = data ? (this.$t('mine.currentScore')+ data.balance) : this.$t('mine.noScore');
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}).finally(()=>{
						uni.hideLoading()
					})
			},
			async share() {
				let {result} = await db.collection('uni-id-users').where("'_id' == $cloudEnv_uid").field('my_invite_code').get()
				let myInviteCode = result.data[0].my_invite_code
				if(!myInviteCode){
					return uni.showToast({
						title: '请检查uni-config-center中uni-id配置，是否已启用 autoSetInviteCode',
						icon: 'none'
					});
				}
				console.log({myInviteCode});
				let {
					title,
					summary,
					imageUrl,
					href
				} = this.appConfig.shareInvite || {};
				uniShare.share({
					provider: ["weixin", "sinaweibo", "qq"],
					scenes: ["WXSceneSession", "WXSceneTimeline", "SinaWeibo", "QQ"],
					type: 0,
					href: href || (location.origin + "/#/pages/ucenter/login-page/login-page?code=" + myInviteCode),
					title,
					summary,
					imageUrl
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
.profile-container {
	min-height: 100vh;
	background-color: #f5f5f5;
}

.profile-header {
	position: relative;
	height: 400rpx;
	overflow: hidden;
}

.header-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	height: 400rpx;
	background: linear-gradient(135deg, #3494E6, #EC6EAD);
	z-index: 1;
}

.user-profile {
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 80rpx;
}

.avatar-container {
	width: 160rpx;
	height: 160rpx;
	border-radius: 50%;
	border: 4rpx solid #ffffff;
	overflow: hidden;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
}

.avatar-image {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.default-avatar {
	width: 100%;
	height: 100%;
	background-color: #007AFF;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
}

.user-info {
	margin-top: 20rpx;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.username {
	font-size: 36rpx;
	color: #ffffff;
	font-weight: 500;
	text-align: center;
}

.wallet-card {
	margin: -60rpx 32rpx 32rpx;
	background: #ffffff;
	border-radius: 24rpx;
	padding: 32rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
	position: relative;
	z-index: 3;
}

.wallet-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 32rpx;
}

.wallet-title {
	font-size: 32rpx;
	font-weight: 500;
	color: #333;
}

.wallet-more {
	font-size: 24rpx;
	color: #666;
}

.wallet-content {
	display: flex;
	justify-content: center;
	align-items: center;
}

.wallet-item {
	text-align: center;
}

.amount {
	font-size: 40rpx;
	font-weight: bold;
	color: #333;
	display: block;
}

.label {
	font-size: 24rpx;
	color: #999;
	margin-top: 8rpx;
	display: block;
}

.function-lists {
	padding: 0 32rpx;
}

.function-list {
	background: #ffffff;
	border-radius: 24rpx;
	margin-bottom: 24rpx;
	overflow: hidden;
}

:deep(.uni-list-item) {
	padding: 24rpx 32rpx;
}

:deep(.uni-list-item__container) {
	padding: 0 !important;
}

.item-footer {
	display: flex;
	align-items: center;
}

.item-footer-text {
	font-size: 24rpx;
	color: #999;
	margin-right: 12rpx;
}

.item-footer-badge {
	width: 16rpx;
	height: 16rpx;
	background-color: #ff4d4f;
	border-radius: 50%;
}
</style>