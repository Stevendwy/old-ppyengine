import React, { Component } from 'react'
import { sendEvent, catchEvent, removeEvent, middleEvents } from './eventmodel'
//import {headData,mainGroupData} from './datas'

export default class GroupPartDetailListModelContentContent extends Component {
	constructor(props) {
		super(props)
		this.state = {
			gotmes: { "data": [] },
			whitchIs: "",
			cursors: "auto"
		}
	}
	componentDidMount() {
		this.setState({
			gotmes: this.props.nexmess,
			whitchIs: this.props.whitchIs
		})
	}
	componentWillReceiveProps(props) {
		this.setState({
			gotmes: props.nexmess,
			whitchIs: props.whitchIs
		})
	}
	newFloatwindow(item, e) {
		if(this.state.whitchIs != "0") {
			let _chancenum = item.replace("替换为：", "")
			sendEvent(middleEvents.addfloatwindow, _chancenum)
		} else {
			console.log("kong")
		}
		e.stopPropagation()
	}
	handleMouseEnter(item, e) {
		if(this.state.whitchIs != "0") {
			this.setState({
				cursors: "pointer"
			})
		}
		e.stopPropagation()
	}
	handleMouseLeave(item, e) {
		this.setState({
			cursors: "auto"
		})
		e.stopPropagation()
	}

	render() {
		let _cursor = this.state.cursors
		let _mes = this.props.nexmess
		let _head = this.state.whitchIs == "0" ? this.state.gotmes.data[1].showmessage[0] : this.state.gotmes.data
		let _lihead= this.state.whitchIs == "0" ? "":"替换为："
		let _li = _head.map((item, index) => {
			let _item =this.state.whitchIs == "0" ?item:item.replace("替换为：", "")
			return(
				<div key={index} style={{cursor:_cursor}}
					className="GroupPartDetailListModelContentcontentLi">
					<span>{_lihead}</span>
					<span 
					onClick={this.newFloatwindow.bind(this,item)}
					onMouseEnter={this.handleMouseEnter.bind(this,item)}
					onMouseLeave={this.handleMouseLeave.bind(this,item)}
					>{_item}</span>
				</div>
			)
		})
		return(
			<div className="GroupPartDetailListModelContentcontentExc">
				{_li}	
			</div>
		)
	}
}
