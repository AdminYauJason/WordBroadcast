'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
  const {userphone} = event;
  try {
    // 1. 获取该手机号的所有记录
    const collection = db.collection('live-record');
    const liveRes = await collection
      .where({ userPhone: userphone })
      .field({ roomId: true, createTime: true })
      .orderBy('createTime', 'desc')
      .get();
    
    if (!liveRes.data.length) {
      return {
        success: true,
        data: []
      };
    }
    
    // 2. 提取所有不重复的roomId
    const roomIds = [...new Set(liveRes.data.map(record => record.roomId))];
    
    // 3. 创建roomId到最新createTime的映射
    const timeMap = new Map();
    liveRes.data.forEach(record => {
      // 只保存每个roomId最新的createTime
      if (!timeMap.has(record.roomId) || 
          timeMap.get(record.roomId) < record.createTime) {
        timeMap.set(record.roomId, record.createTime);
      }
    });
    
    // 4. 获取每个roomId的tokens总和
    const botScriptCollection = db.collection('bot_script');
    const aggregateResult = await botScriptCollection
      .aggregate()
      .match({
        roomId: db.command.in(roomIds)
      })
      .group({
        _id: '$roomId',
        totalTokens: db.command.aggregate.sum('$tokens')
      })
      .end();

    // 5. 合并数据并返回
    return {
      success: true,
      data: aggregateResult.data.map(item => ({
        roomId: item._id,
        tokens: item.totalTokens,
        createTime: timeMap.get(item._id)
      }))
    };
    
  } catch (error) {
    console.error('查询数据失败:', error);
    return {
      success: false,
      message: '查询数据失败',
    };
  }
};