import React, {Component} from 'react'
import MiddleRightContentListComponent from './middlerightcontentlistcomponent'

export default class MiddleRightContentListHeader extends MiddleRightContentListComponent {
	constructor(props) {
		super(props)
	}
	
	render() {
		let _titles = ["","位置", "零件号", "名称", "件数", "型号", "参考价格", "说明", " "]
		let _widths = this.widths
		return (
			<div className="MiddleRightContentListItemContainer">
				{
					_titles.map((title, index) => {
						return (
							<div
								key={index}
								className="MiddleRightContentListItem MiddleRightContentListTopItem"
								style={{width: _widths[index]}}>
								{title}
							</div>
						)
					})
				}
			</div>
		)
	}
}