import React, {Component} from 'react'
import MiddleRightContent from './middlerightcontent'
import FloatWindow from './floatwindowadd'
import GroupPartDetailListNew from './grouppartdetailnew'
import {sendEvent, catchEvent, removeEvent, middleEvents} from './eventmodel'

export default class MiddleRight extends Component {
	
	constructor(props) {
		super(props)
		this.state = {
			contentList: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
			left: "calc(38% + 4px)",
			width: "calc(62% - 4px)",
			top:"calc(50% - 300px)",
			showFloatWindow: false,
			detailPid: "",
			newpid:"",
			floatwindowadd:[],
			flowshowindex:0,
			didhaspidnext:true,
			showmes:"",//弹框显示内容
			alertshow:"none"//弹框
		}
		this._transform = this.transform.bind(this)
		this._more = 0
		this.splics = 0//判断删除的哪个
		this._list=[]//初始设置数组
		this._pidlist=[]//pid组合
	}
	componentWillUnmount() {
		removeEvent(middleEvents.transform, this._transform)
	}
	
	transform(e) {
		this.setState({
			left: e.info.hasTransform ? "calc(38% + 4px)" : "calc(62% + 4px)",
			width: e.info.hasTransform ? "calc(62% - 4px)" : "calc(38% - 4px)"
		})
	}
	
	imgclick(index) {
		this._more--
		this._list.splice(index,1)//点击删除图标后数组内容删除和pid 删除一个
		this._pidlist.splice(index,1)
		this.setState({
				floatwindowadd:this._list
			})
		if (this._list.length==0) {
			this._more=0
			this.setState({
				showFloatWindow: false
			})
		}
	}
	
	didhaspid(yes){
		this.setState({
			didhaspidnext:yes
		})
	}
	componentDidMount() {
		catchEvent(middleEvents.transform, this._transform)
		catchEvent(middleEvents.hiddenTag, e => {
			this._more=0
			this._list=[]
			this.setState({
				showFloatWindow:false,
				floatwindowadd:this._list
			})
		})
		catchEvent(middleEvents.detailClick, e => {
			this.setState({
				showFloatWindow: true,
				detailPid: e.info.pid
			})
			this.splics=0
			this._more=0
			this._list=[]
			let _newleft = "auto"
			let _newtop= "85px"
			let _right = "0px"
			let _pid = e.info.pid
			this._pidlist.push(_pid)
			let _floatwindowcontent = <GroupPartDetailListNew pid={_pid} />
			let _newfloat={
					left:_newleft,
					top:_newtop,
					right:_right,
					floatwindowcontent:_floatwindowcontent
				}
			//为floatwindow 传入数组，将包含的内容和 pid 传入
			this._list.push(_newfloat)
			let _flowshowindex=this._list.length-1
			this.setState({
				floatwindowadd:this._list,
				flowshowindex:_flowshowindex
			})
		})
		//新加弹框
		catchEvent(middleEvents.addfloatwindow,  (e)=>{
			this.splics++
			if ($.inArray(e.info,this._pidlist)==-1) {
				this._pidlist.push(e.info)
			}else{
				let _flowshowindex=$.inArray(e.info,this._pidlist) 
				this.setState({
					flowshowindex:_flowshowindex
				})
				return
			}
			if (this._more>=1) {
				this.setState({
					alertshow:"block",
					showmes:"系统支持最多1个替换件同时显示"
				},()=>{
					setTimeout(()=>{
						this.setState({
							alertshow:"none"
						})
					},2000)
				})
				return
			}
			this._more++//用于新创建的位置偏移量
// 			let _leftnew = (-40*this._more + 314)+"px"
   			let _newleft = "auto"
   			let _topnews = this.splics*45 + 80 +"px"
   			let _rights = this.splics*40 +"px"
   			//获取的pid
			this.setState({
				newpid:e.info
			},()=>{
				let _floatwindowcontent = <GroupPartDetailListNew pid={this.state.newpid} />
				let _newfloat={
					left:_newleft,
					top:_topnews,
					right:_rights,
					floatwindowcontent:_floatwindowcontent
				}
				//为floatwindow 传入数组，将包含的内容和 pid 传入
				this._list.push(_newfloat)
				let _flowshowindex=this._list.length-1
				//
				this.setState({
					floatwindowadd:this._list,
					flowshowindex:_flowshowindex
				})
			})
					
		})
		
	}
	render() {
		let _left = this.state.left
		let _width = this.state.width
		let _contentList = this.state.contentList
		let _listWidth = this.state.listWidth
		let _showFloatWindow = this.state.showFloatWindow
		let _pid = this.state.detailPid
		let _alert= this.state.alertshow
		let _alertmes = this.state.showmes
		let _floatwindowcontent = <GroupPartDetailListNew pid={_pid} />
		return (
			<div ref="middlerightcontainer" className="MiddleRightContainer"
				style={{left: _left, width: _width, top: "44px"}}>
				<MiddleRightContent
					contentList={_contentList}/>
				<div className="alertnum" style={{display:_alert}}>
					<div className="alertcontent">{_alertmes}</div>
				</div>
				<FloatWindow
					title="零件数据"
					img="/img/icon_san.png"
					show={_showFloatWindow ? "block" : "none"}
					top="85px"
					left="auto"
					width="660px"
					height="480px"
					right="0px"
					hiddenEvent={() => {this.setState({showFloatWindow: false})}}
					imgclick={this.imgclick.bind(this)}
					content={_floatwindowcontent}
					flowshow={this.state.flowshowindex}
					contentadd={this.state.floatwindowadd}
					/>
			</div>
		)
	}
}
