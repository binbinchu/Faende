import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import ArticleList from './articleList'
import ArticleCon from './articleCon'

import {APIURL,IMG} from '../api'

class ResolveLeftMenu extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            listData:[],
            showid:this.props.showid || this.props.location.showid
        }
    }
    loadLeftList() {
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"newsShowList?type=solution",
            dataType:"JSON",
            success:function(data){
                var datas = data.data
                _this.setState({
                    listData: datas,
                });
            }
        })
    }
    Dom(e) {
        const _this = e.currentTarget;
        (_this.children[1].className == "productLiD_D")?_this.children[1].className ="productLiD_D activeBlock":_this.children[1].className ="productLiD_D";
        (_this.children[0].children[0].childNodes[0].className == "glyphicon glyphicon-chevron-down")?_this.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-up":_this.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-down"
        e.stopPropagation()
    }
    showLeft(a){
        const _Li = $(".ProductLi[data-id='"+a+"']")[0];
        if(_Li != undefined){
            (_Li.children[1].className == "productLiD_D")?_Li.children[1].className ="productLiD_D activeBlock":_Li.children[1].className ="productLiD_D";
            (_Li.children[0].children[0].childNodes[0].className == "glyphicon glyphicon-chevron-down")?_Li.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-up":_Li.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-down"
        }
    }
    componentWillReceiveProps(nextProps){
        const nextShowId = nextProps.showid;
        this.showLeft(nextShowId);
    }
    componentDidMount(){
        let id = this.state.showid;
        this.loadLeftList();
        this.showLeft(id)
    }
    render(){
        let _leftMenu = this.state.listData;
        let LeftMenu = _leftMenu.map((item,index) =>(
            <li className="ProductLi" key={index} onClick={this.Dom.bind(this)} data-id={item.id}>
                <div className="ProductLiTitle"><Link to={{
                    pathname:"/solution/list/articleList/"+item.id,
                    quert:{
                        listId:item.id,
                        type:"solution"
                    },
                    search:"id="+item.id+"&type=solution",
                    state:{
                        listId:item.id,
                        type:"solution"
                    }
                }}><i className="glyphicon glyphicon-chevron-down"></i>{item.name}</Link></div>
                <div className="productLiD_D">
                    <ul className="pro_DropDown">
                        {
                            item.article.map((_item,_index) =>(
                                <li className="productLiD_DLi" key={_index} onClick={(e)=>{e.stopPropagation()}}><Link to={{
                                    pathname:"/solution/list/article/"+_item.id,
                                    query:{
                                        id:_item.id,
                                        type:"solution"
                                    },
                                    search:"id="+_item.id+"&type=solution",
                                    state:{
                                        id:_item.id,
                                        type:"solution"
                                    }
                                }}>{_item.title}</Link></li>
                            ))
                        }
                    </ul>
                </div>
            </li>
        ))
        return(
            <div>
                <div className="ProductListTitle">解决方案</div>
                <div className="ProductList">
                    <ul className="ProductListUl">
                        {LeftMenu}
                        {/*<li className="ProductLi">*/}
                            {/*<div className="ProductLiTitle"><Link to="/resolveList/1116">车辆安全监控系列</Link></div>*/}
                            {/*<div className="productLiD_D">*/}
                                {/*<ul className="pro_DropDown">*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="ProductLi">*/}
                            {/*<div className="ProductLiTitle"><Link to="/resolveList/1117">环境监控系列</Link></div>*/}
                            {/*<div className="productLiD_D">*/}
                                {/*<ul className="pro_DropDown">*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/resolve/list/article">车辆安全监控系统</Link></li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }
}

class ResolveRightMenu extends React.Component{
    render(){
        return(
            <div>
                <Route path="/solution/list/articleList/:id" component={ArticleList}></Route>
                <Route path="/solution/list/article/:id" component={ArticleCon}></Route>
            </div>
        )
    }
}

export default {
    ResolveLeftMenu,
    ResolveRightMenu
}