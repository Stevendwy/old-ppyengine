import React, {Component} from 'react'

export default class MiddleRightRemind extends Component {
//	<span><span className="MiddleRightRemindBlue">蓝色字体：</span>多个零件数据</span>
//	<span><span className="MiddleRightRemindYellow">黄色字体：</span>非完全匹配数据</span>
	render() {
		return (
			<div className="MiddleRightRemindContainer" style={{top: "0"}}>
				<div className="MiddleRightRemind" style={{textAlign: "center"}}>
					说明:
					<span><span>R：</span>含替换件</span>
					<span><span>S：</span>含组件</span>
					<span><span>S：</span>*以上信息由零零汽提供, 仅供参考</span>
				</div>
			</div>
		)
	}
}