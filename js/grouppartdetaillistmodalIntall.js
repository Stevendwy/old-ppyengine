import React, {Component} from 'react'
import PropTypes from "prop-types"

export default class GroupPartDetailListModalIntall extends Component {
	constructor() {
		super()
		this.titles = ["位置", "零件号", "名称","型号", "备注", "件数"]
	}
	
	render() {
		let _obj = this.props.obj
		let _headerContent = <div></div>
		if(_obj.data) {
			_headerContent = <GroupPartDetailLine contents={this.titles}/>
		}
		let _footerContent = <div></div>
		if(_obj.data) {
			_footerContent = _obj.data.map((item, index) => {
				let _contents = [item.id, item.pid, item.label,item.model,item.remark, item.num]
				return (
					<GroupPartDetailLine key={index} contents={_contents}/>
				)
			})
		}
		return (
			<div className="GroupPartDetailListContainer">
				<div className="GroupPartDetailListHeaderIntall">
					{_headerContent}
				</div>
				<div className="GroupPartDetailListFooterIntall">
					{_footerContent}
				</div>
			</div>
		)
	}
}

class GroupPartDetailLine extends Component {
	constructor() {
		super()
		this.widths = ["5%", "18%", "29%", "28%","14%","6%"]
	}
	
	render() {
		let _contents = this.props.contents
		let _line = _contents.map((item, index) => {
			return (
				<div key={index} style={{width: this.widths[index]}}>
					{_contents[index]}
				</div>
			)
		})
		return (
			<div className="">
				{_line}
			</div>
		)
	}
}
