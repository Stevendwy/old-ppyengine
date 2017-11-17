import React, {
	Component
} from 'react'
import DGroupLeftHaveList from './dgrouphavelist'
import DGroupLeftHaveImg from './dgrouphaveimg'

export default class DGroupLeftHave extends Component {
	constructor(props) {
		super(props)
		this.state = {
			havetype: 1,
			havewhitch: <div></div>
		}
		this.total = 0
	}
	componentDidMount() {
		this.datachange()
	}
	datachange() {
				let _datas = this.props.datas
				let _amountpage = this.props.amountpage
				let _showtype = this.state.havetype
				let _shoewhitch = <div className="dglefttitleloading"></div>
				if (_showtype == 1) {
					_shoewhitch = <DGroupLeftHaveList data={_datas} amountpage={_amountpage}/>
				} else {
					_shoewhitch = <DGroupLeftHaveImg />
				}
				this.setState({
					havewhitch: _shoewhitch
				})
			}
	render() {
		let _show = this.state.havewhitch
		let _ajaxok = this.props.amountpage.ajaxok == true ? "block" : "none"
		let _shownum = this.props.length
		return (
			<div  className="dglefthave">
				<div className="dgLeftHaveLoading"></div>
				<div className="dglefttitle">
					为您找到相关结果约
					<span>{_shownum}</span>
					个
				</div>
				{_show}
			</div>
		)
	}
}