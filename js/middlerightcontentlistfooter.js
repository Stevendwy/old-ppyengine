import React, {
	Component
} from 'react'
import MiddleRightContentListComponent from './middlerightcontentlistcomponent'
import MiddleRightContentListFooterItem from './middlerightcontentlistfooteritem'

export default class MiddleRightContentListFooter extends MiddleRightContentListComponent {

	constructor(props) {
		super(props)
		this.fristOnePart = false;
	}



	click(itid, index, mainIndex) {
		this.props.listClick(itid, index, mainIndex)
	}

	render() {
		let _data = this.props.data
		let _isReplace
		switch (_data.isreplace) {
			case 0:
				_isReplace = ' '
				break
			case 1:
				_isReplace = 'R'
				break
			case 2:
				_isReplace = 'S'
				break
			case 4:
				_isReplace = 'R、S'
				break
		}
		let _listIndex = this.props.listIndex
		let _plus = ""
		let _isShow = "block"
		let _isAddFlod = this.props.isAddFlod
		let _specialIndex = this.props.specialIndex
			//		var fristOnePart = false
			//		console.log(_listIndex)
		if (_listIndex == 0 && _specialIndex) {
			fristOnePart = this.props.choosePid == _data.pid ? true : false
				//		    console.log(this.fristOnePart)
		}
		if (_listIndex == 0 && _isAddFlod) {
			_plus = `<div class="plus"></div>`

			//			_plus="<img src='/img/plus.png'/>"
			if (_specialIndex && !fristOnePart) {
				//				_plus = "-"
				//				_plus="<img src='/img/plus.png'/>"
				_plus = `<div class="minus"></div>`

			}
		}

		if (_listIndex > 0 && _isAddFlod) {
			_isShow = "none"
			if (_specialIndex && !fristOnePart) {
				_isShow = "block"
			}
		}



		let _titles = [_plus, _data.num, _data.pid, _data.label, _data.quantity, _data.model, _data.prices, _isReplace, _data.detail]
		let _widths = this.widths
		let _classContainer = this.props.classContainer
		let _classItem = this.props.classItem
		let _mainListIndex = this.props.mainListIndex
		let _pidColor = this.props.choosePid == _titles[2] ? "rgb(26, 160, 243)" : ""

		//		_plus = this.props.choosePid == _titles[2] ? "-" : _pluss
		//		_isShow = this.props.choosePid == _titles[2] ? "block" : _isShow

		let _mouseEvent = this.mouseEvent
		let _color = _data.colorvalue == 0 ? "isRedImportent" : ""
		return (
			<div className={"MiddleRightContentListItemContainer "+_color}
				onClick={this.click.bind(this, _data.itid, _listIndex,_mainListIndex)}
				style={{display:_isShow,color:_pidColor}}
				name={_data.itid}>
				{
					_titles.map((title, index) => {
						let _className =  index==0? "ClickFristItem" : ""
						return (
							<MiddleRightContentListFooterItem key={index}
								index={index}
								showClassName={"MiddleRightContentListItem MiddleRightContentListFooterItem " + _classItem + " " +_className}
								showStyle={{width: _widths[index]}}
								content={title}
								isAddFlod={_isAddFlod}
								modelname={_data.modelname}
								isReplace={_data.isreplace}
								pid={_data.pid}
								itid={_data.itid}/>
						)
					})
				}
			</div>
		)
	}
}