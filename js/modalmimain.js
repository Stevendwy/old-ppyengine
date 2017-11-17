import React,{Component} from 'react'
export default class ModalMiMain extends Component{
	constructor(){
		super()
	}
	render(){
		return(
			<div className='ModalMiMain'>
					<div className="MiItemTitle">
						<span>MI</span>
						<p>说明</p>
					</div>
					<div className="MiItemContainer">
						<ul className="MiItemlList">
						{
						this.props.list.map((item,index)=>{
								return(
								<li key={index} className="MiItem">
									<span>{item.key}</span> 
									<p>{item.value}</p> 
								</li>
								)
						})
	               		}
						</ul>
					</div>
			</div>
		)
	}
}