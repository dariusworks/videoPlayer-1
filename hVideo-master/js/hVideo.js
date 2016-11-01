var hVideo = function(obj){
	var self = this;
	//播放器节点
	this.dom = 
		'<div class="h-videoBox">'+
			'<div class="h-loading">'+
				'<div class="bfBtn" style="visibility:hidden;opacity:0;">'+
					'<div class="spinner">'+
					  	'<div class="rect1"></div>'+
					  	'<div class="rect2"></div>'+
					  	'<div class="rect3"></div>'+
					  	'<div class="rect4"></div>'+
					  	'<div class="rect5"></div>'+
					'</div>'+
					'<div class="sptxt">'+
						'加载中...'+
					'</div>'+
				'</div>'+
			'</div>'+
			'<video src="" class="h-videoAct"></video>'+
			'<div class="videoState">'+
				'<div class="videoStateBox">'+
					'<div class="playOrStop">'+
						'<i class="iconfont playIcon">&#xe600;</i>'+
					'</div>'+
					'<div class="currentTimeBox">'+
						'<span class="currentTimers">0:00</span>'+
						'<span>/</span>'+
						'<span class="allTimers">0:00</span>'+
					'</div>'+
					'<div class="percentage">'+
						'<div class="currentPerc">'+
						'</div>'+
						'<div class="currentPercentage">'+
						'</div>'+
						'<div class="currentAll">'+
						'</div>'+
						'<div class="currentBG">'+
						'</div>'+
					'</div>'+
					'<div class="videoSpeed">'+
						'<div class="videoBoxRe">'+
							'<i class="iconfont">&#xe603;</i>'+
							'<ul class="videoSpeedList">'+
								'<li class="videoSpeedStup bs4">2.0倍</li>'+
								'<li class="videoSpeedStup bs3">1.75倍</li>'+
								'<li class="videoSpeedStup bs2">1.5倍</li>'+
								'<li class="videoSpeedStup bs1">默认</li>'+
							'</ul>'+
						'</div>'+
					'</div>'+
					'<div class="videoSound">'+
						'<div class="videoSoundBox">'+
							'<i class="iconfont videoSoundStop">&#xe605;</i>'+
							'<div class="soundBar">'+
								'<div class="currentSound">'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'+
			'</div>'+
		'</div>';

	//按照id获取
	this.D = function(id){
		if(document.getElementById(id) == null || document.getElementById(id) == undefined || document.getElementById(id) == 'undefined'){
			alert("找不到指定id: " + id);
		} else {
			return document.getElementById(id);
		};
	};

	//获取当前实例化id下指定类
	this.C = function(cs){
		return this.D(obj.id).getElementsByClassName(cs)[0];
	};

	//节点池
	this.pools = {};

	//存入节点池
	this.saveDom = function(){
		this.pools.videoDom = this.C('h-videoAct');
		this.pools.work 	= this.C('currentPercentage');
		this.pools.work2 	= this.C('currentPerc');
		this.pools.currentTm   	= this.C('currentTimers');
		this.pools.allTime 		= this.C('allTimers');
		this.pools.percentage 	= this.C('percentage');
		this.pools.playOrStop	= this.C('playOrStop');
		this.pools.playIcon 	= this.C('playIcon');
		this.pools.bfBtn 		= this.C('bfBtn');
		this.pools.sptxt 		= this.C('sptxt');
		this.pools.soundBarBox 	= this.C('soundBar');
		this.pools.soundBar  	= this.C('currentSound');
		this.pools.vSoundStop 	= this.C('videoSoundStop');
		this.pools.currentBG   = this.C('currentBG');
		this.pools.bs1 		= this.C('bs1');
		this.pools.bs2 		= this.C('bs2');
		this.pools.bs3 		= this.C('bs3');
		this.pools.bs4 		= this.C('bs4');
		this.pools.stateBar = this.C('videoState');
	};

	//设置播放器地址
	this.setUrl = function(url){
		if(url == undefined||url == 'undefined'||url == null){
			return this.pools.videoDom.src = obj.url;
		} else {
			return this.pools.videoDom.src = url;
		};
	};

	//暂停or播放
	this.stopOrPlay = function(state){
		switch(state){
			case true:
				this.pools.videoDom.play();
			break;
			case false:
				this.pools.videoDom.pause();
			break;
			default:
				if(this.pools.videoDom.paused){
					this.pools.videoDom.play();
				} else {
					this.pools.videoDom.pause();
				};
			break;
		};
	};

	//当前播放进度
	this.videoCurrentTime = function(){
		return (this.pools.videoDom.currentTime / this.videoAllTime()).toFixed(3) * 100;
	};

	//视频总时长
	this.videoAllTime = function(){
		return this.pools.videoDom.duration;
	};

	//秒数转时分秒
	this.timeConversion = function(tim){
		var second = tim % 60;
		var min = parseInt(tim/60);
		return (Array(2).join(0)+min).slice(-2) + ':' + (Array(2).join(0)+second).slice(-2);
	};

	//计算鼠标相对元素X轴坐标
	this.mouseCurrentX = function(dmNm,event){
		var e = event || window.event;
		var ddmm = this.C(dmNm);
		var p_Left = parseInt(ddmm.getBoundingClientRect().left);
		return e.clientX - p_Left;
	};
	
	//获取元素宽度
	this.getDomWidth = function(dmNm){
		var ddmm = this.C(dmNm);
		return parseInt(ddmm.width||ddmm.offsetWidth||ddmm.clientWidth);
	};

	//打开或关闭加载动画
	this.openLoading = function(state){
		if(state){
			this.pools.bfBtn.style.visibility = "visible";
			this.pools.bfBtn.style.opacity = "1";
		} else {
			this.pools.bfBtn.style.visibility = "hidden";
			this.pools.bfBtn.style.opacity = "0";
		};
	};

	//初始化播放器
	this.init = function(){
		this.saveDom();
		this.setUrl();
		//判断是否自动播放
		if(obj.autoplay){
			this.pools.videoDom.autoplay = true;
		} else {
			this.pools.videoDom.autoplay = false;
		};
		//是否显示控制栏
		if(obj.controls){
			this.pools.stateBar.style.display = 'block';
		} else if(obj.controls == false){
			this.pools.stateBar.style.display = 'none';
		} else {
			this.pools.stateBar.style.display = 'block';
		};
		//播放器单击
		this.pools.videoDom.onclick = function(){
			self.stopOrPlay();
		};
		//视频位置改变事件
		this.pools.videoDom.ontimeupdate = function(){
			//更新暂停播放按钮图标
			if(self.pools.videoDom.paused){
				self.pools.playIcon.innerHTML = '&#xe602';
			} else {
				self.pools.playIcon.innerHTML = '&#xe600';
			};
			//更新进度条样式
			self.pools.work.style.width = self.videoCurrentTime() + "%";
			self.pools.work2.style.width = self.videoCurrentTime() + "%";
			self.pools.currentTm.innerHTML = self.timeConversion(parseInt(self.pools.videoDom.currentTime));
			self.pools.allTime.innerHTML 	= self.timeConversion(parseInt(self.videoAllTime()));
		};
		//缓冲暂停事件
		this.pools.videoDom.onwaiting = function(){
			return self.openLoading(true);
		};
		//缓冲完毕继续播放事件
		this.pools.videoDom.onplaying = function(){
			return self.openLoading(false);
		};
		//音量改变
		this.pools.videoDom.onvolumechange = function(){
			var soundSize = self.pools.videoDom.volume;
			var soundBarWidth = self.getDomWidth('soundBar')*soundSize;
			return self.pools.soundBar.style.width = soundBarWidth + 'px';
		};
		//进度条点击
		this.pools.percentage.onclick = function(){
			var widthCurrent = self.mouseCurrentX('percentage')/self.getDomWidth('percentage');
			return self.pools.videoDom.currentTime = self.videoAllTime() * widthCurrent;
		};
		//播放按钮点击
		this.pools.playOrStop.onclick = function(){
			self.stopOrPlay();
		};
		//音量调节
		this.pools.soundBarBox.onclick = function(){
			var soundBarWidth = self.getDomWidth('soundBar');
			var clickWidth = self.mouseCurrentX('soundBar');
			return self.pools.videoDom.volume = clickWidth/soundBarWidth.toFixed(2);
		};
		//音量按钮点击
		this.pools.vSoundStop.onclick = function(){
			if(self.pools.videoDom.muted){
				self.pools.videoDom.muted = false;
				self.pools.videoDom.volume = 0.99;
				self.pools.vSoundStop.innerHTML = '&#xe605;';
			} else {
				self.pools.videoDom.muted = true;
				self.pools.videoDom.volume = 0;
				self.pools.vSoundStop.innerHTML = '&#xe604;';
			};
		};
		//倍速
		this.pools.bs1.onclick = function(){
			return self.pools.videoDom.playbackRate = 1;
		};
		this.pools.bs2.onclick = function(){
			return self.pools.videoDom.playbackRate = 1.5;
		};
		this.pools.bs3.onclick = function(){
			return self.pools.videoDom.playbackRate = 1.75;
		};
		this.pools.bs4.onclick = function(){
			return self.pools.videoDom.playbackRate = 2;
		};
	};

	//销毁实例
	this.delete = function(){
		var overDom = this.D(obj.id);
		var childs = overDom.childNodes;
		var length = childs.length;
		for(var i = 0;i < length; i++){
			overDom.removeChild(childs[0]);
		};
		return false;
	};
	
	//创建播放器
	this.create = function(){
		if(this.C('h-videoBox') == null || this.C('h-videoBox') == undefined || this.C('h-videoBox') == 'undefined'){
			this.D(obj.id).innerHTML = this.dom;
			this.init();
		} else {
			alert('播放器已存在');
			return;
		}
	};
	this.create();
}