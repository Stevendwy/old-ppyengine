import React, {Component} from "react"
import FloatWindow from './floatwindow'
import Modal from './modal'
import {sendEvent, catchEvent, middleEvents} from './eventmodel'
import LoginFloatWindow from "./loginfloatwindow"
import {ConfirmAuto, Prompt} from "dialog-react"
import Switch from "switch-react"

export default class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasChange: false, //位置改变
            showAdvancedSearch: false, //显示高级搜索挂件
            resultList: [], //ajax请求后的列表数据
            normalValue: "", //默认输入框value没有
            advancedValue: "", //高级输入框value没有
            dropListShow: "none", //默认下拉列表不显示
            historyList: [], //
            historyShow: false, //历史列表显示默认false
            toggleDrop: "-100%",
            activeHistory: "",
            subListData: [],
            mainListData: [],
            userInfo: "",
            boxShadow: "",
            activeDropIndex: -1, //默认为选择到的列表项为-1
            mainShow: false,
            loginStatus: false, //登录组件状态
            showLoginWindow: false,
            showConfirm: false, //显示 Confirm
            contentConfirm: " ", //显示 Confirm 内容
            showPrompt: false, //显示 Confirm
            contentPrompt: " ", //显示 Confirm 内容
            showMum: false, //验证 VIN 的菊花转
            vinLength: 0, //vin 长度
            vinCloseShow: false, //vin 清空按钮显示
            remindShow: false, //提示是否显示
            logoutShow: false, //退出显示
            isOff: false, //高级搜索的开关显示问题
        }
        this.timer = null
        this.returnAjax = false
        this.timeout = 1000
        this.cid = ""
        this.vin = ""
        this.hasParams = false //是否开头有 vin 在链接里
    }

    componentDidMount() {
        document.addEventListener('keydown', e => {
            switch (e.keyCode) {
                case 13:
                    if(!this.state.loginStatus) this.setState({showLoginWindow: true})
                    else {
                        let _value = this.state.advancedValue
                        this.advancedSearch(_value.length > 0 ? _value : this.state.normalValue)
                    }
                    break;
                case 40: //下
                    if (this.state.dropListShow == "block") {
                        this.moveActiveIndex(1)
                    }
                    break;
                case 38: //上
                    if (this.state.dropListShow == "block") {
                        this.moveActiveIndex(-1)
                    }
                    break;
            }
        })
        catchEvent(middleEvents.hascalmain, () => {
            this.setState({
                mainShow: false
            })
        })

        //右侧历史点击事件
        catchEvent(middleEvents.dgroupright, e => {
            this.setState({
                normalValue: e.info
            })
        })

        this.getUserInfo()

        window.addEventListener('scroll', this.handleScroll.bind(this))
        window.addEventListener('click', () => {this.setState({dropListShow: "none"})})
    }

    getUserInfo() {
        //检测登录状态
        getAjax("/usersinfos", {}, response => {
            this.setState({
                userInfo: response.data.users,
                loginStatus: true,
                showLoginWindow: false
            }, () => {
                if(this.state.loginStatus) {
                    if(params.vin) {
                        this.hasParamsVin = true //只对第一次有效
                        this.advancedSearch(params.vin)
                        let _vin = {
                            "vin":params.vin
                        }
                        getAjax("/engine/vin_identify", _vin, res => { })
                    }
                }
            })
        })
    }

    handleScroll(e) {
        if (this.state.hasChange) {
            let scrolltop = document.body.scrollTop
                // console.log(scrolltop)
            if (scrolltop > 30) {
                this.setState({
                    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.14)"
                })
            } else {
                this.setState({
                    boxShadow: ""
                })
            }
        }
    }

    changePlace(code, e) {
        let value = e.target.value

        if (code != 0) { //高级搜索不做处理
            this.setState({
                advancedValue: value 
            })
            return
        }

        let _url = "/engine/fuzzy_pop"
        let _modes = this.state.isOff ? "pid" : "vin"
        let _obj = {
            query: value,
            brandCode: "bmw",
            vin: this.props.carVin,
            mode:_modes
        }

        let _state = {
            normalValue: value
        }

        this.setState(_state)

        clearTimeout(this.timer)

        if (value !== "") {
            this.timer = setTimeout(() => {
                this.searchListAjax(_url, _obj)
            }, this.timeout)
        } else {
            this.setState({
                dropListShow: 'none'
            })
        }
    }

    searchListAjax(_url, _obj) {
        getAjax(_url, _obj, response => {
            let _state = null
            if (response.code == 1) {
                _state = {
                    resultList: response.data,
                    dropListShow: "block",
                    activeDropIndex: -1
                }
            } else {
                _state = {
                    dropListShow: "none",
                    showConfirm: true, //显示 Confirm
                    contentConfirm: response.msg
                }
            }
            this.setState(_state)
        }, true)
    }

    //下拉列表点击事件
    chooseItem(item) { //item 只带了 value
        if(!this.state.loginStatus) this.setState({showLoginWindow: true})
        else {
            this.setState({
                advancedValue: item 
            }, () => this.advancedSearch())
        }
    }

    //普通搜索旁边的搜索按钮点击事件
    searchClick() {
        if (this.state.normalValue !== "" || this.state.advancedValue !== "") {
            this.advancedSearch(this.state.normalValue)
        } else {
            this.reload()
        }
    }

    //上下按钮点击事件
    moveActiveIndex(count) {
        if (this.state.resultList.length - 1 == this.state.activeDropIndex && count > 0 || this.state.activeDropIndex == 0 && count < 0) {
            return
        }
        let index = this.state.activeDropIndex + count
        this.setState({
            activeDropIndex: index,
            normalValue: this.state.resultList[index],
            advancedValue: this.state.resultList[index]
        })
    }

    showHistory() {
        getAjax("/engine/fuzzy_history", "", res => {
            this.setState({
                historyShow: true,
                historyList: res.data || [],
                toggleDrop: "0px",
                activeHistory: "active"
            })
        })
    }

    reload() {
        location.reload()
    }

    //点击历史
    toggleHistory() {
        this.setState({
            toggleDrop: this.state.toggleDrop == "-100%" ? "0px" : "-100%",
            activeHistory: this.state.activeHistory == "active" ? "" : "active"
        })
    }

    //鼠标离开历史
    hideHistory() {
        this.setState({
            toggleDrop: "-100%",
            activeHistory: ""
        })
    }

    clearInput(code) {
        let _obj = {
            dropListShow: "none"
        }
        if(code == 0) _obj.normalValue = "" //normal
        else _obj.advancedValue = "" //advanced
        this.setState(_obj)
    }

    historyListClick(item) {
        this.setState({
            advancedValue: item 
        }, () => this.advancedSearch())
    }

    showConfirm(content) {
        this.setState({
            showConfirm: true,
            contentConfirm: content
        })
    }

    showPrompt(content) {
        this.setState({
            showPrompt: true,
            contentPrompt: content
        })
    }

    advancedSearch(value = this.state.advancedValue) {
        clearTimeout(this.timer) //关闭可能出现的搜索下拉列表
        // if(this.state.showAdvancedSearch && value.length < 1) this.showConfirm("请输入搜索内容")
        if(value.length < 1) {
            this.showConfirm("请输入搜索内容")
            return
        }
        else if(!this.state.loginStatus) this.setState({showLoginWindow: true})
        else {
            this.props.searchClick(value.replace(/(\w)([^\w\s])/, "$1 $2"), this.state.isOff ? "pid" : "vin")
            // console.log(value)
            let _obj = {
                dropListShow: "none",
                activeDropIndex: -1,
                normalValue: this.hasParamsVin ? "" : value,
                advancedValue: ""
            }
            if(this.hasParamsVin) this.hasParamsVin = false //只对第一次有效
            if(this.state.hasChange) _obj.showAdvancedSearch = false
            else _obj.hasChange = true
            this.setState(_obj, () => setTimeout(() => $(this.refs.normalInput).focus()), 300)
        }
    }

    showAdvancedSearch() {
        this.setState({
            showAdvancedSearch: true,
            advancedValue: "",
            vinLength: 0
        })
    }

    hiddenAdvancedSearch() {
        this.setState({
            showAdvancedSearch: false
        })
    }

    logout() {
        getAjax("/engine/logout", {}, (res) => {
            location.href = res.uri
        })
    }

    switchClick() {
        this.setState({
            isOff: !this.state.isOff
        })
    }

    //普通搜索框
    getNormalSearch() {
        let _normalSearch = null
        let _value = this.state.normalValue
        let _dropListShow = this.state.dropListShow
        let _closeShow = this.state.normalValue == "" ? "none" : "block"
        let _resultList = this.state.resultList.map((item, index) => {
            let _activeClassName = index == this.state.activeDropIndex ? "resultListItem active" : "resultListItem"
            return (
                <div key={index} className={_activeClassName} onClick={this.chooseItem.bind(this,item)}>
                        {item}
                    </div>
                )
        })
        let _isOff = this.state.isOff
        let _placeholder = _isOff ? "零件号" : "车架号 零件名称"
        let _vinShow = this.props.carVin ? true : false
        _vinShow = _isOff ? false : true
// <div className="graylogo" onClick={this.reload.bind(this)}></div>
        _normalSearch = (
            <div className="container_input">
                <img className="img_logo_blue" src={cdnHost+"/img/bluelogo.png"} />
                <div className="graylogo" onClick={()=>{location.href = "https://007vin.com/engine/index"}}></div>
                <div className="inputContainer">               
                    <input ref="normalInput" className="input" placeholder={_placeholder}
                        value={_value}
                        onChange={this.changePlace.bind(this, 0)}
                    />
                    <div className="container-switch">
                        <Switch
                            onName="车架号"
                            offName="零件号"
                            isOff={_isOff}
                            click={this.switchClick.bind(this)} />
                    </div>
                    <div className="closeIcon" onClick={this.clearInput.bind(this, 0)} style={{display:_closeShow}}></div>
                    <div className="inputIcon" onClick={this.searchClick.bind(this)}></div>
                    <div className="searchList" style={{display:_dropListShow}}>
                        {_resultList}
                    </div>
                </div>
                <div className="inputText" style={{display: _vinShow ? "block" : "none"}}>
                    VIN: <span>{this.props.carVin}</span>
                </div>
            </div>
        )
        return _normalSearch
    }

    //高级搜索框
    getContainerInput() {
        let _containerInput = null
        let _advancedValue = this.state.advancedValue
        let _dropListShow = this.state.dropListShow
        let _closeShow = this.state.advancedValue == "" ? "none" : "block"
        let _resultList = this.state.resultList.map((item, index) => {
            let _activeClassName = index == this.state.activeDropIndex ? "resultListItem active" : "resultListItem"
            return (
                <div key={index} className={_activeClassName} onClick={this.chooseItem.bind(this,item)}>
                    {item}
                </div>
            )
        })
        let _advancedSearch = this.advancedSearch.bind(this, _advancedValue)
        let _className = null
        if(!this.state.hasChange) {
            _className = "container-content"
        }else {
            if(!this.state.showAdvancedSearch) _className = "container-content up"
            else _className = "container-content top"
        }

        let _isOff = this.state.isOff
        let _placeholder = _isOff ? "零件号" : "车架号 零件名称"

        _containerInput = (
            <div className={_className}>
                {this.state.hasChange ? <div></div> : <img onClick={this.reload.bind(this)} className="logo" src={cdnHost+"/img/bluelogo.png"} />}

                <div className="container-searchs">
                    <div className="search">
                        <span className="title">汽车品牌</span>
                        <input placeholder="输入汽车品牌" defaultValue="宝马" readOnly="true" />
                        <span className="start"></span>
                    </div>
                    <div className="search">
                        <span className="title">关键词</span>
                        <div className="inputContainer">               
                            <input className="input" placeholder={_placeholder} 
                                value={_advancedValue}
                                onChange={this.changePlace.bind(this, 1)}
                            />
                            <div className="container-switch">
                                <Switch
                                    onName="车架号"
                                    offName="零件号"
                                    isOff={_isOff}
                                    click={this.switchClick.bind(this)} />
                            </div>
                            <div className="closeIcon" onClick={this.clearInput.bind(this, 1)} style={{display:_closeShow}}></div>
                            <div className="searchList" style={{display:_dropListShow}}>
                                {_resultList}
                            </div>
                        </div>
                        <div className="start remind"
                            onMouseEnter={() => this.setState({remindShow: true})}
                            onMouseLeave={() => this.setState({remindShow: false})} >
                            <div className="containr-remind"
                                style={{display: this.state.remindShow ? "flex" : "none"}}>
                                <img src={cdnHost+"/img/icon_vin.png"} />
                                <div><span className="circle"></span><span className="title">车架号</span><span className="content">WBAxxxxxxx5H21xxx</span></div>
                                <div><span className="circle"></span><span className="title">车架号+零件名称</span><span className="content">WBAxxxxxxx5H21xxx 发动机</span></div>
                                <img src={cdnHost+"/img/icon_oe.png"} />
                                <div><span className="circle"></span><span className="title">零件号</span><span className="content">12317616119</span></div>
                            </div>
                        </div>
                    </div>
                    <input className="button" type="button" defaultValue="高级搜索" onClick={_advancedSearch} />
                </div>
                {this.state.hasChange ? (
                    <div className="container-bottom" onClick={this.hiddenAdvancedSearch.bind(this)}>
                        <div className="copyright">
                            <div className="pull"></div>
                        </div>
                    </div>
                ) : (
                    <div className="container-bottom">
                        <span className="remind-brands">覆盖品牌</span>
                        <img className="brands" src={cdnHost+"/img/p_engien_brands.png"} />
                        <div className="copyright">Copyright 2017 All Rights Reserved</div>
                    </div>
                )}
            </div>
        )
        return _containerInput
    }

    render() {
        let _historyList = this.state.historyList.map((item, index) => {
            return (
                <div className="historyListItem" key={index} onClick={this.historyListClick.bind(this,item)}>
                    {item}
                </div>
            )
        })

        let _toggleDrop = this.state.toggleDrop
        let _hasChange = this.state.hasChange
        let _userInfo = this.state.userInfo
        let _activeClass = _hasChange ? "container_search_active" : "container_search"
        let _carImgShow = _hasChange ? "none" : "block"
        let _historyClass = "historyUtil " + this.state.activeHistory
        let _mainShow = this.state.hasChange ? "flex" : "none"
        let _boxShodow = this.state.boxShadow
        let _containerInput = this.getContainerInput()
        let _loginStatus = this.state.loginStatus
        let _showLoginWindow = this.state.showLoginWindow
        let _logout = this.logout.bind(this)
        
        let _isGray = this.props.isGray ? "rgb(216, 216, 216)":"#666666"
        return (
            <div className={_activeClass} style={{boxShadow:_boxShodow}}>
                {this.getNormalSearch()}
                {_containerInput}
                <div className="container_utils">
                    <div className="carInfoMain" style={{display: _mainShow}} onClick={() => this.props.showTypein()}>
                        <div style={{color:_isGray}}>
                            添加别称
                        </div>
                    </div>
                    <div className="carInfoMain" style={{display: "flex"}} onClick={() => window.open("https://007vin.com/")}>
                        <div>
                            零零汽
                        </div>
                    </div>
                    <div className="feedBack FeedBackButton">
                        <div>
                            意见反馈
                        </div>
                    </div>
                    <div className="login" style={{display: _loginStatus ? "none" : "block"}} onClick={() => this.setState({showLoginWindow: true})}>
                        <div>
                            登录
                        </div>
                    </div>
                    <div className="userUtil" style={{display: _loginStatus ? "flex" : "none"}}
                        onMouseEnter={() => this.setState({logoutShow: true})}
                        onMouseLeave={() => this.setState({logoutShow: false})}>
                        <div className="userIcon">
                        </div>
                        <div>
                            {_userInfo}
                        </div>
                        <div className="container-logout" style={{display: this.state.logoutShow ? "flex" : "none"}}
                            onClick={_logout}>
                            <img src={cdnHost+"/img/icon_exit.png"} />
                            <span>退出</span>
                        </div>
                    </div>
                    <div className={_historyClass}
                        style={{display: _hasChange ? "none" : "none"}}
                        onMouseEnter={this.showHistory.bind(this)}
                        onMouseLeave = {this.hideHistory.bind(this)}
                        onClick={this.toggleHistory.bind(this)}>
                        <div>
                            历史
                        </div>
                        <div className="historyIcon">
                        </div>
                    </div>
                </div> 
                <div className = "historyContainer" style = {{top: _toggleDrop,display:"none"}}
                    onMouseEnter = {this.showHistory.bind(this)}
                    onMouseLeave = {this.hideHistory.bind(this)}>
                    {_historyList}
                </div>
                <LoginFloatWindow
                    show={_showLoginWindow ? "flex" : "none"}
                    closeLogin={() => this.setState({showLoginWindow: false})}
                    successLogin={this.getUserInfo.bind(this)}/>
                <ConfirmAuto
                    content={this.state.contentConfirm}
                    show={this.state.showConfirm}
                    close={() => this.setState({showConfirm: false})} />
            </div>
        )
    }
}
