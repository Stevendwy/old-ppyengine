import React, {Component} from 'react'
import {sendEvent, catchEvent, middleEvents} from './eventmodel'

export default class DGroupRight extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	
	componentDidMount() {
		
	}
	sendlist(page){
		sendEvent(middleEvents.dgrouprightlist,{"page":page})
	}
	//发送给index 重新搜索结果
	//<div className="dgrightheadreload" onClick={this.sendlist.bind(this,_page)}>换一组<div className="dgrightheadimg"></div></div>
	render() {
		let _proplist =this.props.list
		let _show = this.props.show
		let _page = this.props.page
		let _list=<div></div>
		if (_proplist.length>0) {
			_list = _proplist.map((item,i)=>{
				return (
					<div key={i} className="dgrightlist" onClick={()=>{ sendEvent(middleEvents.dgroupright,item)}}>{item}</div>
				)
			})
		}
		return (
			<div className="dgright" style={{display:_show}}>				
				<div className="dgrighthead">
				相关搜索
				
				</div>
				{_list}
			</div>
		)
	}
}
