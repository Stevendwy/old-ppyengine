import React, {Component} from 'react'
import GroupPartDetailList from './grouppartdetaillist'

export default class GroupPartDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			detailObj: {}
		}
		this.pid = ""
	}
	
	componentDidMount() {
		
	}	
	render() {
		let _detailObj = this.props.response
		return (
			<div className="GroupPartDetailContainer">
				<div className="GroupPartDetailContent">
					<GroupPartDetailList obj={_detailObj}/>
				</div>
			</div>
		)
	}
}
