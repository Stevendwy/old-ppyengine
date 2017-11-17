import React, {Component} from 'react'
import PropTypes from "prop-types"

export class Toast extends Component {
	
	componentDidMount() {
		
	}
	
	render() {
		let _message = this.props.message
		let _show = this.props.show
		if(_show != "none") setTimeout(() => this.props.hiddenEvent(), 1000)
		return (
			<div ref="toast" className="ToastContainer" style={{display: _show}}>
				<div className='ToastMessageContainer'>
					<span className="ToastMessage">{_message}</span>
				</div>
			</div>
		)
	}
}

Toast.propTypes = {
	message: PropTypes.string.isRequired,
	show: PropTypes.string.isRequired,
	hiddenEvent: PropTypes.func.isRequired
}
