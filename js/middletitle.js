import React, {
	Component
} from 'react'
import { sendEvent, catchEvent, middleEvents } from './eventmodel'
export default class MiddleTitle extends Component {
	constructor() {
		super()
		this.state = {
			title: "",
			_title: "",
			_maingroup: "",
			_subgroup: ""
		}
		this._newtitle = ""
		this._subGroupClick = this.subGroupClick.bind(this)
		this.auth = null //防止重复点击相同
	}

	componentDidMount() {
		catchEvent(middleEvents.subGroupClick, this._subGroupClick)
	}

	componentWillReceiveProps(props) {
		let _MiddleLeftTitle = this.refs.MiddleLeftTitle
		$(_MiddleLeftTitle).animate({
			marginTop: props.marginT
		}, "slow")
	}

	subGroupClick(e) {
		
		let _auth = e.info.auth
		if(this.auth != _auth) this.auth = _auth
		else return
		
		//title 拼接
		let _url = "/engine/parts_headers"
		if(isParts) _url = "/engine/parts_headers"
		else if(isVIN) _url = "/engine/parts_headers"
		let _obj = { //车型基本，没有p和vin
			auth: _auth,//params.auth,
			code: e.info.brandCode,//params.code
			vin : newvin||params.vin//发送vin
		}
		if(isParts) _obj.p = params.p
//		_obj.p = e.info.p
		else if(isVIN) _obj.vin = newvin||params.vin
		getAjax(_url, _obj, response => {
//			console.log(response)
			this.setState({
				_title: response.data.carhead[0],
				_maingroup:response.data.carhead[1],
				_subgroup:response.data.carhead[2]
			})
		})
	}

	render() {
		let _titles = this.state._title + " / " + this.state._maingroup + " / " + this.state._subgroup
			if (sizerType==0) {
				_titles = this.state._maingroup + " / " + this.state._subgroup	
			}else if (sizerType==2) {
				_titles = this.state._subgroup
			}
		let _margintop = this.props.marginT
		return(
			<div className="MiddleLeftTitleContainer" style={{paddingTop: "0", backgroundColor: "#f2f2f2"}}>
				<div className="MiddleLeftTitle" ref="MiddleLeftTitle">
					{_titles}
				</div>
			</div>
		)
	}
}