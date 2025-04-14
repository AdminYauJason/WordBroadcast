<template>
	<view class="wallet-container">
		<!-- 顶部余额卡片 -->
		<view class="balance-card">
			<view class="balance-header">
				<text class="balance-title">我的余额</text>
				<view class="balance-amount">
					<text class="currency">¥</text>
					<text class="amount">{{userInfo.balance || '0.00'}}</text>
				</view>
			</view>
			<view class="action-buttons">
				<button class="action-btn recharge-btn" @click="showRechargePopup">充值</button>
			</view>
		</view>

		<!-- 交易记录 -->
		<view class="transaction-history">
			<view class="section-title">
				<text>交易记录</text>
				<text class="more-text" @click="navigateToFullHistory">查看全部</text>
			</view>
			<view class="history-list">
				<view v-if="transactions.length === 0" class="empty-state">
					<uni-icons type="info" size="48" color="#999"></uni-icons>
					<text class="empty-text">暂无交易记录</text>
				</view>
				<view v-else v-for="(item, index) in transactions" :key="index" class="transaction-item">
					<view class="transaction-info">
						<text class="transaction-type">{{item.type}}</text>
						<text class="transaction-time">{{formatDate(item.createTime)}}</text>
					</view>
					<text :class="['transaction-amount', item.amount > 0 ? 'income' : 'expense']">
						{{item.amount > 0 ? '+' : ''}}{{item.amount}}
					</text>
				</view>
			</view>
		</view>

		<!-- 充值弹窗 -->
		<uni-popup ref="rechargePopup" type="bottom">
			<view class="popup-content">
				<view class="popup-header">
					<text class="popup-title">充值</text>
					<view class="close-btn" @click="closeRechargePopup">
						<uni-icons type="close" size="20" color="#666"></uni-icons>
					</view>
				</view>
				<view class="popup-body">
					<view class="input-group">
						<text class="label">充值金额</text>
						<view class="amount-input">
							<text class="currency-symbol">¥</text>
							<input 
								type="digit"
								v-model="customAmount"
								placeholder="请输入充值金额"
								class="amount-field"
                maxlength="8"
                @input="handleAmountInput"
							/>
						</view>
					</view>
					<view class="payment-methods">
						<view 
              class="payment-method" 
              v-for="method in paymentMethods" 
              :key="method.id"
              :class="{ 'selected': selectedPayMethod === method.id }"
              @click="selectPayMethod(method.id)"
            >
							<image :src="method.icon" mode="aspectFit" class="method-icon"></image>
							<text class="method-name">{{method.name}}</text>
              <uni-icons v-if="selectedPayMethod === method.id" type="checkmarkempty" size="20" color="#07c160"></uni-icons>
						</view>
					</view>
					<button 
            class="confirm-btn" 
            @click="confirmRecharge" 
            :disabled="!canRecharge || loading"
            :loading="loading"
          >
						确认充值
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
const db = uniCloud.database();

export default {
	data() {
		return {
			userInfo: {},
			customAmount: '',
			transactions: [],
			selectedPayMethod: 'wxpay',
			loading: false,
			paymentMethods: [
				{
					id: 'wxpay',
					name: '微信支付',
					icon: '/static/wallet/wxpay.png'
				},
				{
					id: 'alipay',
					name: '支付宝',
					icon: '/static/wallet/alipay.png'
				}
			]
		}
	},
	computed: {
		canRecharge() {
			const amount = Number(this.customAmount);
			return amount >= 1 && amount <= 50000;
		}
	},
	onLoad() {
		this.getUserInfo();
		this.getTransactions();
	},
  onPullDownRefresh() {
    Promise.all([
      this.getUserInfo(),
      this.getTransactions()
    ]).finally(() => {
      uni.stopPullDownRefresh();
    });
  },
	methods: {
		async getUserInfo() {
			try {
				const { result } = await db.collection('uni-id-users')
					.where("'_id' == $cloudEnv_uid")
					.field('balance')
					.get();
				if (result.data.length > 0) {
					this.userInfo = result.data[0];
				}
			} catch (e) {
				console.error(e);
				uni.showToast({
					title: '获取用户信息失败',
					icon: 'none'
				});
			}
		},
		
		async getTransactions() {
			try {
				const { result } = await db.collection('transactions')
					.where("'user_id' == $cloudEnv_uid")
					.orderBy('createTime', 'desc')
					.limit(5)
					.get();
				this.transactions = result.data;
			} catch (e) {
				console.error(e);
				uni.showToast({
					title: '获取交易记录失败',
					icon: 'none'
				});
			}
		},
		
		selectPayMethod(methodId) {
			this.selectedPayMethod = methodId;
		},
		
		showRechargePopup() {
			this.$refs.rechargePopup.open();
		},
		
		closeRechargePopup() {
			this.$refs.rechargePopup.close();
			this.resetRechargeForm();
		},
		
		resetRechargeForm() {
			this.customAmount = '';
			this.selectedPayMethod = 'wxpay';
		},

    handleAmountInput(e) {
      const value = e.detail.value;
      // 限制只能输入数字和小数点，且最多两位小数
      this.customAmount = value.replace(/[^\d.]/g, '')
        .replace(/\.{2,}/g, '.')
        .replace(/^(\d+)\.(\d\d).*$/, '$1.$2');
    },
		
		async confirmRecharge() {
			const amount = Number(this.customAmount);
			if (!amount) {
				uni.showToast({
					title: '请输入充值金额',
					icon: 'none'
				});
				return;
			}

			try {
        this.loading = true;
				uni.showLoading({
					title: '请求支付中...'
				});

				const { result } = await uniCloud.callFunction({
					name: 'recharge',
					data: {
						amount: amount,
            payMethod: this.selectedPayMethod
					}
				});

				if (result.code === 0) {
					if (this.selectedPayMethod === 'wxpay') {
            await this.processWxPay(result.payInfo);
          } else {
            await this.processAliPay(result.payInfo);
          }
				} else {
					throw new Error(result.message);
				}
			} catch (e) {
				console.error(e);
				uni.showToast({
					title: '支付失败：' + e.message,
					icon: 'none'
				});
			} finally {
				uni.hideLoading();
        this.loading = false;
				this.closeRechargePopup();
			}
		},
		
		processWxPay(payInfo) {
			return new Promise((resolve, reject) => {
				uni.requestPayment({
					provider: 'wxpay',
					...payInfo,
					success: (res) => {
						uni.showToast({
							title: '充值成功',
							icon: 'success'
						});
						this.getUserInfo();
						this.getTransactions();
						resolve(res);
					},
					fail: (err) => {
						reject(new Error('支付取消或失败'));
					}
				});
			});
		},

    processAliPay(payInfo) {
      return new Promise((resolve, reject) => {
        uni.requestPayment({
          provider: 'alipay',
          ...payInfo,
          success: (res) => {
            uni.showToast({
              title: '充值成功',
              icon: 'success'
            });
            this.getUserInfo();
            this.getTransactions();
            resolve(res);
          },
          fail: (err) => {
            reject(new Error('支付取消或失败'));
          }
        });
      });
    },
		
		formatDate(timestamp) {
			const date = new Date(timestamp);
			return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
		},
		
		navigateToFullHistory() {
			uni.navigateTo({
				url: '/pages/wallet/transaction-history'
			});
		}
	}
}
</script>

