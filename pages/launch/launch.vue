<template>
  <view class="startup-page" @click="handlePageClick">
    <!-- Logo区域 -->
    <view class="logo-container">
      <!-- 背景动画圆圈 -->
      <view class="background-circles">
        <view class="circle circle-1"></view>
        <view class="circle circle-2"></view>
        <view class="circle circle-3"></view>
      </view>
      <!-- 文字Logo -->
      <view class="logo">
        <text 
          v-for="(letter, index) in letters" 
          :key="index"
          :style="{ animationDelay: `${index * 0.15}s` }"
          class="letter"
        >
          {{ letter }}
        </text>
      </view>
      <!-- 进度条 -->
      <view class="progress-bar">
        <view class="progress" :style="{ width: `${progress}%` }"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      letters: ['P', 'R', 'O', 'M', 'P', 'T', 'P', 'A', 'L'],
      progress: 0,
      timer: null,
      canNavigate: true
    }
  },
  onReady() {
    // 启动进度条动画
    this.startProgress()
  },
  methods: {
    startProgress() {
      this.timer = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 2
        } else {
          // 到达100%后清除定时器
          clearInterval(this.timer)
        }
      }, 60)
    },
    handlePageClick() {
      if (this.canNavigate) {
        this.canNavigate = false // 防止重复跳转
        if (this.timer) {
          clearInterval(this.timer)
        }
        uni.reLaunch({
          url: '/pages/home_page/home_page'
        })
      }
    }
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
.startup-page {
  width: 100%;
  height: 100vh;
  background: linear-gradient(45deg, #3b82f6, #9333ea, #f59e0b, #3b82f6);
  background-size: 400% 400%;
  animation: gradient 6s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.logo-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}
/* 背景动画圆圈 */
.background-circles {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.1);
  animation: circleAnimation 4s ease-out infinite;
}
.circle-1 {
  width: 100px;
  height: 100px;
  animation-delay: 0s;
}
.circle-2 {
  width: 140px;
  height: 140px;
  animation-delay: 0.5s;
}
.circle-3 {
  width: 180px;
  height: 180px;
  animation-delay: 1s;
}
.logo {
  position: relative;
  display: flex;
  gap: 8px;
  z-index: 1;
}
.letter {
  font-size: 40px;
  font-weight: bold;
  color: #ffffff;
  opacity: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
  animation: letterAnimation 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
/* 进度条样式 */
.progress-bar {
  width: 200px;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 1.5px;
  overflow: hidden;
}
.progress {
  height: 100%;
  background: #ffffff;
  border-radius: 1.5px;
  transition: width 0.2s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@keyframes letterAnimation {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  60% {
    transform: translateY(-5px) scale(1.1);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes circleAnimation {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.3;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
</style>