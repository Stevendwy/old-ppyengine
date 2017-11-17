import React, {Component} from 'react'
import GroupPartDetailListModal from './grouppartdetaillistmodal'

export default class GroupPartDetailModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			detailObj: {}
		}
		this.pid = ""
		this.response={
			"data":{"local":10,"code":11111111,"codeName":"火花塞","remark":"备注1","件数":3}
		}
	}
	
	componentDidMount() {
		
	}
	
	componentWillReceiveProps(props) {
		let _pid = props.pid
		if(this.pid == _pid) return
		this.pid = _pid
			
		let _url = "/ppyvin/partprices"
		let _obj = {
			code: params.code,
			part: this.pid
		}
//		getAjax(_url, _obj, response => {
//			this.setState({
//				detailObj: response
//			})
//		})
//var headData = {
// "msg": "",
// "code": 0,
// "data":    {
//    "brandurl": "http://beta.007vin.com/img/carpart/porsche.png",
//    "carhead": "保时捷－Porsche 356/356A－1950 - 1959年"
// },
// "time": 1482201614
//}
		this.setState({
			detailObj:this.response
		})
	}
	
	render() {
		let _detailObj = this.state.detailObj
		return (
			<div className="GroupPartDetailContainerModal">
				<div className="GroupPartDetailContentModal">
					<GroupPartDetailListModal obj={_detailObj}/>
				</div>
			</div>
		)
	}
}
