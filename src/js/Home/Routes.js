import $ from 'jquery'
import React from 'react'
import {browserHistory,Router,Switch,Route,Link} from 'react-router-dom'
// import { browserHistory, Router, Route, IndexRoute } from 'react-router'
import createHashHistory from 'history/createHashHistory';
// import createBrowserHistory from 'history/createBrowserHistory';

const newHistory = createHashHistory();
// const newHistory = createBrowserHistory();
//组件
import IndexBody from './IndexBody';

import NewsBody from './NewsBody';
import NewsList from './home/newsList';

import ProductBody from './ProductBody';
import ResolveBody from './ResolveBody';

import ServerBody from './ServerBody';
import PartnerBody from './PartnerBody';
import AboutBody from './AboutBody';

import NewsArticle from './home/newsArticle'
import ServerArticle from './home/serverArticle'
import PartnerArticle from './home/partnerArticle'
import AboutArticle from './home/aboutArticle'
//样式
import '../../less/Homehead.less'

import Logo from '../../images/FinderLogo.png'


import {APIURL,IMG} from './api'
export default class Index extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            HeadData:[],
            FooterData:[],
            Copyright:[]
        }
    }
    componentWillMount(){

    }
    loadHeadServer() {
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"mainGetNav",
            dataType:"JSON",
            success:function(data){
                // console.log(data)
                var datas = data.data
                const arrLink = ["/","/news","/product/list/","/solution/list/","/server","/partner","/about"]
                const arrLink2 = ["/","/newsList/articleList/","/product/list/articleList/","/solution/list/articleList/","/serverArticle/","/partnerArticle/","/aboutArticle/"]
                for(var i in datas){
                    datas[i].aLink = arrLink[i];
                    datas[i].cUrl = arrLink2[i];
                }
                _this.setState({
                    HeadData: datas,
                });
            }
        })
    }
    loadFooterServer(){
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"mainGetContact",
            dataType:"JSON",
            success:function(data){
                var datas = data.data
                _this.setState({
                    FooterData: datas,
                });
            }
        })
    }
    loadCopyright(){
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"/mainGetCopyright",
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    Copyright:data.data
                })
            }
        })
    }
    componentDidMount(){
        this.loadHeadServer();
        this.loadFooterServer();
        this.loadCopyright();
    }
    render(){
        let {FooterData,HeadData} = this.state;
        // console.log(HeadData)
        let HeadMenu = HeadData.map((item,index) =>(
            <li className="headNavLi" key={index}>
                <Link to={
                    {
                        pathname:item.aLink,
                        query:{
                            listId:item.id
                        },
                        // title:item.name,
                        search:"id="+item.id,
                        state:{
                            listId:item.id
                        }
                    }
                }>{item.name}</Link>
                <div className="dropDwon">
                    <ul>
                        {
                            item.childrens.map((_item,_index) =>(
                                <li className="dropDownLi" key={_index} data-id={_item.id} data-type={_item.url} data-name={_item.name}>
                                    <Link to={{
                                    pathname:item.cUrl+_item.name+"/"+_item.id,
                                    query:{
                                        listId:_item.id,
                                        type:_item.type,
                                        name:_item.name,
                                        url:_item.url
                                    },
                                    search:"id="+_item.id+"&type="+_item.type,
                                    state:{
                                        listId:_item.id,
                                        type:_item.type,
                                        name:_item.name,
                                        url:_item.url
                                    },
                                }}>{_item.name}</Link></li>
                            ))
                        }
                    </ul>
                </div>
            </li>
        ));
        let FooterMenu = FooterData.map((item,index) =>(
            <li key={index}>
                <div className="footerImg" data-key={item.key}><i className={item.icon}></i></div>
                <div className="footerCon">
                    {item.key}:{item.value}
                </div>
            </li>
        ));

        return(
            <Router history={newHistory}>
                <div>
                    <div className="Header allwidth" id="HeaderBox">
                        <div className="HeaderBox">
                            <div className="Logo">
                                <img src={Logo} />
                            </div>
                            <div className="headNavList">
                                <ul>
                                    {HeadMenu}
                                    {/*<li className="headNavLi"><Link to="/">首页</Link></li>*/}
                                    {/*<li className="headNavLi">*/}
                                        {/*<Link to="/news">新闻中心</Link>*/}
                                        {/*<div className="dropDwon">*/}
                                            {/*<ul>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                    {/*</li>*/}
                                    {/*<li className="headNavLi">*/}
                                        {/*<Link to="/product/list/1116">产品中心</Link>*/}
                                        {/*<div className="dropDwon">*/}
                                            {/*<ul>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                                {/*<li className="dropDownLi">菜单菜单菜单</li>*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                    {/*</li>*/}
                                    {/*<li className="headNavLi"><Link to="/resolve/list/1116">解决方案</Link></li>*/}
                                    {/*<li className="headNavLi"><Link to="/server">客户服务</Link></li>*/}
                                    {/*<li className="headNavLi"><Link to="/partner">战略合作</Link></li>*/}
                                    {/*<li className="headNavLi"><Link to="/about">关于我们</Link></li>*/}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="Content allwidth">
                        <Switch>
                            <Route exact path="/" component={IndexBody}></Route>
                            <Route path="/news" component={NewsBody}></Route>
                            <Route path="/product/list" component={ProductBody}></Route>
                            <Route path="/solution/list" component={ResolveBody}></Route>
                            <Route path="/server" component={ServerBody}></Route>
                            <Route path="/partner" component={PartnerBody}></Route>
                            <Route path="/about" component={AboutBody}></Route>

                            <Route path="/newsArticle/:name/:pName/:type/:id" component={NewsArticle}></Route>
                            <Route path="/serverArticle/:type" component={ServerArticle}></Route>
                            <Route path="/partnerArticle/:type" component={PartnerArticle}></Route>
                            <Route path="/aboutArticle/:type" component={AboutArticle}></Route>
                            <Route path="/newsList/articleList/:name/:id" component={NewsList}></Route>
                        </Switch>
                    </div>

                    <div className="Footer allwidth">
                        <div className="footerTop">
                            <div className="footerTopMen">
                                <ul>
                                    {FooterMenu}
                                    {/*<li>*/}
                                        {/*<div className="footerImg"><img /></div>*/}
                                        {/*<div className="footerCon">*/}
                                            {/*service@faende.cn*/}
                                        {/*</div>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<div className="footerImg"><img /></div>*/}
                                        {/*<div className="footerCon">*/}
                                            {/*济南市新泺大街1766号齐鲁软件园*/}
                                            {/*1766,Xinluo Street,Qilu Software*/}
                                            {/*Park,Jinan,China*/}
                                        {/*</div>*/}
                                    {/*</li>*/}
                                    {/*<li>*/}
                                        {/*<div className="footerImg"><img /></div>*/}
                                        {/*<div className="footerCon">*/}
                                            {/*0531-88690632*/}
                                        {/*</div>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                        </div>
                        <div className="footerBottom">
                            <div className="footerBottomCon">
                                {/*版权所有 © 济南法恩德信息技术有限公司 2008-2016。保留一切权利。*/}
                                {/*鲁ICP备16007097号*/}
                                {this.state.Copyright.text}
                                {this.state.Copyright.url}
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
window.onscroll = function(){ //绑定scroll事件
    var t = document.documentElement.scrollTop || document.body.scrollTop;  //获取滚动距离
    var HeaderBox = document.getElementById( "HeaderBox" ); //查询并定义div元素
    if( t >= 1 ) { //判断
        HeaderBox.style.background = "rgba(0,0,0,0.5)";
    } else {
        HeaderBox.style.background = "none";
    }
}