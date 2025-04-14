'use strict';

const db = uniCloud.database();

exports.main = async (event, context) => {
  const {userphone} = event;
  try {
    // 查询 `live-record` 表的所有记录，获取 `roomId` 和 `productInfo`
    const collection = db.collection('live-record');
	
    const res = await collection.where({
		userPhone : userphone
	})
	.field({roomId:true,productInfo:true})
	.orderBy('createTime','desc')
	.limit(1)
	.get();

    return {
      success: true,
      data: res.data
    };
  } catch (error) {
    console.error('查询数据失败:', error);
    return {
      success: false,
      message: error.message || '查询数据失败',
    };

  }
};
