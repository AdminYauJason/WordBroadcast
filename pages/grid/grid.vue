<template>
  <view class="container">
    <!-- 背景动画元素 -->
    <view class="animated-background">
      <view class="circle circle-1"></view>
      <view class="circle circle-2"></view>
      <view class="circle circle-3"></view>
    </view>
    <!-- 输入区域 -->
    <view class="input_container">
      <view class="form-card">
        <text class="title">产品信息录入</text>
        <view class="input-group">
          <text class="label">产品详细信息</text>
          <textarea 
            v-model="productInfo" 
            class="textarea_box" 
            placeholder="请输入产品的详细信息..."
            placeholder-class="placeholder-style"
            :maxlength="-1"
            auto-height
          />
        </view>
        <view class="input-group">
          <text class="label">房间ID       </text>
          <input 
            v-model="roomId" 
            class="room_id_input" 
            placeholder="请输入19位数字房间ID" 
            placeholder-class="placeholder-style"
            type="number"
            maxlength="19"
          />
        </view>
        
        <button 
          :class="['confirm_button', {'confirm_button_active': isValid}]" 
          @click="handleConfirm"
          :disabled="!isValid"
          hover-class="button-hover"
        >
          <text>确定</text>
          <view class="button-arrow">→</view>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, watch } from 'vue';
import { store } from '@/uni_modules/uni-id-pages/common/store.js';

const productInfo = ref('');
const roomId = ref('');
const isValid = ref(false);
const userPhone = ref('');
if (store.hasLogin) {
  console.log('用户已登录');
} else {
  console.log('用户未登录');
}

// Get user's phone number
const getPhone = () => {
  return store.hasLogin ? store.userInfo.mobile : '0';
};

// Validate room ID input
watch(roomId, (newVal) => {
  let numbers = newVal.replace(/\D/g, '').slice(0, 19);
  if (numbers !== newVal) roomId.value = numbers;
  isValid.value = numbers.length === 19;
});

// Handle confirm button click
const handleConfirm = async () => {
  if (!isValid.value) {
    uni.showToast({ title: '请输入 19 位房间ID', icon: 'none' });
    return;
  }

  if (!userPhone.value) {
    userPhone.value = getPhone();
    if (userPhone.value === '0') {
      uni.showToast({ title: '请先获取手机号', icon: 'none' });
      return;
    }
  }
try {
  const { success, message } = await submitToCloud();
  if (success) {
    uni.showToast({ title: '提交成功', icon: 'success', duration: 2000 });
    clearForm();
    uni.navigateTo({ url: '/pages/confirm/confirm' });
  } else {
    uni.showToast({ title: message || '提交失败', icon: 'none' });
  }
} catch (error) {
  uni.showToast({ title: error.message || '提交失败', icon: 'none' });
  console.error('提交失败:', error);
}
};

// Submit data to cloud function
const submitToCloud = async () => {
  return await uniCloud.callFunction({
    name: 'submitliverecord',
    data: {
      roomId: roomId.value,
      userPhone: userPhone.value,
      productInfo: productInfo.value
    }
  });
};

// Clear the form
const clearForm = () => {
  productInfo.value = '';
  roomId.value = '';
  userPhone.value = '';
};
</script>

<style>
.container {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  position: relative;
  overflow: hidden;
}

/* 动画背景 */
.animated-background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.circle {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 15s infinite ease-in-out;
}

.circle-1 {
  width: 300rpx;
  height: 300rpx;
  background: linear-gradient(45deg, #00b4d8, #0077b6);
  top: -100rpx;
  left: -100rpx;
  animation-delay: 0s;
}

.circle-2 {
  width: 400rpx;
  height: 400rpx;
  background: linear-gradient(45deg, #4361ee, #3f37c9);
  bottom: -150rpx;
  right: -150rpx;
  animation-delay: -5s;
}

.circle-3 {
  width: 200rpx;
  height: 200rpx;
  background: linear-gradient(45deg, #4895ef, #3f37c9);
  top: 40%;
  left: 60%;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(30rpx) rotate(10deg);
  }
}

.input_container {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 40rpx;
  min-height: 100vh;
}

.form-card {
  width: 90%;
  max-width: 600rpx;
  background: rgba(30, 41, 59, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 30rpx;
  padding: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  animation: card-appear 0.6s ease-out;
}

@keyframes card-appear {
  from {
    opacity: 0;
    transform: translateY(20rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.title {
  font-size: 42rpx;
  color: #ffffff;
  font-weight: 700;
  display: flex;  /* 使用 flex 布局 */
  justify-content: center;  /* 水平居中 */
  align-items: center;  /* 垂直居中 */
  text-align: center;  /* 确保文本对齐 */
  margin-bottom: 50rpx;
  letter-spacing: 2rpx;
  text-shadow: 0 2rpx 4rpx rgba(0, 0, 0, 0.3);
  width: 100%;  /* 使标题占满父容器的宽度 */
  height: 50rpx;  /* 设置高度以帮助垂直居中 */
}


.input-group {
  margin-bottom: 30rpx;
  animation: slide-up 0.5s ease-out;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(10rpx);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.label {
  font-size: 30rpx;
  color: #e2e8f0;
  margin-bottom: 20rpx;
  display: block;
  font-weight: 500;
  letter-spacing: 1rpx;
}

.textarea_box {
  width: 90%;
  min-height: 180rpx;
  padding: 20rpx 30rpx;
  font-size: 28rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  background: rgba(15, 23, 42, 0.6);
  margin-bottom: 30rpx;
  transition: all 0.3s ease;
  color: #ffffff;
  line-height: 1.6;
}

.textarea_box:focus {
  border-color: #4895ef;
  box-shadow: 0 0 0 2rpx rgba(72, 149, 239, 0.2);
  transform: translateY(-2rpx);
  background: rgba(15, 23, 42, 0.8);
}

.placeholder-style {
  color: rgba(255, 255, 255, 0.4);
  font-size: 26rpx;
}

.room_id_input {
  width: 90%;
  height: 80rpx;
  padding: 0 30rpx;
  font-size: 28rpx;
  border: 2rpx solid rgba(255, 255, 255, 0.1);
  border-radius: 16rpx;
  background: rgba(15, 23, 42, 0.6);
  margin-bottom: 20rpx;
  transition: all 0.3s ease;
  color: #ffffff;
}

.confirm_button {
  width: 90%;
  height: 88rpx;
  background: linear-gradient(135deg, #4895ef 0%, #4361ee 100%);
  color: white;
  border: none;
  border-radius: 44rpx;
  font-size: 30rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40rpx;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.confirm_button_active {
  transform: translateY(-2rpx);
  box-shadow: 0 6rpx 20rpx rgba(72, 149, 239, 0.3);
}

.button-hover {
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 10rpx rgba(72, 149, 239, 0.2);
  opacity: 0.9;
}

.button-arrow {
  margin-left: 10rpx;
  transition: transform 0.3s ease;
}

.confirm_button:active .button-arrow {
  transform: translateX(10rpx);
}

/* 输入框聚焦动画 */
@keyframes input-focus {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}

.input_box:focus, .room_id_input:focus {
  animation: input-focus 0.3s ease;
}
</style>
