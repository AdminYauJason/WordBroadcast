module.exports = {
	"image-captcha": {
		"width": 150, 				// 图片宽度
		"height": 44, 				// 图片高度
		"background": "#FFFAE8",	// 验证码背景色
		"size": 4, 					// 验证码长度，设置为 4 个字符
		"noise": 4, 				// 验证码干扰线条数，设置为 4 条
		"color": true, 				// 字体是否使用随机颜色
		"fontSize": 40, 			// 字体大小为 40
		"ignoreChars": '1I0o', 		// 忽略字符：'1', 'I', '0', 'o'
		"mathExpr": false, 			// 禁用数学表达式验证码
		// "mathMin": 1, 				// 数学表达式的最小数字
		// "mathMax": 9, 				// 数学表达式的最大数字
		// "mathOperator": '+', 		// 数学表达式使用加法运算符
		"expiresDate": 180			// 验证码过期时间为 180 秒（3 分钟）
	}
}
