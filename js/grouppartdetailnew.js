import React, {Component} from 'react'
//import GroupPartDetailList from './grouppartdetaillist'
import GroupPartDetailListModel from './grouppartdetaillistmodel'
import GroupPartDetailListModelContentContent from './grouppartdetaillistmodelcontent'
//import {headmessage} from './datas'

export default class GroupPartDetailListNew extends Component {
	constructor(props) {
		super(props)
		this.state = {
			detailObj: {"data":[]},
			nextmessage:{},
			pid:props.pid,
			fatherlength:"0"
		}
		
	}
	
	componentDidMount() {
		
		let _url = "/ppys/partdetail"
		let _obj = {
			part: this.props.pid,
			brand:params.brandName
		}
		this.setState({
			nextmessage:_obj
		},()=>{
			getAjax(_url, _obj, response => {
				if(response.data.length<=2){
					this.setState({
						detailObj: response,
						fatherlength: "2"
					})
				}else{
					this.setState({
						detailObj: response,
						fatherlength: "0"
					})
				}
			})
		})
	}
	
	componentWillReceiveProps(props) {

		let _pid = props.pid
		if(this.state.pid == _pid) return
		let _url = "/ppys/partdetail"
		let _obj = {
			part: props.pid,
			brand:params.brandName
		}
		this.setState({
			nextmessage:_obj
		},()=>{
			getAjax(_url, _obj, response => {
				if(response.data.length<=2){
					this.setState({
						detailObj: response,
						fatherlength: "2"
					})
				}else{
					this.setState({
						detailObj: response,
						fatherlength: "0"
					})
				}
			})
		})
			
	}
	
	render() {
		let _model = this.state.detailObj
		let _modellists = _model.data.map((item,index)=>{
			let _showmessage = _model
			return(
				<GroupPartDetailListModel key={index} 
				fatherindex={index}
				fatherlength={this.state.fatherlength}
				showname={item.headname} 
				showmessage={_model}
				bindmes={this.state.nextmessage}
				/>
			)
		})
		let _falseback =<div className="GroupPartDetailListModelContentcontentFatherFalse">厂商暂未提供此零件信息</div> 
		let _modellist=_modellists.length==0?_falseback:_modellists
		return (
			<div className="GroupPartDetailListModelContentcontentFather">
				{_modellist}
			</div>
			
		)
	}
}
