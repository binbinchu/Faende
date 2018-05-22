import $ from 'jquery'
import React from 'react'
import ReactDom from 'react-dom';
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'
import ArticleList from './articleList'
import ArticleCon from './articleCon'

import {APIURL,IMG} from '../api'

class ProductLeftMenu extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isClick:false,
            listData:[],
            showid:this.props.showid || this.props.location.showid
        }
    }
    componentWillReceiveProps(nextProps){
        const nextShowId = nextProps.showid;
        this.showLeft(nextShowId);
    }
    loadLeftList() {
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"newsShowList?type=product",
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
        console.log(_this);
        (_this.children[1].className == "productLiD_D")?_this.children[1].className ="productLiD_D activeBlock":_this.children[1].className ="productLiD_D";
        (_this.children[0].children[0].childNodes[0].className == "glyphicon glyphicon-chevron-down")?_this.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-up":_this.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-down"
        e.stopPropagation()
    }
    showLeft(a){
        const _Li = $(".ProductLi[data-id='"+a+"']")[0];
        console.log(_Li)
        if(_Li != undefined){
            (_Li.children[1].className == "productLiD_D")?_Li.children[1].className ="productLiD_D activeBlock":_Li.children[1].className ="productLiD_D";
            (_Li.children[0].children[0].childNodes[0].className == "glyphicon glyphicon-chevron-down")?_Li.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-up":_Li.children[0].children[0].childNodes[0].className = "glyphicon glyphicon-chevron-down"
        }

    }
    componentDidMount(){
        let id = this.state.showid;
        this.loadLeftList();
        this.showLeft(id)
    }
    render(){
        var _leftMenu = this.state.listData;
        var LeftMenu = _leftMenu.map((item,index) =>(
            <li className="ProductLi" key={index} onClick={this.Dom.bind(this)} data-id={item.id}>
                <div className="ProductLiTitle"><Link to={{
                    pathname:"/product/list/articleList/"+item.id,
                    query:{
                        listId:item.id,
                        type:"product"
                    },
                    search:"id="+item.id+"&type=product",
                    state:{
                        listId:item.id,
                        type:"product"
                    }
                }}><i className="glyphicon glyphicon-chevron-down"></i>{item.name}</Link></div>
                <div className="productLiD_D">
                    <ul className="pro_DropDown">
                        {item.article.map((_item,_index) =>(
                            <li className="productLiD_DLi" key={_index} onClick={(e)=>{e.stopPropagation()}}><Link to={{
                                pathname:"/product/list/article/"+_item.id,
                                query:{
                                    id:_item.id,
                                    type:"product"
                                },
                                search:"id="+_item.id+"&type=product",
                                state:{
                                    id:_item.id,
                                    type:"product"
                                }
                            }}>{_item.title}</Link></li>
                        ))}
                    </ul>
                </div>
            </li>
        ))
        return(
            <div>
                <div className="ProductListTitle">产品中心</div>
                <div className="ProductList">
                    <ul className="ProductListUl">
                        {LeftMenu}
                        {/*<li className="ProductLi">*/}
                            {/*<div className="ProductLiTitle"><Link to="/product/list/1">车辆安全监控系列</Link></div>*/}
                            {/*<div className="productLiD_D">*/}
                                {/*<ul className="pro_DropDown">*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="ProductLi">*/}
                            {/*<div className="ProductLiTitle"><Link to="/product/list/2">车辆安全监控系列</Link></div>*/}
                            {/*<div className="productLiD_D">*/}
                                {/*<ul className="pro_DropDown">*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                    {/*<li className="productLiD_DLi"><Link to="/product/list/article">车辆安全监控系统</Link></li>*/}
                                {/*</ul>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </div>
        )
    }


}

class ProductRightMenu extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <Route path="/product/list/articleList/:id" component={ArticleList}></Route>
                <Route path="/product/list/article/:id" component={ArticleCon}></Route>
            </div>
        )
    }
}

export default {
    ProductLeftMenu,
    ProductRightMenu
}


