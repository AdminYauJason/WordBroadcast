'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	const{aiScript,tokens,traderWords,roomId,userphone} = event;
	try{
		const currentTime = new Date();
		const beijingTime = new Date(currentTime.getTime() + 8 * 60 * 60 * 1000); // 北京时间是UTC+8
		const Data = {
			aiScript,
			tokens,
			beijingTime,
			traderWords,
			roomId,
			userphone
		};
		await db.collection('bot_script').add(Data);
		return{
			success:true,
			message:'信息保存成功'
		};
	}catch(error)
	{
		console.error('信息保存失败',error);
		return{
			success:false,
			message:'提交失败，请稍后重试',
			code:500
		};
	}
};
