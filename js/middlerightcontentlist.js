import React, {
	Component
} from 'react'
import MiddleRightContentListHeader from './middlerightcontentlistheader'
import MiddleRightContentListFooter from './middlerightcontentlistfooter'
import {
	sendEvent,
	catchEvent,
	removeEvent,
	middleEvents
} from './eventmodel'

export default class MiddleRightContentList extends Component {

	constructor(props) {
		super(props)
		this.state = {
			datas: [],
			flag: 0, //后台来的是否折叠
			sameItids: [], //点击后，编号相同的行
			selectIndex: -1, //点击的pid
			isAddFlod: false, //标记是要有+号
			isSubFlod: false, //标记是要有-号
			floatItemIndex: -1, //浮起来的item
			specialIndex: -1, //零件号进去要展开的特殊项目
			background: "url('https://cdns.007vin.com/img/veryhuo.com_gif.gif') no-repeat center center",
			choosePid: "",
			displayNone: false//列表为空时候显示的提示
		}
		this._fromImg = this.fromImg.bind(this)
		this._subGroupClick = this.subGroupClick.bind(this)
		this.isFromImg = false //记录点击事件出处，用于控制右侧背景色
		this.uid = "" //用来识别网络请求回来的内容与分组点击所需要内容是否匹配
		this.auth = "" //刷新使用
		this.response = {} //记录原本用不到的网络返回内容，如status等
		this.hash = [] //黑科技保存对应大组
		this.fltResponse = {}
		this.auth = null //防止重复点击相同

		this.response = {
			status: 'runtime'
		}
	}

	fromImg(e) {
		//code就是itid
		this.isFromImg = true
		this.localItem(e.info.code)
	}

	componentDidMount() {
		catchEvent(middleEvents.fromImg, this._fromImg)
		catchEvent(middleEvents.subGroupClick, this._subGroupClick)
		catchEvent(middleEvents.redVinFilter, (e) => {
			let _url = "/ppyvin/parts"
				if (truePart==0) {
					_url = "/ppypart/parts"
				}
			let _obj = {
				divide_pid : 1,
				auth: this.auth,
				code: params.code||"bmw",
				vin: newvin||params.vin
			}
			if (e.info.isFilter) {
				_obj.filter = "0"
			} else {
				_obj.filter = "1"
			}
			getAjax(_url, _obj, response => {

				//				if (response.uid != this.uid) return

				//				console.log($(".chooseAndFloatItem")[0])
				//				$(".chooseAndFloatItem div").hide()

				this.response = response
				this.hash = []
				this.setState({
					datas: response.data,
					flag: response.flage,
					selectIndex: -1,
					floatItemIndex: -1,
					sameItids: []
				}, () => {
					$(".minus").parents(".listGroupToFloat").find(".MiddleRightContentListItemContainer").show();
				})


			})
		})
	}

	componentWillUnmount() {
		removeEvent(middleEvents.fromImg, this._fromImg)
		removeEvent(middleEvents.subGroupClick, this._subGroupClick)
	}

	subGroupClick(e) {
		let _auth = e.info.auth
	//	if (this.auth != _auth) this.auth = _auth
	//	else return
		this.auth = _auth
		this.setState({
			datas: [],
			background: "url('https://cdns.007vin.com/img/veryhuo.com_gif.gif') no-repeat center center",
			displayNone: false
		}, () => {
			//请求数据刷新
			// let _url = "/ppycars/parts"
			let _url = "/ppyvin/parts"
				if (truePart==0) {
					_url = "/ppypart/parts"
				}
			//			if (isParts) _url = "/ppypart/parts"
			//			else if (isVIN) _url = "/ppyvin/parts"
			let _obj = { //车型基本，没有p和vin
				divide_pid : 1,
				auth: this.auth,
				code: params.brandName||"bmw"
			}
			_obj.p = e.info.p
			_obj.vin = newvin||params.vin
			_obj.pid = e.info.pid
			if (isParts) _obj.p = params.p
			else if (isVIN) {
				_url = "/ppyvin/parts"
				_obj.vin = newvin||params.vin;
				_obj.filter = vinChange
				if (truePart==0) {
					_url = "/ppypart/parts"
				}
			}


			getAjax(_url, _obj, response => {
				//				console.log(response.uid);
				//				console.log(this.uid);
				//				if (response.uid != this.uid) return
				//console.log(JSON.stringify(response))
				this.response = response
				this.hash = []
				this.setState({
					datas: response.data,
					displayNone: response.data.length > 0 ? false : true,
					flag: response.flage,
					selectIndex: -1,
					floatItemIndex: -1,
					specialIndex: -1,
					sameItids: [],
					background: "rgb(245, 245, 245)"
				}, () => {
					// if (isParts) {
					//定位
					// console.log("fffffffffffffff")
					// console.log(_obj)

					let _itid = ""
					let _pid = _obj.pid.replace(/\s/g, "")
					// console.log(_pid.replace(/\s/g, ""))
					for (let i = 0; i < response.data.length; i++) {
						let _item = response.data[i]
						for (let j = 0; j < _item.length; j++) {
							if (_item[j].pid == _pid) {
								this.setState({
									floatItemIndex: i,
									specialIndex: i,
									choosePid: _pid
								}, () => {
									this.localItem(_item[j].itid, _pid)
								})
								return
							}
						}

					}

					// }
				})
			})
		})
	}

