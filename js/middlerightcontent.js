import React, {Component} from 'react'
import MiddleRightContentList from './middlerightcontentlist'
import {sendEvent, catchEvent, removeEvent, middleEvents} from './eventmodel'

export default class MiddleRightContent extends Component {
	
	componentDidMount() {
		catchEvent(middleEvents.showSubGroupPreview, e => {
			let _changeHeight = e.info.showSubGroupPreview ? 192 : 0//原来192 减去40px
			let _middlerightcontentcontainer = this.refs.middlerightcontentcontainer
//			_middlerightcontentcontainer.style.marginTop = _changeHeight + "px"
			$(_middlerightcontentcontainer).animate({
				marginTop:_changeHeight + "px"
			},"slow")
//			_middlerightcontentcontainer.style.height = _middlerightcontentcontainer.offsetHeight + _changeHeight + "px"
		})
	}
	
	render() {
//		let _listWidth = this.props.listWidth
		return (
			<div ref="middlerightcontentcontainer" className="MiddleRightContentContainer" style={{top: "0"}}>
				<div className="MiddleRightContent">
					<MiddleRightContentList contentList={this.props.contentList} />
				</div>
			</div>
		)
	}
}
