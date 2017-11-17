export default class SIVM {
	constructor(siv) {
		this.siv = siv
		this.isInitial(true)
		this.hasMouseDown = false
		this.initialImage = {}//记录最初网络加载原图片的数据
		this.initialImageWidth = 0//首次加载完成使用的宽高
		this.initialImageHeight = 0
		this.scale = 50//放大缩小倍数
		this.startX = 0//鼠标点击后移动的起始X
		this.startY = 0//鼠标点击后移动的起始Y
		this.originX = 0//鼠标点击后图片的起始X
		this.originY = 0//鼠标点击后图片的起始Y
		this.currentScale = 100//记录缩放比例
		this.widthOverHeight = true //默认宽比高大
		this.relativeScale = 1//相比原图的当前缩放比例		
		this.anchorsOffsets = []//记录锚点位置
		
		window.onresize = this.reset.bind(this)
	}
	
	isInitial(isInitial) {
		
		if (isInitial) {
			this.isInitialState = true//是否初始显示大小状态，处理能否缩小问题
			if(this.siv.refs.showimage) this.siv.refs.showimage.style.cursor = "auto"
		}else {
			this.isInitialState = false
			this.siv.refs.showimage.style.cursor = "url('/img/icon_tongs.png'),auto"
		}
	}
	
	checkInitialState() {		
		//处理首次根据图片来源显示定高还是定宽
		let _showimage = this.siv.refs.showimage
		_showimage.onload = () => {
			this.siv.props.changeBackground()
			this.reloadImage()
		}
	}
	
	reloadImage() {
		let _showimage = this.siv.refs.showimage
		this.initialImage = {
				width: _showimage.naturalWidth,
				height: _showimage.naturalHeight
			}
		if (this.initialImage.width <= 0) {
			return 
		}

		let _showimageview = this.siv.refs.showimageview
		_showimage.style.top = 0 + 'px'
		_showimage.style.left= 0 + 'px'
		let _onloadWidth = this.initialImage.width
		let _onloadHeight = this.initialImage.height
		if(_onloadWidth < _showimageview.offsetWidth) { //图片宽比容器小	
			//console.log("图片宽比容器小")
			if(_onloadHeight < _showimageview.offsetHeight) { //图片高比容器小，处理居中即可
				//console.log("图片高比容器小")
				if (_onloadHeight < _onloadWidth) {//图片高小于宽
					//console.log("图片高小于宽")
					this.widthOverHeight = true
					_showimage.style.width = "100%"
					_showimage.style.height = "auto"
					if (_showimage.offsetHeight >= _showimageview.offsetHeight) {
						//console.log("图片高比容器高大")
						_showimage.style.width = "auto"
						_showimage.style.height = "100%"
						_showimage.style.marginTop = "0"
						this.widthOverHeight = false
					} else{
						//console.log("图片高比容器高小")
						_showimage.style.marginTop = `${(_showimageview.offsetHeight - _showimage.offsetHeight) / 2}px`
					}
				} else{//图片宽小于高
					//console.log("图片宽小于高")
					_showimage.style.height = "100%"
					_showimage.style.width = "auto"
					this.widthOverHeight = false
					if(_showimage.offsetWidth >= _showimageview.offsetWidth) {
						//console.log("图片宽大于容器宽")
						_showimage.style.width = "100%"
						_showimage.style.height = "auto"
						_showimage.style.marginTop = `${(_showimageview.offsetHeight - _showimage.offsetHeight) / 2}px`
						this.widthOverHeight = true
					}else {
						//console.log("图片宽小于容器宽")
						_showimage.style.marginTop = "0"
					}
				}
			} else { //图片高比容器大, 处理居中即可
				//console.log("图片高比容器大")
				_showimage.style.marginTop = "0"
				_showimage.style.height = "100%"
				_showimage.style.width = "auto"
				this.widthOverHeight = false
			}
		} else { //图片宽比容器大
			//console.log("图片宽比容器大")
			if(_onloadHeight < _showimageview.offsetHeight) { //图片高比容器小, 宽度100%
				//console.log("图片高比容器小")
				this.widthOverHeight = true
				_showimage.style.width = "100%" //先缩放再获取
				_showimage.style.height = "auto"
				_showimage.style.marginTop = `${(_showimageview.offsetHeight - _showimage.offsetHeight) / 2}px`
			} else { //图片高比容器大,判断宽高大小
				//console.log("图片高比容器大")
				if(_onloadWidth < _onloadHeight) { //图片宽小于高, 处理居中即可
					//console.log("图片宽小于高")
					_showimage.style.height = "100%"
					_showimage.style.width = "auto"
					if(_showimage.offsetWidth >= _showimageview.offsetWidth) {
						//console.log("图片宽大于容器宽")
						_showimage.style.width = "100%"
						_showimage.style.height = "auto"
						_showimage.style.marginTop = `${(_showimageview.offsetHeight - _showimage.offsetHeight) / 2}px`
						this.widthOverHeight = true
					}else {
						//console.log("图片宽小于容器宽")
						_showimage.style.marginTop = "0"//莫名其妙多出来一个margin
						this.widthOverHeight = false
					}
				} else { //图片宽大于高, 宽度100%
					//console.log("图片宽大于高")
					_showimage.style.width = "100%"
					_showimage.style.height = "auto"
					if (_showimage.offsetHeight >= _showimageview.offsetHeight) {
						//console.log("图片高比容器高大")
						this.widthOverHeight = false
						_showimage.style.height = "100%"
						_showimage.style.width = "auto"
						_showimage.style.marginTop = "0"
					} else{
						//console.log("图片高比容器高小")
						this.widthOverHeight = true
						_showimage.style.marginTop = `${(_showimageview.offsetHeight - _showimage.offsetHeight) / 2}px`
					}
				}
			}
		}

		this.initialImageWidth = _showimage.offsetWidth
		this.initialImageHeight = _showimage.offsetHeight

		let _checkedWidth = _showimage.offsetWidth
		this.relativeScale = _checkedWidth / _onloadWidth
		
		this.siv.resetCoords(this.relativeScale)
	}
	
	enlarge() {
		let _showimage = this.siv.refs.showimage
		let _showimageview = this.siv.refs.showimageview
		let _scale = _showimage.style.width != "auto" ? _showimage.style.width || _showimage.style.height : _showimage.style.height
		_scale = parseInt(_scale)
		if(_scale < 500){
			if (this.widthOverHeight){
				_showimage.style.width = _scale + this.scale + "%"
				_showimage.style.height = "auto"
			}else {
				_showimage.style.height = _scale + this.scale + "%"
				_showimage.style.width = "auto"
			}
			this.currentScale = _scale + this.scale
		}
		let _marginTop = (_showimageview.offsetHeight - _showimage.offsetHeight) / 2
		_showimage.style.marginTop = `${_marginTop < 0 ? 0 : _marginTop}px`
		this.isInitial(false)
		
		this.siv.resetCoords(this.relativeScale * this.currentScale / 100.0)
	}
	
	drawdown() {
		if (this.isInitialState) return //初始
		
		let _showimage = this.siv.refs.showimage
		let _showimageview = this.siv.refs.showimageview
		let _scale = _showimage.style.width != "auto" ? _showimage.style.width || _showimage.style.height : _showimage.style.height
		_scale = parseInt(_scale)
		if(_scale > 100) {
			if (this.widthOverHeight) _showimage.style.width = _scale - this.scale + "%"
			else _showimage.style.height = _scale - this.scale + "%"
			this.currentScale = _scale - this.scale
			if(this.currentScale <= 100) {this.reset(); return}
			
			let _marginTop = (_showimageview.offsetHeight - _showimage.offsetHeight) / 2
			_showimage.style.marginTop = `${_marginTop < 0 ? 0 : _marginTop}px`
			this.siv.resetCoords(this.relativeScale * this.currentScale / 100.0)
		}else {
			this.reset()
			return
		}
		
		//防止缩小时候图片飞出去
		if (_showimage.offsetLeft < 0 || _showimage.offsetTop < 0) {//如果图片锚点不在容器内
			let _changeWidth = 0.25 * this.initialImageWidth
			let _changeHeight = 0.25 * this.initialImageHeight
			
			let _leftLastLocal = _showimage.offsetLeft + _changeWidth
			let _topLastLocal = _showimage.offsetTop + _changeHeight
			
			let _showimagewidth = _showimage.offsetWidth
			let _showimageheight = _showimage.offsetHeight
			let _showimageviewwidth = _showimageview.offsetWidth
			let _showimageviewheight = _showimageview.offsetHeight
			if (_showimage.offsetLeft + _showimagewidth < _showimageviewwidth) {
				if (_showimagewidth < _showimageviewwidth) _leftLastLocal = 0
				else _leftLastLocal = _showimageviewwidth - _showimagewidth
			}
			if (_showimage.offsetTop + _showimageheight < _showimageviewheight) {
				if (_showimageheight < _showimageviewheight) _topLastLocal = 0
				else _topLastLocal = _showimageviewheight - _showimageheight
			}
			
			if (_topLastLocal > 0) _topLastLocal = 0
			if (_leftLastLocal > 0) _leftLastLocal = 0
			
			//更改位置
			_showimage.style.top = _topLastLocal + "px"
			_showimage.style.left = _leftLastLocal + "px"
		}
	}
	
	reset() {
		let _showimage = this.siv.refs.showimage
//		if (this.widthOverHeight) _showimage.style.width = "100%"
//		else _showimage.style.height = "100%"
			_showimage.style.top = 0
			_showimage.style.left = 0
//		_showimage.style.marginTop = `calc(50% - ${_showimage.offsetHeight / 2 + 37}px)`
		this.isInitial(true)
		this.currentScale = 100
		
		this.reloadImage()
	}
	
	moveevent(e) {

		if (this.isInitialState) return
		let _type = e.type
		let _showimage = this.siv.refs.showimage
		if(_type == "mousedown" || _type == "touchstart"){//点击处理
			_showimage.style.cursor = "url('/img/icon_shook.png'),auto"
			this.siv.isFromList = false
			this.hasMouseDown = true
			this.startX = e.hasOwnProperty('touches') ? e.touches[0].clientX : e.clientX //判断是手指还是鼠标
			this.startY = e.hasOwnProperty('touches') ? e.touches[0].clientY : e.clientY
			this.originX = _showimage.offsetLeft
			this.originY = _showimage.offsetTop
			
			let _mapmarks = document.getElementsByClassName("MapMark")
			this.anchorsOffsets = []
			for (var i = 0; i < _mapmarks.length; i++) {
				let _mapmark = _mapmarks[i]
				let _offset = {
					left: _mapmark.offsetLeft,
					top: _mapmark.offsetTop
				}
				this.anchorsOffsets.push(_offset)
			}
		} else if(_type == "mouseup" || _type == "touchend"){//鼠标移开处理
			this.hasMouseDown = false
			_showimage.style.cursor = "url('/img/icon_tongs.png'),auto"
		} else if (this.hasMouseDown && (_type == "mousemove" || _type == "touchmove")) {//移动处理
			if(e.hasOwnProperty('touches')) e.preventDefault() //如果是手指,移除默认事件
			//当前鼠标或手指位置
			let _currentX = e.hasOwnProperty('touches') ? e.touches[0].clientX : e.clientX
			let _currentY = e.hasOwnProperty('touches') ? e.touches[0].clientY : e.clientY
			//动作实际偏移量
			let _moveX = _currentX - this.startX
			let _moveY = _currentY - this.startY
			//图片最终坐标位置
			let _topLastLocal = this.originY + _moveY
			let _leftLastLocal = this.originX + _moveX
			//边界处理
			let _showimageview = this.siv.refs.showimageview
			let _showimagewidth = _showimage.offsetWidth
			let _showimageheight = _showimage.offsetHeight
			let _showimageviewwidth = _showimageview.offsetWidth
			let _showimageviewheight = _showimageview.offsetHeight
			
			let _stopX = false//锚点边界伴随处理
			let _stopY = false
			if (_showimagewidth < _showimageviewwidth) {//图片宽比容器小	
				_leftLastLocal = 0
				_stopX = true
				if (_showimageheight < _showimageviewheight) {//图片高比容器小
					if (_topLastLocal <= 0) {//顶部企图出去
						_topLastLocal = 0
						_stopY = true
					} else if(_topLastLocal + _showimageheight >= _showimageviewheight) {//底部企图出去
						_topLastLocal = _showimageviewheight - _showimageheight
						_stopY = true
					}
				} else{//图片高比容器大
					if (_topLastLocal >= 0) {//左侧企图进入
						_topLastLocal = 0	
						_stopY = true
					} else if(_topLastLocal + _showimageheight <= _showimageviewheight) {//右侧企图进入
						_topLastLocal = _showimageviewheight - _showimageheight
						_stopY = true
					}
				}
			}else {//图片宽比容器大
				if (_leftLastLocal >= 0) {//左侧企图进入
					_leftLastLocal = 0
					_stopX = true
				} else if(_leftLastLocal + _showimagewidth <= _showimageviewwidth) {//右侧企图进入
					_leftLastLocal = _showimageviewwidth - _showimagewidth
					_stopX = true
				}
				
				if (_showimage.offsetHeight < _showimageviewheight) {//图片高比容器小
					_topLastLocal = 0
					_stopY = true
				}else {//图片高比容器大
					if (_topLastLocal >= 0) {//顶部企图进入
						_topLastLocal = 0	
						_stopY = true
					} else if(_topLastLocal + _showimageheight <= _showimageviewheight) {//底部企图进入
						_topLastLocal = _showimageviewheight - _showimageheight
						_stopY = true
					}
				}
			}
			
			//更改位置
			_showimage.style.top = _topLastLocal + "px"
			_showimage.style.left = _leftLastLocal + "px"
			
			//更改锚点位置
			let _mapmarks = document.getElementsByClassName("MapMark")
			for (var i = 0; i < _mapmarks.length; i++) {
				let _mapmark = _mapmarks[i]
				let _anchorsOffset = this.anchorsOffsets[i]
				if(!_stopX) _mapmark.style.left = _anchorsOffset.left + _moveX + "px"
				else this.siv.resetMapMark()
				if(!_stopY) _mapmark.style.top = _anchorsOffset.top + _moveY + "px"
				else this.siv.resetMapMark()
			}
		}
	}
}