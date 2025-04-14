'use strict';

const db = uniCloud.database();  // 获取数据库实例

exports.main = async (event, context) => {
  // 打印客户端上传的参数
  console.log('event:', event);
  
  // 获取客户端传入的数据（直播记录相关信息）
  const { userPhone, roomId, startTime, productInfo } = event;

  // 验证必要参数是否存在
  if (!userPhone || !roomId || !startTime) {
    return {
      success: false,
      message: '缺少必要参数：userPhone、roomId、startTime'
    };
  }

  try {
    // 将数据保存到 `live-record` 表
    const result = await db.collection('live-record').add({
      userPhone,      // 用户手机号
      roomId,         // 直播房间ID
      startTime,      // 直播开始时间
      productInfo: productInfo || ''  // 产品信息，若未传递则为 '' 
    });

    // 返回成功的响应
    return {
      success: true,
      message: '直播记录保存成功',
      data: result  // 返回插入的结果，包括 `_id`
    };
  } catch (error) {
    // 捕获并处理数据库操作中的错误
    console.error('保存直播记录失败:', error);
    return {
      success: false,
      message: '保存直播记录失败，请稍后重试',
      error: error.message || '未知错误'
    };
  }
};
