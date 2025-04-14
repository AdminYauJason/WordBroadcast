<template>
  <view class="container">
    <!-- 顶部导航栏组件化 -->
    <view class="navbar safe-area-inset-top">
      <image src="../../static/qiyeweixin01.png" mode="aspectFit" class="nav_image"></image>
      <view class="nav_text">
        <text class="main_text">AI助手</text>
        <text class="sub_text">你的智能助手，帮助你生成直播话术</text>
      </view>
      <button class="stop_button" @tap="stopMessageGenerator">结束</button>
    </view>

    <!-- 聊天内容区域 -->
    <scroll-view 
      class="chat_content" 
      scroll-y
      :scroll-top="scrollTop"
      :scroll-with-animation="true"
    >
	<view style="height: 20rpx;"></view>
      <view 
        v-for="(message, index) in messages" 
        :key="message.id || index" 
        class="message"
        :class="[message.isUser ? 'user-message' : 'robot-message']"
      >
        <image 
          v-if="!message.isUser" 
          src="../../static/qiyeweixin01.png" 
          mode="aspectFit" 
          class="robot_avatar"
          lazy-load
        ></image>
        <view class="message_text" :class="{'user-text': message.isUser}">
          {{ message.text }}
        </view>
      </view>
    </scroll-view>

    <!-- 悬浮按钮 -->
    <view class="floating-button-wrapper safe-area-inset-bottom">
      <button 
        class="floating-button" 
        @tap="openFloatingWindow"
        hover-class="button-hover"
      >
        打开悬浮窗
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { store } from '@/uni_modules/uni-id-pages/common/store.js';

// 插件引入
const LinFloatWeb = uni.requireNativePlugin('Lin-Float-Webview');

// 状态管理
const messages = ref([]);
const scrollTop = ref(0);
const isApiActivated = ref(false);
let interval = null;
const userphone = ref('');
const liveInfo = ref(null);

// 消息生成间隔时（毫秒）
const MESSAGE_INTERVAL = 2000;

// API相关状态
const apiState = ref({
  speakingOutput: '',
  traderWords:'',
  tokens: 0,
  isProcessing: false,
  error: null,
  retryCount: 0,
  maxRetries: 3, // 最大重试次数
  retryInterval: 15000 // 重试间隔(ms)
});

// 添加状态控制


// 生成唯一ID
const generateId = () => Date.now() + Math.random().toString(36).substr(2, 9);

// 获取用户手机号
const getPhone = () => {
  return store.userInfo.mobile;  
};

// 获取直播间信息
const fetchLiveInfo = async () => {
  try {
    const res = await uniCloud.callFunction({
      name: 'getliveRecordData',
      data: {
        userphone: userphone.value
      }
    });
    
    if (res.result.success && res.result.data) {
      const latestRecord = Array.isArray(res.result.data) 
        ? res.result.data[0]  // 假设按时间倒序，取最新记录
        : res.result.data;
        
      liveInfo.value = {
        roomId: latestRecord.roomId,
        productInfo: latestRecord.productInfo
      };
      
      console.log('获取到直播间信息:', liveInfo.value);
      return true;
    } else {
      console.error('获取数据失败:', res.result.message);
      apiState.value.error = '未找到直播间信息';
      return false;
    }
  } catch (error) {
     console.error('调用云函数失败:', error);
    apiState.value.error = '获取直播间信息失败';
    return false;
  }
};

// 激活API
const activateApi = async () => {
  if (!liveInfo.value) return false;
  
  try {
    apiState.value.isProcessing = true;
    apiState.value.error = null;
    
    const res = await uni.request({
      url: 'http://47.102.98.100:8089/api/live/realtimeAnalysis',
      method: 'post',
      data: {
        roomId: liveInfo.value.roomId,
        productInfo: liveInfo.value.productInfo
      }
    });
    
    if (res.statusCode === 200) {
      isApiActivated.value = true;
      console.log('API激活成功');
      return true;
    }
    
    apiState.value.error = 'API激活失败';
    return false;
  } catch (error) {
    console.error('API激活失败:', error);
    apiState.value.error = 'API激活请求失败';
    return false;
  } finally {
    apiState.value.isProcessing = false;
  }
};

