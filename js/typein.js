/*
* @Author: steven
* @Date:   2017-06-05 17:01:02
* @Last Modified by:   steven
* @Last Modified time: 2017-06-07 19:02:52
*/

'use strict';
import React, {
	Component
} from 'react'

import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
import {typeindata} from './datatest'
export default class Typein extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ajaxdata:{data:[]}
		}
	}
	componentWillMount(){
		this.getData()
	}
	
	getData(){
		let _urlbottom = "/engine/informal_parts_history"
		let _obj = {}
		getAjax(_urlbottom, _obj, response => {
			this.setState({
				ajaxdata:response
			})
		})
	}
	render() {
		let _display = this.props.show
		let _data = this.state.ajaxdata
		return(
			<div className="container_typein" ref="toTop" style={{display:_display}}>
				<div className="dTypeinL">
					<Typeinput getData={this.getData.bind(this)} />
					<Typelist data={_data}/>
				</div>
				<div className="dTypeinR">
					
				</div>
				<div className="dgrouptotop"
					onClick={()=>{$("html,body").animate({scrollTop:0}, 500)}}>
					<div className="dgrouptotopimg"></div>
					置顶
				</div>
			</div>
		)
	}
}


class Typeinput extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	inputname:"",
		inputnum:"",
		msgShow:"none",
		msg:"",
		timeCount:3
	  };
	}
	
	change(){
		let _typeInputNameref=this.refs.typeInputNameref.value
		let _typeInputNumref=this.refs.typeInputNumref.value
		let _value = _typeInputNumref.replace(/\W/g, "").toUpperCase()
		this.setState({
			inputname:_typeInputNameref,
			inputnum:_value
		})		
	}
	
	onBtnClick(name,num){
		let _name = name.replace(/\s+/g,"")
		let _num = num.replace(/\s+/g,"")
		if (_name.length < 1 || _num.length < 1) {
			this.msgShowToHide("别称、零件号不能为空")
		}else{
			let _url = "/engine/informal_parts_add"
			let _obj = {
				"new_informal_name":name,
				"pid":num,
				"brandCode":"bmw"

			}
			postAjax(_url, _obj, response => {
				if (response.code==0) {
					this.msgShowToHide(response.msg)
				}else{
					this.msgShowToHide("添加成功!")
					this.props.getData()  			//条件允许就刷新下面
				}
				this.setState({
					inputname:"",
					inputnum:""
				})
			},true)			
		} 
	}
	
	msgShowToHide(msg){
		let timers;
		clearInterval(timers)
		this.setState({
			msg:msg,
			msgShow:"flex",
			timeCount:3
		},()=>{
			 timers = setInterval(()=>{
			    if(this.state.timeCount==0){
						clearInterval(timers)
						this.setState({
							msgShow:"none",
							timeCount:3
						})
			    }else{
			    		this.setState({
						timeCount:--this.state.timeCount
					})
			    }
			},1000)
		})
	}
	render(){
		let _inputname = this.state.inputname
		let _inputnum = this.state.inputnum

		let _msgShow = this.state.msgShow
		let _timeCount = this.state.timeCount
		let _msg = this.state.msg
		return (
			<div className="typeInput">
				<div className="typeInputFitst">
					<span>添加别称</span>
					<span></span>
					<span>零件号</span>
				</div>
				<div className="typeInputSecond">
					<input type="text" name="typeInputName"  style={{display:"none"}}/>
					<input type="text" 
						className="typeInputName"
						autoComplete="off" 
						placeholder="添加别称"
						value={_inputname}
						maxLength="30"
						ref="typeInputNameref" 
						onChange={this.change.bind(this)}/>
					<span></span>
					<input type="password" name="typeInputNum"  style={{display:"none"}}/>
					<input type="text" 
						className="typeInputNum" 
						placeholder="零件号" 
						autoComplete="off"
						value={_inputnum}
						ref="typeInputNumref"
						onChange={this.change.bind(this)}/>
					<div className="typeInputsaveInput"
						onClick={this.onBtnClick.bind(this,_inputname,_inputnum)}
						>保存</div>
				</div>
				<div className="msgModal" style={{display:_msgShow}}>
					<p>{_msg}</p>
					<span>{_timeCount}</span>
				</div>
			</div>
		)
	}
}
class Typelist extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {};
	  this.titlelist = ["","别称","零件号","零件名称","积分"]
	}
	render (){
		let _titlelist = this.titlelist.map((elem,index)=> {
			return (
				<div key={index}>{elem}</div>
			);
		})
		let _data = this.props.data["data"]==undefined ? []:this.props.data.data 							//上层转入数据
		let _point = this.props.data["sum_expert_point"]==undefined ?0:this.props.data.sum_expert_point  	//积分
		let _list = <div></div>
		if (_data.length>=1) {
			_list = _data.map((el,i)=> {
				return (
					<div key={i} className="typeBodyConentList">
						<div>{el.index}</div>
						<div>{el.informal_name}</div>
						<div>{el.pid}</div>
						<div>{el.formal_name}</div>
						<div>{el.expert_point}</div>
					</div>
				)
			})
		}
		let _showdiv = _data.length < 1 ? "none" : "block"
		return (
			<div className="typeBodyList" style={{display:_showdiv}}>
				<div className="typeBodyListLeft">
					<span>录入历史</span>
					<div className="typeBodyListRight">
						<span>专家积分：</span>
						<span>{_point}</span>
					</div>
				</div>
				<div className="typeBodyConent">
					<div className="typeBodyConentHead typeBodyConentList">
						{_titlelist}	
					</div>
					{_list}
				</div>
			</div>
		)
	}
}









// 