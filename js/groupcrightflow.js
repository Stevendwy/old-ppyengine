/*
* @Author: steven
* @Date:   2017-05-09 11:23:55
* @Last Modified by:   steven
* @Last Modified time: 2017-05-11 21:56:33
*/

'use strict';
import React ,{Component} from 'react'

export default class DgroupRightFlow extends Component {
	constructor(props) {
	  super(props);
	  this.state = {

	  };
	}
	render(){
		let _getmaindata = this.props.floatdata
		let _world = this.props.world
		let _rightlist=<div></div>

		if (_getmaindata.length>0) {
			_rightlist=_getmaindata.map((item,i)=>{
				return(
					<li key={i}><div>{item}</div></li>
				)
			})
		}
		let _bgclass ="dGroupRightFloatImg"
		let _worlds = "零件  " +_world+ "  适用车型"
		return (
			<div className="dGroupRightList" style={{height:"auto"}}>
					<div className="dGroupRightListLoading"></div>
					<div className={_bgclass}></div>
					<div className="dGroupRightListTitle">
						<span dangerouslySetInnerHTML={{__html:_worlds}}></span>
					</div>
					<ul style={{width:"100%",height:"auto"}}>
						{_rightlist}
					</ul>
				</div>
		)
	}
}