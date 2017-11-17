import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class GroupPartDetailList extends Component {
	constructor() {
		super()
		this.titles = ["零件类型", "厂家", "产地", "零件号", "备注", "参考价格"]
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
				let _contents = [item.parttype, item.mill, item.origin, item.pid, item.remark, item.prices]
				return (
					<GroupPartDetailLine key={index} contents={_contents}/>
				)
			})
		}
		return (
			<div className="GroupPartDetailListContainer">
				<div className="GroupPartDetailListHeader">
					{_headerContent}
				</div>
				<div className="GroupPartDetailListFooter">
					{_footerContent}
				</div>
			</div>
		)
	}
}

GroupPartDetailList.propTypes = {
	obj: PropTypes.object.isRequired
}

class GroupPartDetailLine extends Component {
	constructor() {
		super()
		this.widths = ["17%", "17%", "17%", "calc(23% - 19px)", "10%", "18%"]
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
