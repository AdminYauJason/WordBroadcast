'use strict'; 
const db = uniCloud.database();

exports.main = async (event, context) => {
  const { roomId, productInfo, userPhone } = event;

  // 验证房间ID格式
  if (!roomId || !/^\d{19}$/.test(roomId)) {
    return {
      success: false,
      message: '房间ID格式错误，需要19位数字'
    };
  }

  try {
    // 如果 userPhone 是 '0'，说明未登录，返回提示
    if (userPhone === '0') {
      return {
        success: false,
        message: '请先登录并获取手机号',
        code: 401
      };
    }

    // 获取北京时间
    const currentTime = new Date();
    const beijingTime = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000); // 北京时间是UTC+8

    // 保存记录
    const recordData = {
      userPhone, // 使用前端传递的手机号
      roomId,
      productInfo: productInfo || '',
      createTime: beijingTime
    };
    await db.collection('live-record').add(recordData);

    return {
      success: true,
      message: '信息保存成功',
      data: {
        roomId,
        startTime: beijingTime
      }
    };
  } catch (error) {
    console.error('提交记录失败:', error);
    return {
      success: false,
      message: error.message || '提交失败，请稍后重试',
      code: 500
    };
  }
};