	localItem(itid, pid) {
		//		let _itid = clearBracket(itid)
		let _itid = itid
		let _index = -1
		for (var i = 0; i < this.state.datas.length; i++) {
			let _data = this.state.datas[i]
			if (pid == _data.pid) {
				_index = i;
				break
			}
		}
		if (this.hash[_itid] == 0 || this.hash[_itid]) {
			hasBlue = true;
		} else {
			hasBlue = false
		}


		this.listClick(_itid, _index, "true")
		let _scrollDom = document.getElementsByClassName("MiddleRightContentListFooterContainer")[0]
		let _chooseDom = document.getElementsByName(_itid)[0]
		if (_chooseDom) $(_scrollDom).scrollTop(_chooseDom.offsetTop)
	}

	listClick(itid, index, mainIndex) {
		let _sameItids = []
			//		let _itid = clearBracket(itid)
		let _itid = itid
		for (var i = 0; i < this.state.datas.length; i++) {
			let _data = this.state.datas[i]
			let _itid = _data.itid
				//			_itid = clearBracket(_itid)
			if (itid == _itid) _sameItids.push(_itid)
		}

		this.setState({
			sameItids: _sameItids,
			selectIndex: index,
			floatItemIndex: this.hash[itid]
		})
		sendEvent(middleEvents.fromList, {
			itid: itid,
			hasItemMark: this.hash[itid] == 0 || this.hash[itid]
		})

	}

	render() {
		let _datas = this.state.datas
		let _sameItids = this.state.sameItids
		let _selectIndex = this.state.selectIndex
		let _background = this.state.background
		let _choosePid = this.state.choosePid;
		let _specialIndex = this.state.specialIndex
			//		var fristOnePart = false
		let _floatItemIndex = this.state.floatItemIndex
		let _notRunTime = this.response.status != "runtime"
		let _foldItemClass = ""
			//		console.log(_datas)
		let _listFooter = _datas.map(
			(datas, indexs) => {
				if (!this.hash[datas[0].itid]) {
					this.hash["" + datas[0].itid + ""] = indexs
				}
				if (indexs == _floatItemIndex) {
					_foldItemClass = "listGroupToFloat chooseAndFloatItem"
				} else {
					_foldItemClass = "listGroupToFloat"
				}
				return (
					<div key={indexs} className={_foldItemClass}>	
						{

						datas.map((data,index)=>{
							if(this.state.flag == 1 && datas.length>1){
										this.state.isAddFlod =  true
							}else{
										this.state.isAddFlod =  false
							}
							
							let _classItem = ""
							let _classContainer = ""

							return(
								<MiddleRightContentListFooter key={index}
									listClick={this.listClick.bind(this)}
									choosePid={_choosePid}
									data={data}
									isAddFlod = {this.state.isAddFlod}
									classItem={_classItem}
									classContainer={_classContainer}
									listIndex={index}
									specialIndex={_specialIndex == indexs ? true :false}
									mainListIndex = {indexs}
									changeBackground={() => {this.setState({background: "white"})}}/>
							)
						})

					}
				</div>
				)
			}
		)

		this.isFromImg = false
		let _subGroupClick = this.subGroupClick.bind(this)
			//		console.log(_listFooter)
		let _displayNone = this.state.displayNone
		let _warning = <div></div>
		if (_notRunTime) _warning = (
			<div className="MiddleRightContentListWarningContainer">
					<div className="MiddleRightContentListWarningRemuse">因网络问题,以下信息未精准匹配</div>
					<div className="MiddleRightContentListWarningRefreshContainer" onClick={_subGroupClick}>
						<img className="MiddleRightContentListWarningImg" src={cdnHost+"/img/icon_shuaxin.png"} alt="warning" />
						<div className="MiddleRightContentListWarningInfo" style={{"fontSize":"14px"}}>刷新</div>
					</div>
				</div>
		)
		return (
			<div className="MiddleRightContentListContainer" style={{background: _background, height: "100%"}}>
				<MiddleRightContentListHeader />
				{_warning}
				<div className="MiddleRightContentListFooterContainer" style={{background:"#f5f5f5"}}>
					{_listFooter}
				</div>
				<div className="MiddleRightContentListNone" style={{display: _displayNone ? "flex" : "none"}}>
					<img src={cdnHost+"/img/p_liebiao.png"} />
					<span>原厂暂未提供此部分数据</span>
				</div>
			</div>
		)
	}
}
