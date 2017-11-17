import React,{Component} from 'react'
export default class ModalBodyMain extends Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div className='ModalBodyMain'>
					<ul className="ModalList">
					{
					this.props.list.map((item,index)=>{
							return(
							<li key={index} className="ModalListItem">
								<p>{item.key}</p> 
								<span>{item.value}</span> 
							</li>
						)
					})
               }
					</ul>
			</div>
		)
	}
}