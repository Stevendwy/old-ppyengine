/*
* @Author: steven
* @Date:   2017-05-02 14:42:26
* @Last Modified by:   steven
* @Last Modified time: 2017-07-12 19:11:24
*/

'use strict';
import React ,{Component} from 'react'
import {sendEvent, catchEvent, middleEvents} from './eventmodel'
export default class DgroupImg extends Component {
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	loadingview:"https://cdns.007vin.com/img/loadingview.gif",
	  	imgloading:"inline-block",
		imgshow:"none"
	  };
	}
	goNextmes(auth, pid) {
		let _mes = this.props.ajaxuse
		let _mescid = _mes.cid
		let _mesbrd = _mes.brandCode
		let _obj = {
			auth: auth,
			p: _mescid,
			brandCode: _mesbrd,
			pid: pid
		}
		let _urls ="/ppy?type=part&binds=group&part="+pid+"&brand="+_mesbrd
			window.open(_urls)
		return
		sendEvent(middleEvents.subGroupClick, _obj)
	}
	handleImageLoaded() {
	    this.setState({ 
    		imgloading:"none",
			imgshow:"inline-block" 
	    });
	}
	handleImageError(){
		this.setState({
			loadingview:"https://cdns.007vin.com/img/p_jiegoutu.png", 
    		imgloading:"inline-block",
			imgshow:"none" 
	    });
	}
	// 添加点击出现隐藏
	goHide(index,piddis,pid){
		this.props.goShowright(false,index,piddis,pid)
	}
	goShow(index,piddis,pid,e){
		e.stopPropagation()
		this.props.goShowright(true,index,piddis,pid)
	}
	//如果新加同类 <div onClick={this.goShow.bind(this)}>{item.price==""?"--":item.price}</div>
	// <div onClick={this.goShow.bind(this)}>展开</div>
	render(){
		// 生成列表
		let _imglist=<div></div>
		let _datalist= this.props.imgdata 		//数据内容
		let _imgloading= this.state.imgloading  //加载图片
		let _imgloadview=this.state.loadingview //显示图片
		let _imgdisplay= this.state.imgshow
		let _index=this.props.clickindex 		//点击的index 记录
		if ((_datalist.data.length!="undefined")&&(_datalist.data.length>0)) {

				_imglist=_datalist.data.map((item,index)=>{
					let _classname=_index==index?"clickdiv":"noclickdiv"
					let _pworld=this.props.ajaxuse.query
					let _words=item.label
					let _pcolor="#666"
					if (_pworld==_words) {_pcolor="#1AA0F3"}
					let _titlecolor= item.title_color==""?"":"("+item.title_color+")"
					let _pid=item.pid_display==""?"--":item.pid_display
					let _newwold = _words.replace(new RegExp(_pworld,'g'),"<span className='worldcolor'>"+_pworld+"</span>")+"<span className='worldcolor'>"+_titlecolor+"</span>"

				return (
					<div key={index} className="dGroupImgList" onClick={this.goHide.bind(this,-1,-1,"none")}>
						<p onClick={this.goNextmes.bind(this,item.auth,item.pid)} 
						dangerouslySetInnerHTML={{__html:_newwold}}></p>
						<img src={_imgloadview} 
							className="dGroupImgListImgLoading"
							onClick={this.goNextmes.bind(this,item.auth,item.pid)} 
							style={{display:_imgloading}} />
						<img className="dGroupImgListImg"
							style={{display:_imgdisplay}} 
							onClick={this.goNextmes.bind(this,item.auth,item.pid)}
							onLoad={this.handleImageLoaded.bind(this)}
							onError={this.handleImageError.bind(this)}
							src={item.imgurl} alt="loading"/>
						<ul>
							<li>
								<div>零件号：</div>
								<div dangerouslySetInnerHTML={{__html:_pid}}></div>
							</li>
							<li>
								<div>型号：</div>
								<div>{item.model==""?"--":item.model}</div>
							</li>
							<li>
								<div>参考价格：</div>
								<div>{item.price==""?"--":item.price}</div>
							</li>
							<li>
								<div>分组：</div>
								<div>{item.subgroup_info==""?"--":item.subgroup_info}</div>
								<div className={_classname} 
								onClick={this.goShow.bind(this,index,_pid,item.pid)}>{item.adaptive_cars_button}</div>
							</li>
							
						</ul>
					</div>
				)
			})
		}
		
		return(
			<div className="dGroupImg">
				<div className="dgLeftHaveLoading"></div>
				{_imglist}
			</div>
		)

	}
}