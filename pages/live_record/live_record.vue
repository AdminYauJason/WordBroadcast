<template>
  <view class="container">
    <view class="header">
      <text>直播记录</text>
    </view>
    <view class="record-list">
      <view v-for="record in liveRecords" :key="record._id" class="record-item">
        <text>直播间ID: {{ record.roomId }}</text>
        <text>开始时间: {{ formatTime(record.startTime) }}</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      liveRecords: []  // 存放直播记录的数据
    };
  },
  onLoad() {
    this.fetchLiveRecords();
  },
  methods: {
    // 获取直播记录
    async fetchLiveRecords() {
      try {
        const userPhone = '用户手机号'; // 这里替换为当前用户的手机号，建议通过 uni-id 获取
        const db = uniCloud.database();
        const res = await db.collection('live-record')  // 确保数据库表名与实际一致
                            .where({ userPhone: userPhone })
                            .get();  // 使用 .get() 获取数据
        if (res.data && res.data.length > 0) {
          this.liveRecords = res.data;  // 存储查询到的直播记录
        } else {
          console.log('没有找到直播记录');
        }
      } catch (error) {
        console.error('获取直播记录失败:', error);
      }
    },
    // 格式化时间
    formatTime(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
    }
  }
};
</script>

<style>
.container {
  padding: 20px;
}
.header {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.record-list {
  margin-top: 10px;
}
.record-item {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.record-item text {
  display: block;
  margin-bottom: 5px;
}
</style>