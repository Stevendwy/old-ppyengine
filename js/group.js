/*
* @Author: steven
* @Date:   2017-05-02 13:37:18
* @Last Modified by:   steven
* @Last Modified time: 2017-05-23 16:47:21
*/

'use strict';
import React, {
	Component
} from 'react'
import DgroupImg from './groupcimg';//显示图文
import DgroupBottom from './groupcbottom';//相关搜索
import DgroupRightListMain from './groupcrightmain';//车辆信息
import DgroupRightListSub from './groupcrightsub';//关键数据
import DgroupRightFlow from './groupcrightflow';//右边浮动框
import DgroupPage from './groupcpage';//页码生成

import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class Group extends Component {
	constructor(props) {
		super(props)
		this.state = {
			floatdata:[],//同类车型数据
			rightworld:"",
			rightflow:false,
			rightindex:-1
		}
	}
	//点击翻页
	pageClick(pageNum) {
		let _this = this;
		if (pageNum != _this.state.current) {
			this.setState({
				current: pageNum
			})
			sendEvent(middleEvents.dgrouphavelist, pageNum) //发送给index 重新搜索结果
			$("html,body").animate({scrollTop:0}, 500)//页面回滚到顶部
		}

	}
	goPrevClick() {
		var _this = this;
		let cur = this.state.current;
		if (cur > 1) {
			_this.pageClick(cur - 1);
		}
	}
	goNext() {
		var _this = this;
		let cur = _this.state.current;
		if (cur < _this.state.totalPage) {
			_this.pageClick(cur + 1);
		}
	}
	goShowright(whether,index,piddis,pid){
		let _url = "/engine/adaptive_cars"
		let _obj={
			"pid":pid,
			"brandCode":"bmw"
		}
		if ((piddis==-1)&&(pid=="none")) {
			this.setState({
					rightworld:piddis,
					rightflow:whether,
					rightindex:index,
					floatdata:[]
				})
			let _rightflows =whether==true?"31%":"0"//右边浮动框显示及数据请求
			$(".dGroupRightFlow").animate({width:_rightflows},500)
		}else{
			$(".dGroupRightListLoading").show()
			getAjax(_url, _obj, response => {
				let _data = response["data"]==undefined?[]:response.data
				this.setState({
					rightworld:piddis,
					rightflow:whether,
					rightindex:index,
					floatdata:_data
				},()=>{
					$(".dGroupRightListLoading").hide()
					let _rightflow =whether==true?"31%":"0"//右边浮动框显示及数据请求
					$(".dGroupRightFlow").animate({width:_rightflow},500)
				})
			})
		}
		
		
	}
	//type 类型添加
	typeClick(num){
		this.props.Clicktype(num)
	}
	componentWillMount() {
		this.pageClick(1);
	}
	componentWillReceiveProps(props){
		let _pid = props.showgroup.query
		if (props.showgroup.mode=="pid") {
			this.goShowright(true,0,_pid,_pid)
		}else{
			this.goShowright(false,-1,-1,"none")
		}
	}
	render() {
		let _rightworld = this.state.rightworld//右边显示文字
		let _rightindex= this.state.rightindex//对应哪个显示
		let _imgdata=this.props.data
		let _totalpage= _imgdata.amount_page
		let _shownum=_imgdata.length//总条数
		let _num=_shownum>0?"block":"none"
		let _world=_num=="block"?"none":"block"//结果显示
		
		let _bottomdata=this.props.showgroup
		let _showworld=_bottomdata.query//搜索找不到内容
		
		let _maindata=this.props.maindata
		let _subdata=this.props.subdata
		let _page=this.props.data.page
		let _floatdata = this.state.floatdata
		let _display=this.props.nextshow//父级改变才显示
		let _matchtype=this.props.matchtype//type 类型
		let _matchtypeone=_matchtype==1?"-1050px":"-1090px"
		let _matchtypetwo=_matchtype==0?"-1050px":"-1090px"
		let _matchtypethree=_matchtype==2?"-1050px":"-1090px"
		let _matchshow = _matchtype==1?"none":"block"
			if (_num=="none") {
				_matchshow="none"
			}
		let _matchtypeworld = _matchtype==0?"同类车型匹配":"全品牌匹配"
		
		let _typechangeno = <div></div>
		let _typechangehave=(
						<div className="dGroupSearchPart">
							<div className="dGroupSearchPartList" onClick={this.typeClick.bind(this,1)}>
								<div className="dGroupSearchPartListImg" style={{backgroundPositionY:_matchtypeone}}></div>
								车架号匹配
							</div>
							<div className="dGroupSearchPartList" onClick={this.typeClick.bind(this,0)}>
								<div className="dGroupSearchPartListImg" style={{backgroundPositionY:_matchtypetwo}}></div>
								同类车型匹配
							</div>
							<div className="dGroupSearchPartList" onClick={this.typeClick.bind(this,2)}>
								<div className="dGroupSearchPartListImg" style={{backgroundPositionY:_matchtypethree}}></div>
								全品牌匹配
							</div>
						</div>
						)
		let _typechange=(this.props.headtype==1)||(this.props.headtype==undefined)?_typechangehave:_typechangeno
		let _rightshow = (this.props.headtype==1)||(this.props.headtype==undefined)?"block":"none"
		let _ajaxshow = this.props.ajaxmes == "获取数据成功"?"none":"block" //数据请求后处理样式
		let _showbackmessage = this.props.ajaxmes
		return(
			<div className="container_group" ref="toTop" style={{display:_display}}>
				<div className="dGroupL">
					<div className="dGroupLwithOutmes" style={{display:_ajaxshow}}>
						<span>{_showbackmessage}</span>
					</div>
					<div className="dGroupSearch" style={{display:_num}}>
						为您找到相关结果约
						<span>{_shownum}</span>
						个
						{_typechange}
					</div>
					<div className="dGroupSearch" style={{display:_world}}>
						很抱歉，没有找到与"
						<span>{_showworld}</span>
						"相关的信息。
						{_typechange}
					</div>
					<div className="dGroupSearchType" style={{display:_matchshow}}>以下为{_matchtypeworld}数据，仅供参考</div>
					<DgroupImg imgdata={_imgdata} ajaxuse={_bottomdata} clickindex={_rightindex} goShowright={this.goShowright.bind(this)}/>
					<DgroupBottom bottomdata={this.props.bottomdata}/>
					<DgroupPage
                          current={_page}
                          totalPage={_totalpage}
                          pageClick={this.pageClick.bind(this)}
                          goPrev={this.goPrevClick.bind(this)}
                          goNext={this.goNext.bind(this)}/>
				</div>
				<div className="dGroupR" style={{display:_rightshow}}>
					<DgroupRightListMain maindata={_maindata}/>
					<DgroupRightListSub subdata={_subdata}/>
				</div>
				<div className="dGroupRightFlow" ref="dGroupRightFlow">
					<DgroupRightFlow floatdata={_floatdata} world={_rightworld}/>
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