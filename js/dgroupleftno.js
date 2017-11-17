import React, {Component} from 'react'

export default class DGroupLeftNo extends Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
		this.words = "暂无与此关键词相关的零件，请尝试其他关键词。"
	}
	
	componentDidMount() {
		
	}	
	render() {
		let _result = 0
		let _keys = this.props.keys.keyWord
		return (
			<div className="dgleftno">
				<div className="dglefttitle">
					找到
					<span>{_result}</span>
					个结果
				</div>
				<div className="dgleftnowords">
				没有找到与<span style={{color:"#1AA0F3"}}>{_keys}</span>相关的内容。
				</div>
			</div>
		)
	}
}
