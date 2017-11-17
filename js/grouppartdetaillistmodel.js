import React, {Component} from 'react'
import GroupPartDetail from './grouppartdetail'
import GroupPartDetailListModalIntall from './grouppartdetaillistmodalintall'
import GroupPartDetailListModelContentContent from './grouppartdetaillistmodelcontent'
export default class GroupPartDetailListModel extends Component {
	constructor(props) {
		super(props)
		this.state={
			headlist:props.showname,
			clickIndex:0,
			bindmes:props.bindmes,
			changediv:<GroupPartDetailListModelContentContent whitchIs={"0"} nexmess={this.props.showmessage}/>
		}
		this.flag = true;
//		this.bindmes=props.bindmes
	}
	//改变内容
	changeIndex(index,whitch){
		let _fatherindex = this.props.fatherindex	//选取数组
		let _detailObj = this.state.contentlist
		let _part=this.props.bindmes
		
		
		let _obj={
			part:_part.part,
			brand:_part.brand
		}
		this.setState({
			changediv:<div></div>,
		}, () => {
			if(_fatherindex==1){
			if (whitch=="渠道价格") {
				this.flag=false;
				getAjax("/ppys/partprices", _obj, response => {
						this.setState({
							changediv:<GroupPartDetail response={response}/>,
							clickIndex:index
						})
				})
			}else if (whitch=="替换件") {
				this.flag=false;
				getAjax("/ppys/partreplace", _obj, response => {
						this.setState({
							clickIndex:index,
							changediv:<GroupPartDetailListModelContentContent whitchIs={"2"} nexmess={response}/>
						})
				})
			}else if(whitch=="组件"){
				this.flag=false;
				getAjax("/ppys/partcompt", _obj, response => {
					this.setState({
						clickIndex:index,
						changediv:<GroupPartDetailListModalIntall obj={response}/>
					})
				})
			}else{
				this.flag=true;
				this.setState({
					clickIndex:index,
					changediv:<GroupPartDetailListModelContentContent whitchIs={"0"} nexmess={this.props.showmessage}/>
				})
			}
		}else{
			
		}
		})
	}
	componentWillReceiveProps(props) {
		this.setState({
			clickIndex:0,
			changediv:<GroupPartDetailListModelContentContent whitchIs={"0"} nexmess={this.props.showmessage}/>
		})
	}
	//传入的名称和数据
	render(){
		//生成头部点击位置
		let _head = this.props.showname
		let _width = _head.length==1?"70px":"auto"
		let _headlist = _head.map((item,index)=>{
			let _headclickname = this.state.clickIndex == index?"GroupPartDetailListModelContentContentIsClick":"GroupPartDetailListModelContentContentIs"
			return(
				<div key={index}
					onClick={this.changeIndex.bind(this,index,item)}
					className={_headclickname}>
					{item}
				</div>
			)
		})
		let _fatherindex = this.props.fatherindex	//选取数组	
		let _contentold =this.props.showmessage 
		let _content=_contentold.data[_fatherindex].showmessage[0]
		//默认生成序列一
		let _contentlist=_content.map((item,index)=>{
			return (
				<div key={index}
					className="GroupPartDetailListModelContentcontentLi">
					{item} 
				</div>
			)
		})
		//点击请求数据生成格式
		let _contentlistOne = <div></div>
		if(this.flag) _contentlistOne =_contentlist 
		else _contentlistOne = this.state.changediv
		let _fatherlength =this.props.fatherlength=="2"?"268px":"268px"//根据返回数据量显示高度
		let _bodyheight = _fatherindex==1 ? _fatherlength:"none"
		return(
			<div className="GroupPartDetailListModelContent">
				<div className="GroupPartDetailListModelContentHead" style={{width:_width}}>
					{_headlist}
				</div>
				<div className="GroupPartDetailListModelContentcontent" style={{height:_bodyheight}}>
					{_contentlistOne}
				</div>
			</div>
		)
	}
}


