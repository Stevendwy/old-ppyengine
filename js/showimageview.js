import React, {Component} from 'react'
import SIVM from './showimageviewmodel'
import {sendEvent, catchEvent, removeEvent, middleEvents} from './eventmodel'

export default class ShowImageView extends Component  {
	
	constructor(props) {
		super(props)
		this.currentCode = ""//当前锁定的code
		this.sivm = new SIVM(this)
		this.state = {
			mapdata: [],
			transformImg: "/img/icon_kuan.png",
			transformTitle: "宽屏",
			clickwidthNew:"",//屏幕宽
			clickheightNew:"",//屏幕高
			whitchTitel:"",
			fenzushow:false
		}
		
		this._fromList = this.fromList.bind(this)
		this.isFromList = false
		this.hasTransform = false
		this.hasItemMark = false //右侧是否有对应零件
		this.isFromSubGroup = false
		this.currentImgUrl = ""
	}
	
	componentDidMount() {
		this.sivm.checkInitialState()
		catchEvent(middleEvents.fromList, this._fromList)
		catchEvent(middleEvents.showSubGroupPreview, () => {
			setTimeout(() => {//打补丁，不破坏之前结构
				this.sivm.reset()
			}, 0)
		})
		//调整title 左边偏移量
		let _new = document.body.clientWidth
		let _newheight = document.body.clientHeight
		this.setState({
			clickwidthNew:_new,
			clickheightNew:_newheight
		})
		$(window).resize(()=>{
			let _new = document.body.clientWidth
			this.setState({
				clickwidthNew:_new
			})
		})
	}
	
	componentWillUnmount() {
		removeEvent(middleEvents.fromList, this._fromList)
	}
	
	componentWillReceiveProps(props) {//console.dir(props)
		if(props.imgsData.data.imgurl != this.currentImgUrl) {
			this.currentImgUrl = props.imgsData.data.imgurl
			this.currentCode = ""
		}else {
//			this.handleImageLoaded()
		}
	}
	
	fromList(e) {
		this.hasItemMark = e.info.hasItemMark
		this.isFromList = true
		let _itid = e.info.itid
		if (_itid.indexOf("(") >= 0) {
			_itid = _itid.replace("(", "")
			_itid = _itid.replace(")", "")
		}
		this.resetMapMark(_itid)
	}
	
	resetCoords(scale = this.sivm.relativeScale) {//重置coords的值用以匹配相关位置
		let _mapdataStart = this.props.imgsData.data.mapdata//数组
		let _mapdataEnd = []
		
		for (var i = 0; i < _mapdataStart.length; i++) {
			let _datas = _mapdataStart[i]//依然是个数组
			let _mapdata = []
			for (var j = 0; j < _datas.length; j++) {
				let _data = _datas[j]
				if (j < _datas.length - 1) _data *= scale
				_mapdata.push(_data)
			}
			_mapdataEnd.push(_mapdata)
		}
		this.setState({
			mapdata: _mapdataEnd
		}, this.resetMapMark)
	}
	
	areaClick(code, e) {
		
//			if(hasBlue){
				setTimeout(()=>{
					$(".MiddleRightContentListItemContainer").css('color',"#333");
					$('.chooseAndFloatItem>div').css("color","#1AA0F3");
				},10)
//			}
		//通知右侧点击了
		sendEvent(middleEvents.fromImg, {
			code: code
		})
		//锚点框移动
//		this.resetMapMark(code)//右侧会有一次模拟点击事件，这里多余
	}
	