<style lang="scss" scoped>
	.wallet-container {
		min-height: 100vh;
		background-color: #f5f5f5;
		padding: 32rpx;
	}
	
	.balance-card {
		padding: 48rpx;
		margin-bottom: 40rpx;
		background: linear-gradient(135deg, #3494E6, #EC6EAD);
		border-radius: 24rpx;
		color: #fff;
		box-shadow: 0 4rpx 16rpx rgba(52, 148, 230, 0.2);
	}
	
	.balance-header {
		margin-bottom: 40rpx;
	}
	
	.balance-title {
		font-size: 28rpx;
		opacity: 0.9;
	}
	
	.balance-amount {
		margin-top: 24rpx;
		display: flex;
		align-items: baseline;
	}
	
	.currency {
		font-size: 40rpx;
		margin-right: 8rpx;
	}
	
	.amount {
		font-size: 72rpx;
		font-weight: bold;
	}
	
	.action-buttons {
		display: flex;
		gap: 24rpx;
	}
	
	.action-btn {
		width: 100%;
		height: 88rpx;
		border-radius: 40rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
	
		&:active {
			transform: scale(0.98);
		}
	}
	
	.recharge-btn {
		background-color: #fff;
		color: #3494E6;
	}
	
	.transaction-history {
		background-color: #fff;
		border-radius: 24rpx;
		padding: 32rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 48rpx 0;
	}
	
	.empty-text {
		color: #999;
		font-size: 28rpx;
		margin-top: 16rpx;
	}
	
	.transaction-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx 0;
		border-bottom: 2rpx solid #f5f5f5;
	
		&:last-child {
			border-bottom: none;
		}
	}
	
	.transaction-info {
		display: flex;
		flex-direction: column;
	}
	
	.transaction-type {
		font-size: 28rpx;
		color: #333;
		margin-bottom: 8rpx;
	}
	
	.transaction-time {
		font-size: 24rpx;
		color: #999;
	}
	
	.transaction-amount {
		font-size: 32rpx;
		font-weight: 500;
	
		&.income {
			color: #00b578;
		}
	
		&.expense {
			color: #ff4d4f;
		}
	}
	
	.popup-content {
		background-color: #fff;
		border-radius: 24rpx 24rpx 0 0;
		padding: 32rpx;
	}
	
	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 32rpx;
	}
	
	.popup-title {
		font-size: 32rpx;
		font-weight: 500;
		color: #333;
	}
	
	.close-btn {
		padding: 12rpx;
	}
	
	.input-group {
		margin-bottom: 32rpx;
	}
	
	.label {
		font-size: 28rpx;
		color: #666;
		margin-bottom: 16rpx;
		display: block;
	}
	
	.amount-input {
		display: flex;
		align-items: center;
		border-bottom: 2rpx solid #eee;
		padding: 16rpx 0;
	}
	
	.currency-symbol {
		font-size: 40rpx;
		color: #333;
		margin-right: 16rpx;
	}
	
	.amount-field {
		flex: 1;
		font-size: 40rpx;
	}
	
	.payment-methods {
		margin-bottom: 32rpx;
	}
	
	.payment-method {
		display: flex;
		align-items: center;
		padding: 24rpx;
		margin-bottom: 16rpx;
		border-radius: 16rpx;
		background-color: #f8f8f8;
		border: 2rpx solid transparent;
	
		&.selected {
			background-color: #f0f7ff;
			border-color: #3494E6;
		}
	}
	
	.method-icon {
		width: 48rpx;
		height: 48rpx;
		margin-right: 16rpx;
	}
	
	.method-name {
		flex: 1;
		font-size: 28rpx;
		color: #333;
	}
	
	.confirm-btn {
		width: 100%;
		height: 88rpx;
		background: #07c160;
		color: #fff;
		border-radius: 44rpx;
		font-size: 32rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		border: none;
		margin-bottom: 16rpx;
	
		&:disabled {
			opacity: 0.6;
		}
	
		&:active {
			transform: scale(0.98);
		}
	}
</style>