// 获取AI话术
const getAiScript = async () => {
  if (!liveInfo.value) return null;
  
  try {
    apiState.value.isProcessing = true;
    apiState.value.error = null;
    
    const res = await uni.request({
      url: 'http://47.102.98.100:8089/api/live/realtimeAnalysis',
      method: 'post',
      data: {
        roomId: liveInfo.value.roomId,
        productInfo: liveInfo.value.productInfo
      }
    });
    
    // 处理不同状态码
    if (res.statusCode === 200) {
      if (res.data.code === 0) {
        // 成功获取数据
        apiState.value.speakingOutput = res.data.data.speakingOutput;
        apiState.value.tokens = res.data.data.tokens;
        apiState.value.retryCount = 0; // 重置重试计数
		apiState.value.traderWords = res.data.data.traderWords;
		uniCloud.callFunction({
			name:'submitscript',
			data:{
				aiScript:apiState.value.speakingOutput,
				traderWords:apiState.value.traderWords,
				tokens:apiState.value.tokens
			}
		});
        return res.data.data.speakingOutput;
      } else if (res.data.code === 202) {
        // 需要等待数据准备
        if (apiState.value.retryCount < apiState.value.maxRetries) {
          apiState.value.retryCount++;
          await new Promise(resolve => setTimeout(resolve, apiState.value.retryInterval));
          return await getAiScript(); // 递归重试
        } else {
          throw new Error('获取数据超时');
        }
      } else {
        throw new Error(res.data.msg || '请求失败');
      }
    }
    
    throw new Error('请求失败');
  } catch (error) {
    console.error('获取AI话术失败:', error);
    apiState.value.error = error.message;
    return null;
  } finally {
    apiState.value.isProcessing = false;
  }
};

// 初始化系统
const initSystem = async () => {
  // 获取用户手机号
  userphone.value = getPhone();
  if (!userphone.value) {
    apiState.value.error = '未获取到用户手机号';
    return false;
  }
  
  // 获取直播间信息
  const hasLiveInfo = await fetchLiveInfo();
  if (!hasLiveInfo) return false;
  
  // 激活API
  const isActivated = await activateApi();
  return isActivated;
};

// 停止消息生成
const stopMessageGenerator = async () => {
  const ans = await uni.request({
  	url:`http://47.102.98.100:8089/api/stop/roomid=${liveInfo.value.roomId}`,
	method:'post'
  });
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
  if(ans.statusCode === 200){
	  uni.showToast({
		title: '已停止生成消息',
		icon: 'none'
	  });
	  console.log(ans.data.message);
  }
};

// 修改消息生成器
const generateMessages = async () => {
  if (apiState.value.isProcessing) return;
  
  try {
    // 确保已经初始化
    if (!isApiActivated.value) {
      const initialized = await initSystem();
      if (!initialized) {
        stopMessageGenerator();
        return;
      }
    }
    
    const aiScript = await getAiScript();
    if (!aiScript) {
      stopMessageGenerator();
      return;
    }
    
    // 创建格式化的消息文本，将AI话术和运营建议分开显示
    const formattedText = `运营建议：\n${apiState.value.traderWords} \n\nAI话术建议：\n${apiState.value.speakingOutput}`;
    
    const newMessage = {
      id: generateId(),
      text: formattedText,
      isUser: false,
      timestamp: Date.now(),
      tokens: apiState.value.tokens
    };
    
    messages.value.push(newMessage);
    nextTick(() => {
      scrollTop.value = messages.value.length * 100;
    });
  } catch (error) {
    console.error('消息生成错误:', error);
    stopMessageGenerator();
    uni.showToast({
      title: '消息生成发生错误',
      icon: 'none'
    });
  }
};

