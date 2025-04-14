<template>
  <view class="auth-container">
    <view class="auth-card">
      <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
      <view class="title">授权登录</view>
      <view class="desc">请授权获取您的用户信息</view>
      <button 
        class="auth-btn"
        @click="handleAuth"
        type="primary"
      >
        授权登录
      </button>
      <button 
        class="cancel-btn"
        @click="handleCancel"
        type="default"
      >
        取消
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(false);

// 处理授权登录
const handleAuth = async () => {
  if (loading.value) return;
  loading.value = true;

  try {
    // 1. 获取用户授权
    const [error, authRes] = await uni.showModal({
      title: '授权提示',
      content: '是否允许获取您的用户信息？'
    });
    
    if (error || !authRes.confirm) {
      throw new Error('用户拒绝授权');
    }

    // 2. 执行登录
    const [loginErr, loginRes] = await uni.login({
      provider: 'weixin'
    });
    
    if (loginErr) {
      throw new Error('登录失败');
    }

    // 3. 获取用户信息
    const [userErr, userRes] = await uni.getUserProfile({
      desc: '用于完善用户资料',
      lang: 'zh_CN'
    });
    
    if (userErr) {
      throw new Error('获取用户信息失败');
    }

    // 4. 调用后端登录接口
    const [cloudErr, cloudRes] = await uniCloud.callFunction({
      name: 'login',
      data: {
        code: loginRes.code,
        userInfo: userRes.userInfo
      }
    });
    
    if (cloudErr || !cloudRes.result.success) {
      throw new Error(cloudRes?.result?.message || '服务器登录失败');
    }

    // 5. 保存用户信息
    uni.setStorageSync('userInfo', userRes.userInfo);
    if (cloudRes.result.token) {
      uni.setStorageSync('token', cloudRes.result.token);
    }

    // 6. 提示成功
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    });

    // 7. 通知上一页面登录成功
    const eventChannel = getOpenerEventChannel();
    eventChannel.emit('loginSuccess', userRes.userInfo);

    // 8. 返回上一页
    setTimeout(() => {
      uni.navigateBack();
    }, 1500);

  } catch (error) {
    console.error('授权登录失败:', error);
    uni.showToast({
      title: error.message || '授权登录失败',
      icon: 'none'
    });
  } finally {
    loading.value = false;
  }
};

// 处理取消
const handleCancel = () => {
  uni.navigateBack();
};
</script>

<style lang="scss">
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40rpx;
  background-color: #f5f5f5;
  
  .auth-card {
    width: 100%;
    max-width: 600rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    box-shadow: 0 4rpx 12rpx rgba(0,0,0,0.1);
    text-align: center;
    
    .logo {
      width: 160rpx;
      height: 160rpx;
      margin-bottom: 30rpx;
    }
    
    .title {
      font-size: 36rpx;
      font-weight: bold;
      color: #333;
      margin-bottom: 20rpx;
    }
    
    .desc {
      font-size: 28rpx;
      color: #666;
      margin-bottom: 40rpx;
    }
    
    .auth-btn {
      margin-bottom: 20rpx;
      width: 80%;
    }
    
    .cancel-btn {
      width: 80%;
      color: #666;
    }
  }
}
</style>