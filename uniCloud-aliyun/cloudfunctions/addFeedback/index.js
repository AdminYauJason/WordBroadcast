'use strict';
const db = uniCloud.database();
const dbCollectionName = 'opendb-feedback'; // 数据库集合名称

exports.main = async (event, context) => {
    // 事件参数 (即客户端传递的数据)
    console.log('Received event:', event);
    
    const { content, imgs, contact, mobile } = event;  // 从 event 中获取数据

    // 数据验证 (可以根据需求进行扩展)
    if (!content || !contact || !mobile) {
        return {
            code: 400,
            message: '缺少必要的参数：content, contact, mobile'
        };
    }

    try {
        // 向数据库中插入数据
        const res = await db.collection(dbCollectionName).add({
            content,    // 留言内容
            imgs,       // 图片列表
            contact,    // 联系人
            mobile,     // 联系电话
            createTime: new Date().getTime()  // 记录创建时间
        });

        // 返回成功响应
        return {
            code: 200,
            message: '提交成功',
            data: res
        };
    } catch (err) {
        // 捕获异常并返回失败响应
        console.error('Database operation failed:', err);
        return {
            code: 500,
            message: '请求服务失败',
            error: err
        };
    }
};

