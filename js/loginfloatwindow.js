import React, {Component} from 'react'
import {Toast} from './dialog'
import PropTypes from "prop-types"

export default class LoginFloatWindow extends Component {
	constructor(props) {
		super(props)
		this.username = localStorage.getItem("ppyusername")
		this.userpassword = localStorage.getItem("ppyuserpassword")
		
		this.state = {
			remember: this.userpassword ? true : false,
			username: this.username,
			userpassword: this.userpassword,
			toastShow: "none",
			toastMessage: ""
		}
		
		this.markVin = props.markVin
	}
	
	componentDidMount() {
		if(this.username) this.refs.clear_username.style.display = 'block'
		if(this.userpassword) this.refs.clear_password.style.display = 'block'
		this.refs.logincontentusername.value = this.username
		this.refs.logincontentuserpassword.value = this.userpassword
	}
	
	componentWillReceiveProps(props) {
		this.markVin = props.markVin
	}
	
	componentDidUpdate() {
		// $(this.refs.logincontentusername).focus()
	}
	
	remember() {
		let _remember = !this.state.remember
		
		this.setState({
			remember: _remember
		})
	}
	
	loginClick() {
		let _remember = this.state.remember
		let _url = "/login"
		let _username = this.refs.logincontentusername.value
		let _password = this.refs.logincontentuserpassword.value
		let _obj = {
			username: _username,
			password: _password
		}
		
		localStorage.setItem("ppyusername", this.refs.logincontentusername.value)
		
		if (_remember) {
			localStorage.setItem("ppyuserpassword", this.refs.logincontentuserpassword.value)
		} else{
			localStorage.setItem("ppyuserpassword", "")
		}
	
		$.ajax({
			type: "post",
			url: _url,
			data: _obj,
			success: data => {
				if(data.code == 1) {					
					this.props.successLogin()
				}else if(data.code == 0) _this.setState({
					toastShow: "flex",
					toastMessage: data.msg
					})
				else if(data.code == 2) location.href="/logout"
				else console.log("errorMsg is" + data.msg)
			}
		})
	}
	
	change(e) {
		let _maxLength = 20
		let _logincontentusername = this.refs.logincontentusername
		let _logincontentuserpassword = this.refs.logincontentuserpassword
		
		if (e.target == _logincontentusername) {
			let _length = _logincontentusername.value.length
			
			let _clear_username = this.refs.clear_username
			if(_length > 0) _clear_username.style.display = 'block'
			else _clear_username.style.display = 'none'
			
			if(_length > _maxLength) {
				let _value = _logincontentusername.value
				setTimeout(() => {
					_logincontentusername.value = _value.substr(0, _maxLength)
				}, 20)
			}
		}else {
			let _length = _logincontentuserpassword.value.length
			
			let _clear_password = this.refs.clear_password
			if(_length > 0) _clear_password.style.display = 'block'
			else _clear_password.style.display = 'none'
			
			if(_length > _maxLength) {
				let _value = _logincontentuserpassword.value
				setTimeout(() => {
					_logincontentuserpassword.value = _value.substr(0, _maxLength)
				}, 20)
			}
		}
	}
	
	render() {
		let _show = this.props.show
		let _toastShow = this.state.toastShow
		let _toastMessage = this.state.toastMessage
		let _cancle = this.props.closeLogin
		let _remember = this.remember.bind(this)
		let _loginClick = this.loginClick.bind(this)
		let _change = this.change.bind(this)
		let _background = this.state.remember ? 'url("https://cdns.007vin.com/img/icon_mima.png") no-repeat 50%' : "white"
		return (
			<div ref="loginfloatwindowcontainer" className="LoginFloatWindowContainer" style={{display: _show}}  onClick={e => {
				if(e.target === this.refs.loginheadercancle || e.target === this.refs.loginfloatwindowcontainer) _cancle()
			}}>
				<div className="LoginContainer">
					<div className="LoginHeader">
						<img className="LoginHeaderTitleImg" src={cdnHost+"/img/icon_007_320.png"} alt="零零汽" />
						<button ref="loginheadercancle" className="LoginHeaderCancle" alt="cancle"></button>
					</div>
					<div className="LoginContent">
						<input ref="logincontentusername" className="LoginContentUserName" onChange={_change} placeholder="手机号 / 会员卡号"
							onKeyPress={e => {
								let _keyCode = e.which || e.keyCode
								if (_keyCode == 13) _loginClick()
						}}/>
						<div ref='clear_username' className='clear_username' onClick={() => {
							this.refs.logincontentusername.value = ''
							this.refs.clear_username.style.display = 'none'
							}}></div>
						<input ref="logincontentuserpassword" className="LoginContentUserPassword" onChange={_change} type="password" placeholder="登录密码"
							onKeyPress={e => {
								let _keyCode = e.which || e.keyCode
								if (_keyCode == 13) _loginClick()
						}}/>	
						<div ref='clear_password' className='clear_password' onClick={() => {
							this.refs.logincontentuserpassword.value = ''
							this.refs.clear_password.style.display = 'none'
							}}></div>
						<div className="LoginContentRemember" onClick={_remember} style={{background: _background}}></div>
						<div className="LoginContentRememberPassword">记住密码</div>
						<button className="LoginContentButton" onClick={_loginClick}>登录</button>
						<div className="LoginContentForgetPassword" onClick={() => {location.href = "/findpwd"}}>忘记密码?</div>
						<Toast message={_toastMessage} show={_toastShow} hiddenEvent={() => this.setState({toastShow: "none"})}/>
					</div>
				</div>
			</div>
		)
	}
}


LoginFloatWindow.propTypes = {
	show: PropTypes.string.isRequired,
	closeLogin: PropTypes.func.isRequired,
	successLogin: PropTypes.func.isRequired
}