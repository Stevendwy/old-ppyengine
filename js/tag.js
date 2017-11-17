import React, {
	Component
} from 'react'
import MiddleLeft from './middleleft'
import MiddleRight from './middleright'
import MiddleTitle from './middletitle'
import MiddleRemind from './middleremind'
import { sendEvent, catchEvent, removeEvent, middleEvents } from './eventmodel'

export default class Tag extends Component {

	componentDidMount() {
		catchEvent(middleEvents.subGroupClick, () => {
			this.props.show()
		})

		document.onkeydown = event => {
			let e = event || window.event || arguments.callee.caller.arguments[0]
			if(e && e.keyCode == 27&&(this.props.showTag==true)) { // 按 Esc 
				this.props.hidden()
			}
		}
	}
	
	componentWillReceiveProps(props) {
		if(!props.showTag) sendEvent(middleEvents.hiddenTag, {})
	}

	render() {
		let _className = "container_tag hidden"
		let _showSelf = this.props.showTag
		if(_showSelf) _className = "container_tag show"
		let _hiddenSelf = this.props.hidden

		return(
			<div className={_className}>
				<MiddleTitle/>
				<MiddleLeft />
				<MiddleRight />
				<MiddleRemind />
				<input className="input_close" type="button" onClick={_hiddenSelf} defaultValue="<返回" />
			</div>
		)
	}
}