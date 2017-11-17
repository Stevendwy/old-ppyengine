import React,{Component} from 'react'
export default class ModalHead extends Component{
	constructor(){
		super()
	}
	
	render(){
		return(
			<div className='ModalHead'>
				<p>
				车辆标识
				</p>
				<span onClick={() => {this.props.cancleClick()}}><img src={cdnHost+"/img/icon_san.png"} alt="无图" /></span>
			</div>
		)
		
	}
}