	resetMapMark(code = this.currentCode) {
		if(code.length > 0) this.currentCode = code
		let _mapdata = this.state.mapdata.length > 0 ? this.state.mapdata : this.props.imgsData.data.mapdata
		let _mapmark = document.getElementsByClassName("MapMark")
		for (var i = _mapmark.length - 1; i >= 0; i--) {
			let _dom = _mapmark[i]
			this.refs.showimageview.removeChild(_dom)
		}
		
		let _firstMapMark = false
		for (var i = 0; i < _mapdata.length; i++) {
			let _data = _mapdata[i]
//			console.log(_data[_data.length - 1] + "---" + this.currentCode)
			let _showimage = this.refs.showimage
			let _showimageview = this.refs.showimageview
			
			if (_data[_data.length - 1] == this.currentCode) {
//				console.log("mark")
				let _width = _data[2] - _data[0]
				let _height = _data[3] - _data[1]
				let _mapmark = document.createElement("div")
				_mapmark.style.width = `${_width}px`
				_mapmark.style.height = `${_height}px`
				let _localX = _data[0] + _showimage.offsetLeft
				let _localY = _data[1] + _showimage.offsetTop
				
				let _marMapRemind = document.createElement("div")
				_marMapRemind.innerHTML = "无此零件信息"
				_marMapRemind.className = "MapMarkRemind"
				_marMapRemind.style.left = _width / 2 - 58 + "px"
				if (this.hasItemMark) {
					_marMapRemind.style.display = "none"
				}else {
					_marMapRemind.style.display = "block"
				}
				_mapmark.appendChild(_marMapRemind)
				
				_mapmark.className = "MapMark"
				this.refs.showimageview.appendChild(_mapmark)
				
//				_firstMapMark = true
				//处理显示位置
				if (!_firstMapMark) {
					_firstMapMark = true
					if (this.isFromList) {
						if (_localX < 0) {
							_showimage.style.left = _showimage.offsetLeft - _localX + "px"
							_localX = 0
						}
						if (_localY < 0) {
							_showimage.style.top = _showimage.offsetTop - _localY + "px"
							_localY = 0
						}
						if (_localX > _showimageview.offsetWidth) {
							_showimage.style.left = _showimage.offsetLeft - 100 - (_localX -_showimageview.offsetWidth)  + "px"
							_localX = _showimageview.offsetWidth - 100
						}
						if (_localY > _showimageview.offsetHeight) {
							_showimage.style.top = _showimage.offsetTop - 100 - (_localY -_showimageview.offsetHeight) + "px"
							_localY = _showimageview.offsetHeight - 100
						}
					}
				}
				_mapmark.style.left = _localX + "px"
				_mapmark.style.top = _localY + "px"
			}
		}
	}
	
	moveevent(e) {
		this.sivm.moveevent(e)
	}
	
	cancledefault(e) {
		e.preventDefault()
	}
	
	transform() {
		sendEvent(middleEvents.transform, {
			hasTransform: this.hasTransform,
			resetCoords: () => {this.sivm.reloadImage()}
		})
		this.hasTransform = !this.hasTransform
		this.setState({
			transformImg: this.hasTransform ? "/img/icon_zai.png" : "/img/icon_kuan.png",
			transformTitle: this.hasTransform ? "窄屏" : "宽屏"
		})
	}
	
	imgMouseEvent(e) {
		let _type = e.type
		let _img = this.refs.transformimg
		if(_type == "mousedown" || _type == "touchstart"){
			_img.src = this.hasTransform ? cdnHost + "/ppy/img/icon_zaidian.png" :cdnHost + "/ppy/img/icon_kuandian.png"
		}else if(_type == "mouseup" || _type == "touchend") {
			_img.src = this.hasTransform ?cdnHost + "/ppy/img/icon_zai.png" :cdnHost + "/ppy/img/icon_zai.png"
			this.transform()
		}
	}
	
	handleImageLoaded() {
		// console.log("handle")
		this.props.hiddenLoadingImgshow()
		// this.sivm.reset()
	}
	
	loadError(e) {
		if (this.props.imgsData.data.imgurl.length > 0) {
			e.target.src = "/img/p_wutu.png"
			e.target.onError = null
		}
	}
	
