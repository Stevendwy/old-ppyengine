import React, {Component} from 'react'
import GroupPartDetailListNew from './grouppartdetailnew'
import PropTypes from 'prop-types'

export default class FloatWindow extends Component {
	constructor(props) {
		super(props)
		this.startX = 0//鼠标点击后移动的起始X
		this.startY = 0//鼠标点击后移动的起始Y
		this.originX = 0//鼠标点击后控件的起始X
		this.originY = 0//鼠标点击后控件的起始Y
		this.hasMouseDown = false
		this.moving = false
		this.state={
			firstIndex:0,
			clickindex:0
		}
	}
	mouseEvent(name,e) {
		let _floatwindow = this.refs[name]
		let _type = e.type
		if(_type == "mouseleave") this.moving = false
		if(_type == "mousedown" || _type == "touchstart") {
			this.moving = true
			this.startX = e.hasOwnProperty('touches') ? e.touches[0].clientX : e.clientX //判断是手指还是鼠标
			this.startY = e.hasOwnProperty('touches') ? e.touches[0].clientY : e.clientY
			this.originX = _floatwindow.offsetLeft
			this.originY = _floatwindow.offsetTop
			this.hasMouseDown = true
		}else if(_type == "mouseup" || _type == "touchend") {
			this.hasMouseDown = false
		} else if(this.hasMouseDown && (_type == "mousemove" || _type == "touchmove")){
			if(!this.moving) return
			//当前鼠标或手指位置
			let _currentX = e.hasOwnProperty('touches') ? e.touches[0].clientX : e.clientX
			let _currentY = e.hasOwnProperty('touches') ? e.touches[0].clientY : e.clientY
			//动作实际偏移量
			let _moveX = _currentX - this.startX
			let _moveY = _currentY - this.startY
			//控件最终坐标位置
			let _topLastLocal = this.originY + _moveY
			let _leftLastLocal = this.originX + _moveX
			//更改位置
			_floatwindow.style.top = _topLastLocal + "px"
			_floatwindow.style.left = _leftLastLocal + "px"
		}
	}
	//层级处理
	imgClick(index,e){
		this.props.imgclick(index)
		e.stopPropagation()
	}
	floatListClick(index,e){
		this.setState({
			firstIndex:0,
			clickindex:index
		})
		e.stopPropagation()
	}
	componentWillReceiveProps(props){
		this.setState({
			clickindex:props.flowshow
		})
	}
	
	render() {
		
		let _show = this.props.show
		let _content = this.props.content
		
		let _img = this.props.img
		let _hiddenSelf = this.props.hiddenEvent
		let _width = this.props.width
		let _height = this.props.height
		let _left = this.props.left
		let _top = this.props.top
		let _firstindex = this.state.firstIndex
		let _right = this.props.right
		
		let _contentadd= this.props.contentadd
		let _newflow
		if (_contentadd!=undefined) {
			_newflow = _contentadd.map((item,index)=>{
				let _title =index==0? this.props.title:"替换件详情"
				let _index=this.state.clickindex==index?"1102":"1100"
				let _refname="floatwindow"+index
				return (
					<div key={index} ref={_refname} 
					style={{"position":"absolute",zIndex:_index,width:_width,height:_height,top:item.top,right:item.right,left:"auto"}} 
					className="FloatWindow" 
					onClick={this.floatListClick.bind(this,index)}>
						<div className="FloatWindowNavigationBar"
							onMouseDown={this.mouseEvent.bind(this,_refname)}
							onMouseMove={this.mouseEvent.bind(this,_refname)}
							onMouseUp={this.mouseEvent.bind(this,_refname)}
							onMouseLeave={this.mouseEvent.bind(this,_refname)}>
							<span className="FloatWindowNavigationTitle">{_title}</span>
							<img onClick={this.imgClick.bind(this,index)} className="FloatWindowNavigationCancleImg" src={_img} alt="x" />
						</div>
						{item.floatwindowcontent}
					</div>
				)
			})
		}
		return (
			<div className="FLoatWindowContainer"
				ref="floatwindowcontainer"
				style={{display: _show}}>
				{_newflow}
			</div>
		)
	}
}

FloatWindow.propTypes = {
	title: PropTypes.string.isRequired,
	img: PropTypes.string.isRequired,
	show: PropTypes.string.isRequired,
	hiddenEvent: PropTypes.func.isRequired
}
