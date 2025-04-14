<template>
	<view class="container">
		<view class="caption">
			<text>悬浮窗控制</text>
		</view>
		<view class="caption" style="width: 100%; font-size: 30rpx;">
			<text>显示隐藏</text>
		</view>
		<button type="warn" @click="toggle()">切换悬浮窗的显示与隐藏</button>
		<view class="row-btn  side-btn">
			<button type="primary" size="mini" @click="show()">显示</button>
			<button type="warn" size="mini" @click="hide()">隐藏</button>
			<button type="primary" size="mini" @click="destroy()">销毁</button>
		</view>
		<view class="caption" style="width: 100%; font-size: 30rpx;">
			<text>拖拽方式</text>
		</view>
		<view class="row-btn side-btn">
			<button type="warn" size="mini" @click="setDragType(1)">不可拖拽</button>
			<button type="primary" size="mini" @click="setDragType(2)">随意拖拽</button>
			<button type="primary" size="mini" @click="setDragType(3)">吸边拖拽</button>
		</view>
		<view class="caption" style="width: 100%; font-size: 30rpx;">
			<text>修改悬浮窗内容</text>
		</view>
		<button type="primary" size="mini" @click="show('test')">打开第二个悬浮窗</button>
		<view class="row-btn">
			<button type="warn" size="mini" @click="
				evalJS(`document.querySelector('body').innerHTML = '执行了,清空页面html';`, 'test');
				show('test')
			">向悬浮窗注入JS代码</button>
			<button type="warn" size="mini" @click="
				update({
					id: 'test',
					css: 'html {background: red}'
				})
				show('test');
			">修改悬浮窗css样式</button>
			<button type="primary" size="mini" @click="
				changeURL('https://api.lincq.cn/app/index.html', 'test');
				show('test');
				">打开一个网页窗口</button>
			<button type="primary" size="mini" @click="
			update({
				id: 'test',
				data: {msg: '点击了 “向悬浮窗传递数据”'}
			});
			show('test');
			">向悬浮窗传递数据</button>
			<button type="primary" size="mini" @click="update({
				id: 'test',
				width: 200,
				height: 200
			});
			show('test');">修改悬浮窗的大小</button>
			<button type="primary" size="mini" @click="update({
				id: 'test',
				x: 100,
				y: 100
			}); show('test')">修改悬浮窗的位置</button>
		</view>
		<view class="caption">
			<text>悬浮窗效果</text>
		</view>
		<view class="row-btn">
			<button type="primary" size="mini" v-for="(item, index) in templeteList"
				@click="template(item.fileName, ...item.size)">{{item.title || '效果' + (index + 1)}}</button>
		</view>
	</view>
</template>

