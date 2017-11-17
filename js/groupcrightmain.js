/*
* @Author: steven
* @Date:   2017-05-02 14:42:50
* @Last Modified by:   steven
* @Last Modified time: 2017-05-10 17:58:45
*/

'use strict';
import React ,{Component} from 'react'

export default class DgroupRightListMain extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
			whethershow:"none",
			packup:true
	  };
	}
	packUp(){
		let _change = this.state.packup?false:true
		this.setState({
			packup:_change
		})
	}
	render(){
		let _getmaindata = this.props.maindata
		let _rightlist=<div></div>
		let _display = _getmaindata.length>0?"block":"none"
		if (_getmaindata.length>0) {
			_rightlist=_getmaindata.map((item,i)=>{
				return(
					<li key={i}><div>{item.key}</div><div>{item.value}</div></li>
				)
			})
		}
		let _packup = this.state.packup?"更多":"收起"
		let _height = this.state.packup?"148px":"auto"
		// let _bgposition=this.state.packup?"-410px":"-970px"
		let _bgclass = this.state.packup?"dGroupRightListImg opening":"dGroupRightListImg closeing"
		return (
			<div className="dGroupRightList" style={{display:_display,height:_height}}>
					<div className="dGroupRightListTitle">
						<span>车辆信息</span>
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