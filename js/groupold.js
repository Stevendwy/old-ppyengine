import React, {
	Component
} from 'react'
import DGroupTitle from './dgrouptitle' //列表或图标,后期加
import DGroupRight from './dgroupright' //右侧相关搜索

import DGroupLeftHave from './dgrouplefthave'
import DGroupLeftNo from './dgroupleftno'

import {
	datatest,
	datatestnew,
	datatestnewchange
} from './datatest' //测试数据
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class Group extends Component {
	constructor(props) {
		super(props)
		this.state = {
			ajaxok: false, //加载是否完成
			length: 80, //总条数
			rightlist: [], //右边列表
			showwhitch: < div > < /div>,
			page: 1, //请求用page
			getlength : 0,
			getajaxok : false
		}
		this.getdata = {}
		this.getpage = 1
	}
	domessage(type, content) {
		this.setState({
			showwhitch: < div > < /div>
		}, () => {
			//相关搜索列表
			let _url = "/engine/relevant_info"
			let _obj = this.props.showgroup
			_obj.query = content
			this.getpage=_obj.page
			if(content == "keyWord") {
				return
			}
			getAjax(_url, _obj, response => {
				if(!params.vin){
					this.setState({
						getajaxok : true,
						rightlist: response.data,
						page: response.page
					})
				}else{
					this.setState({
						getajaxok : true,
						rightlist: response.data,
						page: response.page
					})
				}
			})
			let _datas = this.getdata //数据整体下发
				_datas.ajaxuses = _obj //添加参数用于后面请求
			let _lg = this.props.lengths
			if(_datas.data == undefined) {
				return
			}
			let _showtype = _datas.data.length //double true false 空 有 无			
			let _shoewhitch = <div></div>
			let _amountpage = {
				page: this.getpage,
				ajaxok: this.state.getajaxok,
				length:this.props.lengths
			}
			if(_showtype >= 1) {
				_shoewhitch = <DGroupLeftHave datas = {_datas} amountpage={_amountpage} length={_lg}/>
			} else if(_showtype == 0) {

				_shoewhitch = <DGroupLeftNo keys={_obj}/>
			} else {
				_shoewhitch = <div></div>
			}
			this.setState({
				showwhitch: _shoewhitch
			})
		})
	}
	componentDidMount() {
		catchEvent(middleEvents.dgrouprightlist, e => {
			let _url = "/engine/relevant_info"
			let _page = e.info.page + 1
			let _obj = this.props.showgroup
				_obj.page = _page
			getAjax(_url, _obj, response => {
				this.setState({
					rightlist: response.data,
					page: response.page
				})
			})
		})
	}

	componentWillReceiveProps(props) {
		this.getdata = props.data
		this.domessage("all", props.showgroup.keyWord)
		this.setState({
			length:this.props.lengths
		})
	}
	render() {
		let _list = this.state.rightlist
		let _show = this.state.showwhitch
		let _page = this.state.page

		let _hasChange = this.props.hasChange
		let _fromfather = this.props.nextshow
		let _fromfatherword = this.props.carVin
		return(
			<div className="container_group" ref="toTop">
				<div style={{display:_hasChange}} className="container_group_nav">
					在&nbsp;
					<span>{_fromfatherword}</span>
					&nbsp;中搜索
				</div>
				{_show}
				<DGroupRight show={_fromfather} list={_list} page={_page}/>
				<div className="dgrouptotop" style={{display:_fromfather}}
				onClick={()=>{this.refs.toTop.scrollIntoView()}}>
					<div className="dgrouptotopimg"></div>
					置顶
				</div>
			</div>
		)
	}
}