<template>
  <view class="container">
    <text class="title">准备就绪</text>
    <text class="message">即将开始生成话术，请点击"开始"继续！</text>
    <view class="next-button" @click="handleStart">开始</view>
  </view>
</template>

<script>
import { onMounted,ref } from 'vue';
import { store } from '@/uni_modules/uni-id-pages/common/store.js';


export default {
  setup() {
	  const userphone = ref('');
	  const getphone = () =>{
	  	return store.userInfo.mobile;
	  };
	  
	  userphone.value = getphone();
    const fetchLiveRecordData = async () => {
      try {
        const res = await uniCloud.callFunction({
          name: 'getliveRecordData',
		  data:{
			  userphone:userphone.value
		  }
        });
        
        if (res.result.success) {
          console.log('获取的直播记录数据:', res.result.data);
        } else {
          console.error('获取数据失败:', res.result.message);
        }
      } catch (error) {
        console.error('调用云函数失败:', error);
      }
    };

    const handleStart = async () => {
      try {
        // Get the phone number from the store
        const phoneNumber = store.userInfo.mobile;
        
        if (!phoneNumber) {
          throw new Error('未获取到用户手机号');
        }
        
        console.log('用户手机号:', phoneNumber);
        
        // After successfully getting the phone number, navigate
        uni.navigateTo({
          url: '/pages/Robot/Robot'
        });
      } catch (error) {
        console.error('处理登录失败:', error);
        uni.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        });
      }
    };

    onMounted(() => {
      fetchLiveRecordData();
    });

    return {
      handleStart
    };
  }
};
</script>


<style scoped>
/* 保持原有样式不变 */
.title {
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  animation: bounce 1s ease infinite;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  padding: 20px;
}

.message {
  font-size: 20px;
  color: #eeeeee;
  text-align: center;
  line-height: 1.6;
  margin: 0 20px 20px;
}

.next-button {
  width: 150px;
  height: 60px;
  background: linear-gradient(135deg, #4895ef 0%, #4361ee 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 22px;
  font-weight: bold;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.next-button:hover {
  background: linear-gradient(135deg, #4361ee 0%, #4895ef 100%);
  transform: scale(1.05);
}

.next-button:active {
  background: #357abd;
  transform: scale(0.98);
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>