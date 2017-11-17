import React, {
	Component
} from 'react'
import DGroupHaveListPage from './dgrouphavelistpage'

import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class DGroupLeftHaveList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ajaxok:false,
			current: 1, //当前页码
			totalPage: '', //总页数
		}
		this.headlist = ["编号", "名称", "零件号", "型号", "参考价格"]
		this.sendmes = {}
	}
	componentWillMount() {
			var _this = this;
			let _totalpage = Math.ceil(_this.props.amountpage.length / 10);
			let _current = _this.props.amountpage.page
			let _ajaxok = _this.props.amountpage.ajaxok
			this.setState({
				current: _current,
				totalPage: _totalpage,
				ajaxok:_ajaxok
			})
			_this.pageClick(1);
		}
		//点击翻页
	pageClick(pageNum) {
		let _this = this;
		if (pageNum != _this.state.current) {
			this.setState({
				current: pageNum
			})
			sendEvent(middleEvents.dgrouphavelist, pageNum) //发送给index 重新搜索结果
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
		if(_this.props.amountpage.ajaxok==false){
			_this.pageClick(cur + 1);
		}else{
			if (cur < _this.state.totalPage) {
				_this.pageClick(cur + 1);
			}
		}
	}
	goNextmes(auth, pid) {
		let _mes = this.sendmes
		let _mescid = _mes.ajaxuses.cid
		let _mesbrd = _mes.ajaxuses.brandCode
		let _obj = {
			auth: auth,
			p: _mescid,
			brandCode: _mesbrd,
			pid: pid
		}
		let _urls ="/ppy?type=part&binds=group&part="+pid+"&brand="+_mesbrd
			window.open(_urls)
			return
		sendEvent(middleEvents.subGroupClick, _obj)
	}
	componentDidMount() {
		this.sendmes = this.props.data
		this.headlist = this.props.data.label_list //后期用于列表格式更迭
	}
	render() {
		let _headlist = this.headlist.map((item, index) => {
			return (
				<div key={index} className="dghavelisttd">
					{item}
				</div>
			)
		})
		let _proplist = this.props.data
//		console.log(_proplist)
		let _list = _proplist.data.map((item, i) => {
			return (
				<div key={i} className="dghavelisttr" onClick={this.goNextmes.bind(this,item.auth,item.pid)}>
					<div className="dghavelisttd">{item.index}</div>
					<div className="dghavelisttd">{item.label}</div>
					<div className="dghavelisttd">{item.pid}</div>
					<div className="dghavelisttd">{item.model}</div>
					<div className="dghavelisttd">{item.price}</div>
				</div>
			)
		})
		return (
			<div className="dghavelist">
				<div className="dghavelisthead">{_headlist}</div>
				<div className="dghavelistcontent">{_list}</div>
				<DGroupHaveListPage
                          current={this.state.current}
                          ajaxok={this.state.ajaxok}
                          totalPage={this.state.totalPage}
                          pageClick={this.pageClick.bind(this)}
                          goPrev={this.goPrevClick.bind(this)}
                          goNext={this.goNext.bind(this)}/>
			</div>
		)
	}
}