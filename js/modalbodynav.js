import React,{Component} from 'react'
export default class ModalBodyNav extends Component{
	constructor(){
		super()
	}
	navClick(index){
		this.props.click(index);
	}
	render(){
		var car="m_active";
		var mi="";
		if(this.props.index==2){
			mi="m_active";
			car=""
		}
//		m_active
		
		return(
			<div className='ModalBodyNav'>
				<div className="ModalBodyNavLeft" onClick={this.navClick.bind(this,1)}>
					<span className={car}>车辆信息</span>
				</div>
				<div className="ModalBodyNavRight" onClick={this.navClick.bind(this,2)}>
					<span className={mi}>MI编号</span>
				</div>
			</div>
		)
		
	}
}