	render() {
		let _imgsData = this.props.imgsData
		let _mapdata = this.state.mapdata
		let _areas = _mapdata.map((item, index) => {//item是数组
			let _coords = ""
			for (var i = 0; i < item.length; i++) {
				if (i >= item.length - 1)  break
				if (i < item.length - 2) _coords += item[i] + ", "
				else _coords += item[i]
			}
			let _code = item[item.length - 1]
			return (
				<area key={index} shape="rect" coords={_coords} onClick={this.areaClick.bind(this, _code)} alt="Venus" />
			)
		})
		
		let _imgUrl = this.props.imgsData.data.imgurl
		let _transformImg = this.state.transformImg
		let _transformTitle = this.state.transformTitle
		let _loadingDisplay = this.props.loadingImgshow
//		console.log(_loadingDisplay)
		
		let _detailContainer = <div></div>
		if (isVIN) _detailContainer =(
			<div>
				<div className="DetailContainer"
					onClick={
						() => {this.setState({whitchTitel: "cheliang"},() => sendEvent(middleEvents.detailShow, {type: 0}))}
						}
					onMouseOver={() => this.refs.controlbubbledetailp.style.color = "#45C0FF"}
					onMouseLeave={() => this.refs.controlbubbledetailp.style.color = "#333333"}>
					<div ref="controlbubbledetail" className="ControlBubble"><p ref="controlbubbledetailp"
					>车辆信息</p></div>
				</div>
				<div className="CarMIContainer" 
				onClick={
					() => {this.setState({whitchTitel: "guanjian"},() => {sendEvent(middleEvents.detailShow, {type: 1})})}
					}
					onMouseOver={() => this.refs.controlbubbledetailp1.style.color = "#45C0FF"}
					onMouseLeave={() => this.refs.controlbubbledetailp1.style.color = "#333333"}>
					<div ref="controlbubbledetail1" className="ControlBubble">
						<p ref="controlbubbledetailp1">关键数据</p>
					</div>
				</div>
			</div>
		)
		
		return (
			<div className="ShowImageViewContainer"
				onTouchStart={this.moveevent.bind(this)}
				onMouseUp={this.moveevent.bind(this)}>
				<div ref="showimageview" className="ShowImageView">
					<img ref="showimage" src={_imgUrl} useMap="#planetmap" alt="" onError={this.loadError.bind(this)}
						onDragStart={this.cancledefault.bind(this)}
						onTouchMove={this.moveevent.bind(this)}
						onTouchEnd={this.moveevent.bind(this)}
						onMouseDown={this.moveevent.bind(this)}
						onMouseMove={this.moveevent.bind(this)}
						onLoad={this.handleImageLoaded.bind(this)}/>
					<map name="planetmap" id="planetmap">
						{_areas}
					</map>
					<div className="ShowImageViewloadingImg" style={{display: _loadingDisplay}}></div>
				</div>
				<div className="EnlargeContainer" onClick={() => {this.sivm.enlarge(); this.refs.controlbubbleenlarge.style.display = "none"}}
					onMouseOver={() => this.refs.controlbubbleenlarge.style.display = "block"}
					onMouseLeave={() => this.refs.controlbubbleenlarge.style.display = "none"}>
					<div ref="controlbubbleenlarge" className="ControlBubble"><p>放大</p></div>
				</div>
				<div className="DrawdownContainer" onClick={() => {this.sivm.drawdown(); this.refs.controlbubbledrawdown.style.display = "none"}}
					onMouseOver={() => this.refs.controlbubbledrawdown.style.display = "block"}
					onMouseLeave={() => this.refs.controlbubbledrawdown.style.display = "none"}>
					<div ref="controlbubbledrawdown" className="ControlBubble"><p>缩小</p></div>
				</div>
				<div className="ResetContainer" onClick={() => {this.sivm.reset(); this.refs.controlbubblereset.style.display = "none"}}
					onMouseOver={() => this.refs.controlbubblereset.style.display = "block"}
					onMouseLeave={() => this.refs.controlbubblereset.style.display = "none"}>
					<div ref="controlbubblereset" className="ControlBubble"><p>重置</p></div>
				</div>
				<div className="TransformContainer"
					onTouchStart={this.imgMouseEvent.bind(this)}
					onTouchEnd={this.imgMouseEvent.bind(this)}
					onMouseDown={this.imgMouseEvent.bind(this)}
					onMouseUp={this.imgMouseEvent.bind(this)}
					onMouseOver={() => this.refs.controlbubbletransform.style.display = "block"}
					onClick={() => this.refs.controlbubbletransform.style.display = "none"}
					onMouseLeave={() => this.refs.controlbubbletransform.style.display = "none"}>
					<div ref="controlbubbletransform" className="ControlBubble"><p>{_transformTitle}</p></div>
					<img ref="transformimg" className="ShowImageViewControl" src={cdnHost + _transformImg} />
				</div>
			</div>
		)
	}
}