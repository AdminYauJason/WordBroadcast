const db = uniCloud.database()

module.exports = async function () {
  try {
    // 查询 batch-sms-template 集合的记录总数
    const count = await db.collection('batch-sms-template').count()

    // 如果有记录，设置相关表名
    if (count.total > 0) {
      // 返回包含表名的对象
      return {
        template: 'batch-sms-template',
        task: 'batch-sms-task',
        log: 'batch-sms-result'
      }
    } else {
      // 如果没有记录，返回空对象或自定义信息
      return {
        success: false,
        message: '没有找到批量短信模板记录'
      }
    }
  } catch (e) {
    // 捕获并记录异常信息
    console.error('查询 batch-sms-template 集合失败:', e)

    // 返回失败信息给调用者
    return {
      success: false,
      message: '数据库查询失败，请稍后重试',
      error: e.message || '未知错误'
    }
  }
}