// 修改开启消息生成
const startMessageGenerator = () => {
  interval = setInterval(generateMessages, MESSAGE_INTERVAL);
};

// 悬浮窗处理
const openFloatingWindow = async () => {
  try {
    await new Promise((resolve, reject) => {
      LinFloatWeb.applyPermission(resolve, reject);
    });
    const baseUrl = plus.io.convertLocalFileSystemURL('./././static/webview.html');
    LinFloatWeb.create({
      url: `file://${baseUrl}`,
      width: 300,
      height: 200,
      x: uni.getSystemInfoSync().windowWidth - 350,
      y: uni.getSystemInfoSync().windowHeight - 450,
      dragType: 2,
      transparent: true,
    }, (msg) => {
      console.log('悬浮窗创建成功:', msg);
      LinFloatWeb.show();
    });
  } catch (error) {
    console.error('创建悬浮窗失败:', error);
    uni.showToast({
      title: '无法创建悬浮窗,请检查权限',
      icon: 'none'
    });
  }
};

// 生命周期钩子
onMounted(async () => {
  const initialized = await initSystem();
  if (initialized) {
    startMessageGenerator();
  } else {
    uni.showToast({
      title: apiState.value.error || '系统初始化失败',
      icon: 'none'
    });
  }
});

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
  stopMessageGenerator(); // 添加这一行以确保在卸载时停止消息生成
});
</script>


<style>
.container {
  background-color: #f6f8fe;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
}

.navbar {
  position: sticky;
  top: 0;
  background: linear-gradient(to bottom, #4a90e2, #ffffff);
  display: flex;
  align-items: center;
  padding: 20rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
  min-height: 120rpx;
  z-index: 100;
}

.nav_image {
  width: 80rpx;
  height: 80rpx;
  margin-right: 20rpx;
  border-radius: 50%;
}

.nav_text {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-right: 20rpx;
}

.main_text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  line-height: 1.2;
}

.sub_text {
  font-size: 24rpx;
  color: #666666;
  margin-top: 4rpx;
}
.stop_button {
  font-size: 24rpx;
  color: #ffffff;
  background-color: #e74c3c;
  border: none;
  border-radius: 8rpx;
  padding: 8rpx 24rpx;
  height: 56rpx;
  min-width: 100rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto; /* 将按钮推到右边 */
  transition: all 0.2s ease;
}

.stop_button:active {
  background-color: #c0392b;
  transform: scale(0.95);
}

.chat_content {
  flex: 1;
  padding: 40rpx 20rpx 20rpx;
  display: flex;
  flex-direction: column-reverse;
  overflow: auto;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20rpx;
  animation: fadeIn 0.3s ease-in-out;
}

.robot-message {
  justify-content: flex-start;
}

.user-message {
  justify-content: flex-end;
}

.robot_avatar {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
  margin-right: 16rpx;
}

.message_text {
  padding: 16rpx 24rpx;
  border-radius: 24rpx;
  max-width: 70%;
  word-break: break-word;
  font-size: 28rpx;
  line-height: 1.6;
  background-color: #fff;
  box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
  white-space: pre-wrap;
}

.user-text {
  background-color: #4a90e2;
  color: #ffffff;
}

.floating-button-wrapper {
  position: fixed;
  bottom: 40rpx;
  right: 40rpx;
  z-index: 100;
}

.floating-button {
  width: 240rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: linear-gradient(135deg, #4a90e2, #357abd);
  color: #ffffff;
  border: none;
  border-radius: 40rpx;
  font-size: 28rpx;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4rpx 12rpx rgba(74, 144, 226, 0.3);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: float 3s ease-in-out infinite;
}

.floating-button:hover {
  transform: translateY(-4rpx);
  box-shadow: 0 8rpx 16rpx rgba(74, 144, 226, 0.4);
}

.floating-button:active {
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 8rpx rgba(74, 144, 226, 0.2);
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2rpx);
  }
}

</style>