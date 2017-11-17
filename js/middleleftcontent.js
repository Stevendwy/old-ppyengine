import React, { Component } from 'react'
import ShowImageView from './showimageview'
import { sendEvent, catchEvent, removeEvent, middleEvents } from './eventmodel'

export default class MiddleLeftContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			imgsData: { data: { mapdata: [], imgurl: "" } },
			background: "url('https://cdns.007vin.com/img/p_jiegoutu.png') no-repeat center center",
			loadingImgshow: "block"
		}
		this._subGroupClick = this.subGroupClick.bind(this)
//		this.uid = ""//用来识别网络请求回来的内容与分组点击所需要内容是否匹配
		this.auth = null //防止重复点击相同
		this.currentImgUrl = ""
	}

	componentDidMount() {
		catchEvent(middleEvents.subGroupClick, this._subGroupClick)
//		this._subGroupClick()
		catchEvent(middleEvents.showSubGroupPreview, e => {
			let _changeHeight = e.info.showSubGroupPreview ? 192 : 0//减去了40
			let _middleleftcontentcontainer = this.refs.middleleftcontentcontainer
//			_middleleftcontentcontainer.style.marginTop = _num + "px"
			$(_middleleftcontentcontainer).animate({
				marginTop:_changeHeight + "px"
			},"slow")			
//			_middleleftcontentcontainer.style.height = _middleleftcontentcontainer.offsetHeight + _changeHeight + "px"
		})
	}

	subGroupClick(e) {
//		console.log(`ie: ${JSON.stringify(e.info)}`)
		let _auth = e.info.auth
	//	if(this.auth != _auth) this.auth = _auth
	//	else return
		this.auth = _auth

		// this.setState({
		// 	loadingImgshow: "block"
		// })
//		this.uid = e.info.uid
		//请求数据刷新
		let _url = "/ppycars/subimgs"
		let _obj = {
			auth: _auth,
			code: e.info.brandCode
		}
//		console.log(_obj)
		getAjax(_url, _obj, response => {
//			console.log("ajax")
//			if(response.uid != this.uid) return
			let _status = "block"
			if(this.currentImgUrl == response.data.imgurl) _status = "none"
			else this.currentImgUrl = response.data.imgurl
				
			this.setState({
				imgsData: response,
				loadingImgshow: _status
			})
		})
	}

	render() {
		let _imgsData = this.state.imgsData
		let _background = this.state.background
		let _loadingImgshow = this.state.loadingImgshow

		return(
			<div ref="middleleftcontentcontainer" className="MiddleLeftContentContainer">
				<div className="MiddleLeftContent"
					style={{background: _background}}>
					<ShowImageView
						imgsData={_imgsData}
						loadingImgshow={_loadingImgshow}
						hiddenLoadingImgshow={() => this.setState({loadingImgshow: "none"})}
						changeBackground={() => {this.setState({background: "white"})}}/>
				</div>
			</div>
		)
	}
}
