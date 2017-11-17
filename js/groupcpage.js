/*
* @Author: steven
* @Date:   2017-05-02 15:18:53
* @Last Modified by:   steven
* @Last Modified time: 2017-05-04 17:08:28
*/

'use strict';
import React, {
    Component
} from 'react'
export default class DgroupPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        let _this = this;
        //当前页码
        let cur = this.props.current;
        //显示分页按钮
        let pageNum = [];
        let begin;
        let len;
        let divshow = "none"

        if (_this.props.totalPage > 10) {
            divshow = "block"
            len = 10;
            if (cur >= (_this.props.totalPage - 5)) {
                begin = _this.props.totalPage - 9;
            } else if (cur <= 5) {
                begin = 1;
            } else {
                begin = cur - 5;
            }
        } else if (_this.props.totalPage > 1 && _this.props.totalPage <= 10) {
            divshow = "block"
            len = _this.props.totalPage;
            begin = 1;
        } else {
            divshow = "none"
            len = _this.props.totalPage;
            begin = 1;
        }
        //根据返回的总记录数计算当前页显示的数据
        for (let i = 0; i < len; i++) {
            let showI = begin + i;
            if (cur == showI) {
                pageNum.push({
                    num: showI,
                    cur: true
                });
            } else {
                pageNum.push({
                    num: showI,
                    cur: false
                });
            }
        }
        return (
            <div style={{display:divshow}}>
              <div className="paginationDiv">
              	<a  onClick = {_this.props.pageClick.bind(_this,1)} className={this.props.current == 1? 'prev disable firstandlast' : 'prev firstandlast'}>首页</a>
                  <a className={this.props.current == 1? 'prev disable' : 'prev'} onClick={this.props.goPrev.bind(this)}>&lt;</a>
                    <span>
                        {
                             pageNum.map(function(curPageNum,index){
                                return(
                                    <a  key={index} onClick = {_this.props.pageClick.bind(_this,curPageNum.num)} className={curPageNum.cur ? 'num current' : 'num'}>{curPageNum.num}</a>
                                )
                            })
                        }
                    </span>
                  <a className={this.props.current == this.props.total? 'next disable' : 'next'} onClick={this.props.goNext.bind(this)}>&gt;</a>
            		 <a   onClick = {_this.props.pageClick.bind(_this,this.props.totalPage)} className={this.props.current == this.props.total? 'next disable firstandlast' : 'next firstandlast'}>尾页</a>
             </div>
          </div>
        )
    }
}