<script>
	// 导入插件, 运行前请务必重新打包自定义基座，否则 LinFloatWeb 返回的会是 `undefined`
	const LinFloatWeb = uni.requireNativePlugin('Lin-Float-Webview');
	export default {
		data() {
			return {
				templeteList: [{
					title: 'window效果',
					fileName: 'index',
					size: [250, 300]
				}, {
					title: '功能选择效果',
					fileName: 'radio',
					size: [286, 96]
				}, {
					title: '开关效果1',
					fileName: 'switch1',
					size: [101, 42]
				}, {
					title: '悬浮输入框',
					fileName: 'input',
					size: [230, 48]
				}, {
					title: '开关效果3',
					fileName: 'switch3',
					size: [60, 34]
				}, {
					title: '开关效果',
					fileName: 'switch',
					size: [98, 56]
				}, {
					title: '开关效果4',
					fileName: 'toggle',
					size: [150, 75]
				}, {
					title: '旋转的地球',
					fileName: 'earth',
					size: [100, 100]
				}, {
					title: '音量调节示例',
					fileName: 'range',
					size: [134, 129]
				}]
			};
		},
		onLoad() {
			// 请求悬浮窗权限 参数：成功回调 successCallback，失败回调 failCallback
			LinFloatWeb.applyPermission(() => {
				LinFloatWeb.create({
					url: this.generateUrl('/static/template/index.html'), // url地址
					id: "window", // 悬浮窗的标识，用于区分多悬浮窗显示, 只显示一个悬浮窗时可不传，默认：window
					html: '', // html内容：可选（如果有传入url参数则会在页面追加html内容）
					javaScript: '', // 悬浮窗页面的js脚本
					css: 'html, body { padding: 0; margin: 0; }', // 悬浮窗页面的样式
					data: {}, // 向网页传递数据，网页内 可用 getData((data) => console.log('data: ', data)) 接受数据
					x: 50, // 悬浮窗的初始位置
					y: 500, // 悬浮窗的初始位置
					width: 250, // 悬浮窗宽度 单位：px
					height: 300, // 悬浮窗高度 单位：px
					toolbar: false, // 是否悬浮窗显示工具条
					dragType: 2, // 设置悬浮窗的拖动类型 1：不可拖拽，2：随意拖拽，3：吸边拖拽
					transparent: true, // 悬浮窗背景是否透明
				}, msg => {
					// 更新回调 或 接收悬浮窗内的html页 putCallback(key, value) 和 Android.callback(key, value) 的回调消息
					console.log(msg); // msg格式：{}
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(msg)
					})
				});
				LinFloatWeb.create({
					id: "test",
					html: `<h1>我是第二个悬浮窗</h1>
					<p>我的背景默认是透明的</p>`,
					css: '',
					javaScript: `getData((data) => document.querySelector('body').innerHTML = '接收的的数据：'+data)`,
					width: 250,
					height: 300,
					toolbar: true,
					transparent: false
				}, msg => {
					console.log(msg);
					uni.showToast({
						icon: 'none',
						title: JSON.stringify(msg)
					})
				});
				// LinFloatWeb.show()
			}, () => console.log('未取得权限'));
		},
		
		methods: {
			generateUrl(path = '') {
				return 'file://' + plus.io.convertLocalFileSystemURL('_www' + path);
			},
			toggle(id = '') {
				// 切换悬浮窗的显示与隐藏，参数：窗口唯一标识 id， 可不传默认：window
				LinFloatWeb.toggle(id);
				// LinFloatWeb.toggle('悬浮窗的id');
			},
			show(id = '') {
				// 控制悬浮窗显示，参数：窗口唯一标识 id， 可不传默认：window
				LinFloatWeb.show(id);
				// LinFloatWeb.show('悬浮窗的id');
			},
			hide(id = '') {
				// 控制悬浮窗显示隐藏，参数：窗口唯一标识 id， 可不传默认：window
				LinFloatWeb.hide(id);
				// LinFloatWeb.hide('悬浮窗的id');
			},
			destroy(id = '') {
				// 移除悬浮窗，与 show() 方法不同的是 destroy() 可以在页面节点中将悬浮窗移除
				LinFloatWeb.destroy(id);
				// LinFloatWeb.destroy('悬浮窗的id');
			},
			update(params = {}) {
				params = !Object.keys(params).length ? {
					// id: '',
					x: 100,
					y: 100,
					width: 100,
					height: 100,
					dragType: 2,
					// css: `html {background: red;}`,
					// html: '',
					// javaScript: `document.querySelector('body').style.background='red';`,
					// url: 'file://'+ plus.io.convertLocalFileSystemURL('_www/static/html/index.html')
					// data: {},
				} : params;
				// 更新悬浮窗的内容 包括 悬浮窗的大小 位置 url 数据 更新js css等
				// 参数：id, x, y, width, height, dragType, url, html, javaScript, css, data
				LinFloatWeb.update(params, res => { // 更新成功回调
					console.log('update: ', res); // res格式：{}
					// uni.showToast({
					// 	icon: 'none',
					// 	title: JSON.stringify(res)
					// })
				})
			},
			evalJS(js, id = '') {
				// 向悬浮窗注入JavaScript脚本。（注意格式，每一句代码都要以半角封号结尾）
				LinFloatWeb.evalJS(js, id);
			},
			exeFunc() {
				// 执行悬浮窗内的JS函数，可以是预先定义好的方法或是内容的js API，参数：窗口唯一标识 id， 可不传默认：window
				LinFloatWeb.exeFunc(`Android.toggle('window')`);
				// LinFloatWeb.exeFunc('func()', '悬浮窗的id');
			},
			reload(id = '') {
				// 用于刷新重载悬浮窗，参数：窗口唯一标识 id， 可不传默认：window
				LinFloatWeb.reload(id)
				// LinFloatWeb.('悬浮窗的id');
			},
			changeURL(url, id = '') {
				// 更换悬浮窗中的url地址
				LinFloatWeb.changeURL(url, id)
				// LinFloatWeb.changeURL('https://www.baidu.com/', '悬浮窗的id');
			},
			setDragType(type = 2) {
				// 设置悬浮窗的拖动类型 1：不可拖拽，2：随意拖拽，3：吸边拖拽；参数二：窗口唯一标识 id， 可不传默认：window
				// LinFloatWeb.setDragType(type);
				// LinFloatWeb.setDragType(2, '悬浮窗的id');
				this.update({
					dragType: type
				});
			},
			setFocusable(isAllow = false) {
				// 设置是否允许长时间聚焦悬浮窗, 用于悬浮窗口 需要使用键盘输入内容到悬浮窗时, 需要设置true(默认为false关闭, 开启后该功能影响 设备返回和键盘的使用等)
				LinFloatWeb.setFocusable(isAllow);
				// LinFloatWeb.setFocusable(true, '悬浮窗的id');
			},
			// 更新位置
			template(fileName, width, height) {
				this.show();
				this.update({
					url: this.generateUrl('/static/template/' + fileName + '.html'),
					width,
					height
				});
			}
		}
	};
</script>

<style lang="scss">
	@import 'float-wenview.scss';
</style>