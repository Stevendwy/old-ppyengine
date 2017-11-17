import React, {
	Component
} from 'react'
import ModalHead from './modalhead.js'
import ModalBodyNav from './modalbodynav.js'
import ModalBodyMain from './modalbodymain.js'
import ModalMiMain from './modalmimain.js'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'

export default class Modal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			index: 1,
			list: [
				[],
				[],
				[]
			],
			show: "block"
		}
	}

	componentDidMount() {
		catchEvent(middleEvents.bodyClick, (e) => {
			//			console.log(e.target)
			//			console.log(this.refs.modal)
		})


		if (params.vin) {
			let _url = "/ppyvin/carsinfo"
			let _obj = {
				code: params.brandName,
				vin: params.vin
			}
			getAjax(_url, _obj, response => {
				let _list = []
				_list[1] = response.main
				_list[2] = response.sub

				if (_list[1].length == 0) {
					console.log("runnning")
					sendEvent(middleEvents.hascalmain)
				}

				if (_list[2].length == 0) {
					sendEvent(middleEvents.hascalsub)
				}

				this.setState({
					list: _list
				})
			})
		}

	}

	navsClick(index) {
		//		console.log(response);
		this.setState({
			index: index
		})
	}

	cancleClick() {
		this.setState({
			show: "none"
		})
	}

	render() {
		let _show = this.state.show
		let _content = this.props.type == 0 ? <ModalBodyMain list={this.state.list[1]}/> : <ModalMiMain list={this.state.list[2]}/>
		return (

			<div   ref="modal" className="ModalCar" style={{display: _show}}>
				{/*<ModalBodyNav 
					click={this.navsClick.bind(this)}
					index={this.state.index}
				/>
//				<ModalBodyMain list={this.state.list[this.state.index]}/>*/}
				{_content}
			</div>

		)
	}
}