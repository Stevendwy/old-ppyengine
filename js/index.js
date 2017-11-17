/*
* @Author: steven
* @Date:   2017-05-02 16:31:10
* @Last Modified by:   steven
* @Last Modified time: 2017-06-07 14:01:54
*/

'use strict';
import React, {
	Component
} from "react"
import {
	render
} from "react-dom"
import Search from "./search"
import Group from "./group"
import Tag from "./tag"
import Typein from './typein'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

import {groupimgdata,grouprightdata} from './datatest' //测试数据

class Page extends Component {

	constructor(props) {
		super(props)
		this.state = {
			isGray:false, //添加零件按钮颜色
			ajaxmes:"",   //vin请求后返回的样式
			choosetype:1, //筛选选项是否出现
			matchtype:1,  //车架号匹配 同类车型匹配1/0
			maindata:[],  //车辆信息
			subdata:[],   //关键数据
			floatdata:[], //同类车型数据
			ajaxdata:{data:[]},//相关搜索数据
			imgdata:{},
			rightdata:{},
			nextshow: "none",
			nextshowtypein:"none",
			grouplistdata: {data:[]}, //生成列表内容
			carVin: "",
			showgroup: {
				"mode":"vin",
				"query": "",
				"brandCode": "",
				"cid": "",
				"vin": ""
			},
			hasChange: "none",
			showTag: false,
			lengths: 0
		}
		this.storecid=""//存储cid
		this.start_index = 0 //用于请求起始点
		this.storemes = "" //储存参数，用于翻页点击用
		this.storetype=1
		this.storevin = ""
		this.storemode = "vin" //存储车架号还是零件号查询类别 pid vin
	}

	changeP(vin) {
		this.setState({
			hasChange: "block"
		})
	}

	showTypein(){
		this.setState({
			nextshow: "none",
			nextshowtypein:"block",
			isGray:true
		})
	}

	componentDidMount() {
		//接受来自dgroupright
		catchEvent(middleEvents.dgroupright, e => {
				this.searchClick(e.info)
			})
			//接受来自dgrouphavelist
		catchEvent(middleEvents.dgrouphavelist, e => {
//			this.searchClick(this.storemes, "", e.info)
			this.searchClick(this.storemes,this.storemode, this.storecid, e.info,this.storetype)
		})
	}

	hiddenTag() {
		this.setState({
			showTag: false
		})
	}
	Clicktype(num){
		this.searchClick(this.storemes,this.storemode,this.storecid, 1,num)
	}

	searchClick(keyWord,mode="vin", cid, page = 1,type=1) {
		let _url="/engine/fuzzy_result_vin"
		let _obj = {}
		_obj.query = keyWord
		_obj.brandCode = "bmw"
		_obj.concise_searching=type
		_obj.page = page
		_obj.start_index = this.start_index||0
		_obj.vin = this.storevin
		_obj.mode = mode

		this.storetype = type
		this.storemode = mode
		sizerType=type
		let _showgroup = {
			"mode":mode,
			"query": keyWord,
			"brandCode": "bmw",
			"page": page,
			"vin":this.storevin
		}
		$(".dgLeftHaveLoading").show()
		
		
		this.storemes = keyWord
		//imgdata
		getAjax(_url, _obj, response => {
			this.start_index = response.start_index
			truePart=response.pattern
			let _floatdata=response["adaptive_cars"]==undefined?[]:response.adaptive_cars
			let _ajaxmes = response["msg"]==undefined?"":response.msg
			newvin=response.vin
			this.setState({
				ajaxmes:_ajaxmes,
				floatdata:_floatdata,
				choosetype:response.button_existence,
				matchtype:type,
				imgdata:groupimgdata,
				rightdata:grouprightdata,
				nextshow: "block",
				nextshowtypein:"none",
				showgroup: _obj,
				grouplistdata: response,
				showTag: false,
				lengths: response.length,
				carVin:response.vin,
				isGray:false
			}, () => {
				//bottom data
				let _urlbottom = "/engine/relevant_info"
				getAjax(_urlbottom, _obj, responseinfo => {
					this.setState({
						ajaxdata:responseinfo
					})
				})
				$(".dgLeftHaveLoading").hide()
			})
			
			this.storevin=response.vin
			//main and sub
			let _rightds={
				vin:response.vin,
				code:"bmw"
			}
			if (response.pattern==0) {
				return
			}
			let _urlright="/ppyvin/carsinfo"
			getAjax(_urlright, _rightds, responsecar => {
				this.setState({
					maindata:responsecar.main_info,
					subdata:responsecar.sub
				})
			})
			
		})
		
}
	render() {
		let _grouplistdata = this.state.grouplistdata //生成的数据
		let _showgroup = this.state.showgroup  //groupbottom 请求用参数
		let _showTag = this.state.showTag
		let _carVin = this.state.carVin
		let _hiddenTag = this.hiddenTag.bind(this)
		let _hasChange = this.state.hasChange
		let _nextshow = this.state.nextshow  	//下层显示
		let _nextshowtypein = this.state.nextshowtypein //显示录入页面

		let _length = this.state.lengths
		let _bottomdata= this.state.ajaxdata
		let _maindata=this.state.maindata 		//车辆数据
		let _subdata= this.state.subdata 		//车辆信息
		let _imgdata=groupimgdata 				//groupimg 用数据
		let _matchtype= this.state.matchtype 	//请求类型
		let _headshow = this.state.choosetype
		let _floatdata = this.state.floatdata   //同类车型数据
		let _ajaxmessage = this.state.ajaxmes
		return (
			<div>
				<Search 
					searchClick={this.searchClick.bind(this)}
					changeP={this.changeP.bind(this)}
					showTypein={this.showTypein.bind(this)}
					isGray = {this.state.isGray} 
					carVin={_carVin}/>
				<Typein 
					show={_nextshowtypein}
				/>
				<Group
					ajaxmes={_ajaxmessage}
					floatdata={_floatdata}
					headtype={_headshow}
					Clicktype={this.Clicktype.bind(this)}
					matchtype={_matchtype}
					maindata={_maindata}
					subdata={_subdata}
					bottomdata={_bottomdata}
					imgdata={_imgdata}
					showgroup={_showgroup} 
					data={_grouplistdata} 
					carVin={_carVin} 
					hasChange={_hasChange} 
					nextshow={_nextshow} 
					lengths={_length}/>
			 	<Tag
			 		showTag={_showTag}
			 		show={() => this.setState({showTag: true})}
			 		hidden={_hiddenTag} />
			</div>
		)
	}
}

render(<Page />, document.getElementById("root"))