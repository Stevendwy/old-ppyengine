import React, {Component} from 'react'
import MiddleRightRemind from './middlerightremind'

export default class MiddleRemind extends Component {
	
	render() {
		return (
			<div className="MiddleRemindContainer">
				<div className="MiddleRemindBox" style={{left: "0"}}>
					<MiddleRightRemind />
				</div>
			</div>
		)
	}
}