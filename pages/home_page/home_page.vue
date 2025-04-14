<template>
  <view class="container">
    <!-- 动态背景 -->
	<view class="height"></view>
    <view class="animated-bg">
      <view class="particle" v-for="n in 20" :key="n"></view>
      <view class="wave w1"></view>
      <view class="wave w2"></view>
      <view class="wave w3"></view>
    </view>

    <!-- 主要内容 -->
    <view class="content">
      <!-- 品牌区域 -->
      <view class="brand-section">
        <view class="brand-title">
          <text class="title-text">词灵播客</text>
          <view class="title-decoration">
            <view class="dot"></view>
            <view class="line"></view>
            <view class="dot"></view>
          </view>
        </view>
        <text class="brand-slogan">让直播更出彩</text>
      </view>

      <!-- 特色功能展示 -->
      <view class="features">
        <view class="feature-card" v-for="(feature, index) in features" :key="index"
              :style="{ animationDelay: index * 0.2 + 's' }">
          <view class="feature-icon">{{feature.icon}}</view>
          <view class="feature-content">
            <text class="feature-title">{{feature.title}}</text>
            <text class="feature-desc">{{feature.desc}}</text>
          </view>
        </view>
      </view>

      <!-- 开始体验按钮 -->
      <view class="cta-wrapper">
        <button class="cta-button" @tap="startExperience" hover-class="button-hover">
          <text class="button-text">开启AI助手</text>
          <view class="button-arrow">
            <view class="arrow-line"></view>
            <view class="arrow-head"></view>
          </view>
        </button>
      </view>
    </view>

    <!-- 底部装饰元素 -->
    <view class="bottom-decoration">
      <view class="glow-circle"></view>
      <view class="floating-shapes">
        <view class="shape shape1"></view>
        <view class="shape shape2"></view>
        <view class="shape shape3"></view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      features: [
        {
          icon: '🎯',
          title: '智能话术',
          desc: '一键生成吸引人的直播话术'
        },
        {
          icon: '✨',
          title: '场景模板',
          desc: '丰富的直播场景话术模板'
        },
        {
          icon: '🎨',
          title: '个性定制',
          desc: '根据商品特点智能匹配话术'
        }
      ]
    }
  },
  methods: {
    startExperience() {
      uni.switchTab({
        url: '/pages/grid/grid'
      })
    }
  }
}
</script>

<style>
.height{
	height: 30px;
}
.container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0F172A 0%, #1E293B 100%);
  position: relative;
  overflow: hidden;
}

.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffffff;
  border-radius: 50%;
  animation: float 8s infinite linear;
}

@keyframes float {
  0% {
    transform: translate(0, 0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx, 100px), var(--ty, 100px)) rotate(360deg);
    opacity: 0;
  }
}

.wave {
  position: absolute;
  width: 200%;
  height: 200%;
  background: linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1));
  border-radius: 38% 42% 61% 39% / 44% 51% 49% 56%;
  animation: wave 10s infinite linear;
}

.w1 { 
  top: -50%;
  left: -50%;
  animation-duration: 10s;
}

.w2 {
  top: -45%;
  left: -45%;
  animation-duration: 15s;
  animation-delay: -2s;
}

.w3 {
  top: -55%;
  left: -55%;
  animation-duration: 20s;
  animation-delay: -5s;
}

@keyframes wave {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.content {
  position: relative;
  padding: 60px 24px;
  z-index: 1;
}

.brand-section {
  text-align: center;
  margin-bottom: 60px;
  animation: fadeInUp 1s ease-out;
}

.brand-title {
  display: inline-block;
  margin-bottom: 16px;
}

.title-text {
  font-size: 42px;
  font-weight: bold;
  background: linear-gradient(135deg, #60A5FA 0%, #A855F7 100%);
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 0 0 30px rgba(96, 165, 250, 0.3);
}

.title-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
}

.dot {
  width: 6px;
  height: 6px;
  background: #60A5FA;
  border-radius: 50%;
}

.line {
  width: 40px;
  height: 2px;
  background: linear-gradient(90deg, #60A5FA 0%, #A855F7 100%);
  margin: 0 8px;
}

.brand-slogan {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 16px;
  display: block;
}

.features {
  margin-bottom: 60px;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  transform: translateX(-50px);
  opacity: 0;
  animation: slideIn 0.6s ease-out forwards;
}

@keyframes slideIn {
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.feature-icon {
  font-size: 36px;
  margin-right: 20px;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.feature-content {
  flex: 1;
}

.feature-title {
  font-size: 20px;
  color: #fff;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
}

.feature-desc {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.cta-wrapper {
  text-align: center;
  animation: fadeInUp 1s ease-out 0.6s backwards;
}

.cta-button {
  background: linear-gradient(135deg, #60A5FA 0%, #A855F7 100%);
  border: none;
  border-radius: 30px;
  padding: 16px 40px;
  position: relative;
  overflow: hidden;
}

.cta-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-100%);
}

.cta-button:active::before {
  animation: shine 0.5s;
}

@keyframes shine {
  100% {
    transform: translateX(100%);
  }
}

.button-text {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-right: 12px;
}

.button-arrow {
  display: inline-flex;
  align-items: center;
}

.arrow-line {
  width: 20px;
  height: 2px;
  background: #fff;
  position: relative;
  transition: width 0.3s;
}

.arrow-head {
  width: 8px;
  height: 8px;
  border-right: 2px solid #fff;
  border-top: 2px solid #fff;
  transform: rotate(45deg);
  margin-left: -4px;
}

.button-hover .arrow-line {
  width: 30px;
}

.bottom-decoration {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.glow-circle {
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, transparent 70%);
  animation: pulse 4s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: translateX(-50%) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translateX(-50%) scale(1.2);
    opacity: 0.3;
  }
}

.floating-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  background: linear-gradient(135deg, #60A5FA 0%, #A855F7 100%);
  opacity: 0.1;
  animation: floatShape 6s infinite ease-in-out;
}

.shape1 {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  left: 10%;
  animation-delay: -2s;
}

.shape2 {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  right: 15%;
  animation-delay: -4s;
}

.shape3 {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  left: 50%;
  animation-delay: -6s;
}

@keyframes floatShape {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>