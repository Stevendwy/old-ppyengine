import React, {Component} from 'react'
import DGroupLeftHave from 'dgrouplefthave'
import DGroupLeftNo from 'dgroupleftno'

export default class DGroupLeft extends Component {
	constructor(props) {
		super(props)
		this.state = {
			pagenum:props.total,
			showtype:props.type,
			showwhitch:<div></div>
		}
	}
	
	componentDidMount() {
		let _total = this.state.pagenum//总计多少
		let _showtype = this.state.showtype
		let _shoewhitch=<div></div>
		if (_showtype=="true") {
			_shoewhitch=<DGroupLeftHave total={_total}/>
		}else if(_showtype=="false"){
			_shoewhitch=<DGroupLeftNo />
		}else{
			_shoewhitch=<div></div>
		}
		this.setState({
			showwhitch:_shoewhitch
		})
	}	
	render() {
		let _show = this.state.showwhitch
		return (
			<div	 className="dgleft">
				{_show}
			</div>
		)
	}
}
