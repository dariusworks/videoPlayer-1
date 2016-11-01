##hVideo
![image](./ys.png)
####在head标签内引入hVideo.min.css
		<link rel="stylesheet" href="./css/hVideo.min.css">
####在body底部引入fz-video.js
		<script src="./js/hVideo.min.js"></script>
####随后实例化播放器即可
		<script>
			var videos = new hVideo({
		 		id : 'id',
		 		url : 'name.mp4',
		 		autoplay : true,
		 		controls : true
		 	});
	 	</script>
####参数说明
		id	: 传入容器的id,播放器大小依据容器大小来创建
		url : 视频的url
		autoplay : 是否自动播放,默认为true
		constrols : 是否显示播放器控件,默认为true
API
>[所有API请访问我的个人网站查看,有任何问题也可在我的个人网站留言](http://huangyaoxin.com/home/index/detial/id/29/path/29)