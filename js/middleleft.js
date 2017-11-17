import React, {Component} from 'react'
import MiddleLeftContent from './middleleftcontent'
import {sendEvent, catchEvent, removeEvent, middleEvents} from './eventmodel'

export default class MiddleLeft extends Component {
	
	constructor() {
		super()
		this._transform = this.transform.bind(this)
		this.state = {
			width: "38%"
		}
	}
	
	componentDidMount() {
		catchEvent(middleEvents.transform, this._transform)
	}
	
	componentWillUnmount() {
		removeEvent(middleEvents.transform, this._transform)
	}
	
	transform(e) {
//		console.log(e.info.hasTransform)
		let _width = e.info.hasTransform ? "38%" : "62%"
		this.setState({
			width: _width
		}, e.info.resetCoords)
	}
	
	render() {
		return (
			<div className="MiddleLeftContainer" style={{width: this.state.width}}>
				<MiddleLeftContent />
			</div>
		)
	}
}
