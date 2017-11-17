/*
* @Author: steven
* @Date:   2017-05-02 14:42:40
* @Last Modified by:   steven
* @Last Modified time: 2017-05-04 19:48:07
*/

'use strict';
import React, {Component} from 'react'
import {sendEvent, catchEvent, middleEvents} from './eventmodel'
import {groupbottomdata} from './datatest' //测试数据

export default class groupcbottom extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	sendlist(page){
		sendEvent(middleEvents.dgrouprightlist,{"page":page})//发送给index 重新搜索结果
	}
	render() {
		let _proplist =this.props.bottomdata
		let _list=<div></div>
		let _bottomshow=_proplist.data.length<=0?"none":"block"
		if (_proplist.data.length>0) {
			_list = _proplist.data.map((item,i)=>{
				let _item=item.length>14?item.slice(0,14)+"...":item
				let _class= item.length>14?"toshow":"tohide"
				return (
					<div key={i} className="dGroupBottomList" 
					onClick={()=>{ sendEvent(middleEvents.dgroupright,item);
									$("html,body").animate({scrollTop:0}, 500)}}>
						<div className={_class}>{item}</div>
					{_item}
					</div>
				)
			})
		}
		return (
			<div className="dGroupBottom" style={{display:_bottomshow}}>
				<p>相关搜索</p>
				{_list}
			</div>
		)
	}
}