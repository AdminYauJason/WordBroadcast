'use strict';

const db = uniCloud.database();  // 获取数据库实例

exports.main = async (event, context) => {
  const { aiScript, tokens, beijingTime, traderWords, roomId, userPhone } = event;

  // 验证参数是否完整
  if (!aiScript || tokens === undefined || !beijingTime || !traderWords || !roomId || !userPhone) {
    return {
      success: false,
      message: '缺少必要参数：aiScript、tokens、beijingTime、traderWords、roomId、userPhone'
    };
  }

  try {
    // 将数据保存到 `bot-script` 表
    const result = await db.collection('bot_script').add({
      aiScript,       // AI 脚本内容
      tokens,         // 代币数量
      beijingTime,    // 北京时间
      traderWords,    // 交易者发言内容
      roomId,         // 直播房间ID
      userPhone       // 用户手机号
    });

    // 返回成功响应
    return {
      success: true,
      message: '交易机器人脚本记录保存成功',
      data: result  // 返回插入的结果
    };
  } catch (error) {
    // 捕获并处理错误
    console.error('保存交易机器人脚本记录失败:', error);
    return {
      success: false,
      message: '保存交易机器人脚本记录失败，请稍后重试',
      error: error.message || '未知错误'
    };
  }
};

