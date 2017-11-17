import React, { Component } from 'react'
import { sendEvent, catchEvent, removeEvent, middleEvents } from './eventmodel'

export default class MiddleRightContentListFooterItem extends Component {
	constructor(props) {
		super(props)
		this.model = 5
		this.replace = 7
		this.detail = 8
	}
	
	componentDidMount() {
//		$(".MiddleRightContentListFooterItemContent").unbind('click').on("click",function(){
//			if($(this).html()=="+"){
//				$(this).parents(".listGroupToFloat").find(".MiddleRightContentListItemContainer").show();
//				$(this).html("-")
//			}else if($(this).html()=="-"){
//				$(this).parents(".listGroupToFloat").find(".MiddleRightContentListItemContainer").hide();
//				$(this).parents(".MiddleRightContentListItemContainer").show();
//				$(this).html("+")
//			}
//		})
//		$(".MiddleRightContentListItemContainer").unbind('click').on('click',function(){
//			$(".MiddleRightContentListItemContainer").css("color","#333333");
//			$(this).css("color","#1AA0F3");
//		})
//		$("area").unbind('click').on("click",function(){
//			console.log("fjaiosjdfoiasjgoejs");
//			if(this.hasBlue){
//				$(".MiddleRightContentListItemContainer").css('color',"#333");
//				$('.chooseAndFloatItem>div').css("color","#1AA0F3");
//			}
//		})

	}
	
	
	mouseEvent(index, e) {
		if(index == this.model && this.refs.middlerightcontentlistfooteritemcontentbubble) {
			if(e.type == "mouseover") this.refs.middlerightcontentlistfooteritemcontentbubble.style.display = "block"
			else this.refs.middlerightcontentlistfooteritemcontentbubble.style.display = "none"
		}else if(index == this.replace && this.refs.middlerightcontentlistfooteritemcontentbubble) {
			if(e.type == "mouseover") this.refs.middlerightcontentlistfooteritemcontentbubble.style.display = "block"
			else this.refs.middlerightcontentlistfooteritemcontentbubble.style.display = "none"
		}
	}

	click(index, pid) {
		if(index == this.detail) sendEvent(middleEvents.detailClick, { pid: pid })
//		if(index==0){
////			console.log("running");
////			console.log(this.props.itid);
//			sendEvent(middleEvents.isSubIndex,{itid : this.props.itid})
//		}
	}
	
	render() {
		let _props = this.props
		let _showClassName = _props.showClassName
		let _showStyle = _props.showStyle
		let _mouseEvent = this.mouseEvent
		let _content = _props.content
		let _index = _props.index
		let _modelname = _props.modelname
		let _click = this.click
		let _pid = _props.pid
		let _isReplace = _props.isReplace
//		let _isAddFlod = props._isAddFlod
		let _bubble = <div></div>
		let _triangle = <div></div>
		if(_index == this.model && _modelname.length > 0) {
			_bubble = <div ref="middlerightcontentlistfooteritemcontentbubble" className="ControlBubble"><p>{_modelname}</p></div>
			_triangle = <div className="hasMore"><img src="/img/icon_more.png" alt="详情"/></div>
		} else if(_index == this.replace && _isReplace != 0) {
			
			let _replaceTitle
			switch(_isReplace) {
				case 1:
					_replaceTitle = '含替换件'
					break
				case 2:
					_replaceTitle = '含组件'
					break
				case 4:
					_replaceTitle = '含替换件与组件'
					break
			}
			_bubble = <div ref="middlerightcontentlistfooteritemcontentbubble" className="ControlBubble" style={{width: '106px', right: '60px'}}><p>{_replaceTitle}</p></div>
			_triangle = <div className="hasMore"><img src="/img/icon_more.png" alt="详情"/></div>
		}

		return(
			<div
				className={_showClassName}
				style={_showStyle}
				onMouseOver={_mouseEvent.bind(this, _index)}
				onMouseLeave={_mouseEvent.bind(this, _index)}
			>
				{/*<div className="MiddleRightContentListFooterItemContent"
					onClick={_click.bind(this, _index, _pid)}>
					{_content}
				</div>*/}
				<div className="MiddleRightContentListFooterItemContent"
					onClick={_click.bind(this, _index, _pid)}  
					dangerouslySetInnerHTML={{__html: _content}}/>
				{_triangle}
				{_bubble}
			</div>
		)
	}
}