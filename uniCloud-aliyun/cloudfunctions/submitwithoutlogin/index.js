'use strict';

// 创建数据库连接
const db = uniCloud.database();

// 引入 uni-id-common 模块
const uniId = require('uni-id-common');

exports.main = async (event, context) => {
  let userPhone = 'developer';  // 默认手机号为 'developer'

  const userId = context.USER_ID;  // 获取当前登录用户的 ID

  // 如果用户已登录，获取用户信息
  if (userId) {
    try {
      // 如果用户已登录，获取用户信息
      const userInfo = await uniId.getUserInfo({ uid: userId });

      if (userInfo && userInfo.phone) {
        userPhone = userInfo.phone;  // 如果有手机号，则使用该手机号
      }

    } catch (error) {
      console.error('获取用户信息失败:', error);
      // 如果获取用户信息失败，继续使用默认值
    }
  }

  // 获取前端传来的房间ID
  const { roomId, startTime } = event;

  // 如果没有传递 startTime，则使用当前时间（UTC + 8 小时）
  const currentTimeUTC = new Date();
  const currentTimeBeijing = new Date(currentTimeUTC.getTime() + 8 * 60 * 60 * 1000); // 转换为北京时间

  const finalStartTime = startTime ? new Date(startTime) : currentTimeBeijing;

  // 如果房间ID或开始时间缺失，返回错误信息
  if (!roomId || isNaN(finalStartTime)) {
    return { success: false, message: '缺少房间ID或开始时间' };
  }

  try {
    // 将数据插入数据库
    const liveRecordCollection = db.collection('live-record');
    await liveRecordCollection.add({
      userPhone,  // 使用确定的手机号（登录时为用户手机号，未登录时为 'developer'）
      roomId,     // 房间ID
      startTime: finalStartTime,  // 直播开始时间（北京时间）
    });

    // 返回成功信息
    return { success: true, message: '信息保存成功' };

  } catch (error) {
    console.error('保存数据失败:', error);
    return { success: false, message: '保存数据失败' };
  }
};
