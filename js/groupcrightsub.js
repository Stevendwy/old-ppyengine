/*
* @Author: steven
* @Date:   2017-05-03 10:25:51
* @Last Modified by:   steven
* @Last Modified time: 2017-05-04 19:27:30
*/

'use strict';
import React ,{Component} from 'react'

export default class DgroupRightListSub extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
			whethershow:"none",
			packups:true
	  };
	}
	packUp(){
		let _change = this.state.packups?false:true
		this.setState({
			packups:_change
		})
	}
	render(){
		let _getmaindata = this.props.subdata
		let _rightlist=<div></div>
		let _display = _getmaindata.length>0?"block":"none"
		if (_getmaindata.length>0) {
			_rightlist=_getmaindata.map((item,i)=>{
				return(
					<li key={i}><div>{item.key}</div><div>{item.value}</div></li>
				)
			})
		}
		let _packup = this.state.packups?"更多":"收起"
		let _height = this.state.packups?"148px":"auto"
		// let _bgposition=this.state.packup?"-410px":"-970px"
		let _bgclass = this.state.packups?"dGroupRightListImg opening":"dGroupRightListImg closeing"
		return (
			<div className="dGroupRightList" style={{display:_display,height:_height}}>
					<div className="dGroupRightListTitle">
						<span>关键数据</span>
						<div className="dGroupRightListTitleClick"
							onClick={this.packUp.bind(this)}>
							<span>{_packup}</span>
							<div className={_bgclass}></div>
						</div>
					</div>
					<ul>
						{_rightlist}
					</ul>
				</div>
		)
	}
}