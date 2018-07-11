import $ from 'jquery'
import React from 'react'
import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom'

import {APIURL,IMG} from '../api'

export default class NewsList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            listData:[],
            listId:this.props.match.params.id || this.props.location.state.listId,
            type:"news",
            name:this.props.match.params.name || this.props.location.state.name
        }
    }
    loadNewsList(type,id){
        var _this = this;
        $.ajax({
            type:"get",
            url:APIURL+"getNewsListByCateId",
            data:{
                type:type,
                cateid:id
            },
            dataType:"JSON",
            success:function(data){
                _this.setState({
                    listData:data.data
                })
            }
        })
    }
    componentWillReceiveProps(nextProps){
        let nextPropsId = nextProps.match.params.id || nextProps.location.state.listId,
            oldPropsId = this.props.match.params.id || this.props.location.state.listId;
            // nextPropsType = nextProps.match.params.type || nextProps.location.state.type,
            // oldPropsType = this.props.match.params.type || this.props.location.state.type
        if(nextPropsId != oldPropsId){
            this.loadNewsList("news",nextPropsId)
            this.setState({
                type:"news",
                name:nextProps.location.state.name || nextProps.match.params.name
            })
        }
    }
    componentDidMount(){
        let type = this.state.type,
            id = this.state.listId;
        this.loadNewsList(type,id);
    }
    render(){
        let _listdata = this.state.listData;
        let ListData = _listdata.map((item,index) =>(
            <li className="newsListLi" key={index}>
                <Link to={{
                    pathname:"/newsArticle/详情/"+this.state.name+"/"+this.state.type+"/"+item.id,
                    query:{
                        type:this.state.type,
                        id:item.id,
                        pName:this.state.name,
                        name:"详情",
                        // type:"news"
                    },
                    state:{
                        type:this.state.type,
                        id:item.id,
                        pName:this.state.name,
                        name:"详情",
                        // type:"news"
                    }
                }}>
                <div className="newsListImgBox"><img src={IMG+item.cover} /></div>
                <div className="newsListInfo">
                    <div className="newsListTitle">
                        {item.title}
                    </div>
                    <div className="newsListIntro">
                        {item.descr}
                    </div>
                    <div className="newsListTagBox">
                        <div className="newsListTag">
                            {/*<span className="TagName">标签：  </span><span className="Tags">公司、天气</span>*/}
                        </div>
                        <div className="newsListTagTime">
                            {item.addtime.substring(0,10)}
                        </div>
                    </div>
                    <div className="newsListBtn">了解详情</div>
                </div>
            </Link>
            </li>
        ))
        return(
            <div>
                <div className="newsMenuTop_Head"></div>
                <div className="newsListBox indexBox_2">
                    <div className="newsListNavigationBox allwidth">
                        <div className="newsListNavigation">
                            <Link to="/">首页</Link>><Link to="/news">新闻中心></Link>{this.state.name}
                        </div>
                    </div>
                    <div className="newsList">
                        {ListData}
                        {/*<li className="newsListLi">*/}
                            {/*<div className="newsListImgBox"><img /></div>*/}
                            {/*<div className="newsListInfo">*/}
                                {/*<div className="newsListTitle">*/}
                                    {/*Upgrading To Microsoft Windows Vista*/}
                                {/*</div>*/}
                                {/*<div className="newsListIntro">*/}
                                    {/*Lorem Ipsum is simply dummy text of the*/}
                                    {/*printing and typesetting industry. Lorem*/}
                                    {/*Ipsum has been the industry's standard dummy*/}
                                    {/*text ever since the 1500s, wh en an unknown*/}
                                    {/*printer took a galley of type and scrambled*/}
                                {/*</div>*/}
                                {/*<div className="newsListTagBox">*/}
                                    {/*<div className="newsListTag">*/}
                                        {/*<span className="TagName">标签：  </span><span className="Tags">公司、天气</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="newsListTagTime">*/}
                                        {/*2018/04/13*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="newsListBtn">了解详情</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="newsListLi">*/}
                            {/*<div className="newsListImgBox"><img /></div>*/}
                            {/*<div className="newsListInfo">*/}
                                {/*<div className="newsListTitle">*/}
                                    {/*Upgrading To Microsoft Windows Vista*/}
                                {/*</div>*/}
                                {/*<div className="newsListIntro">*/}
                                    {/*Lorem Ipsum is simply dummy text of the*/}
                                    {/*printing and typesetting industry. Lorem*/}
                                    {/*Ipsum has been the industry's standard dummy*/}
                                    {/*text ever since the 1500s, wh en an unknown*/}
                                    {/*printer took a galley of type and scrambled*/}
                                {/*</div>*/}
                                {/*<div className="newsListTagBox">*/}
                                    {/*<div className="newsListTag">*/}
                                        {/*<span className="TagName">标签：  </span><span className="Tags">公司、天气</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="newsListTagTime">*/}
                                        {/*2018/04/13*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="newsListBtn">了解详情</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                        {/*<li className="newsListLi">*/}
                            {/*<div className="newsListImgBox"><img /></div>*/}
                            {/*<div className="newsListInfo">*/}
                                {/*<div className="newsListTitle">*/}
                                    {/*Upgrading To Microsoft Windows Vista*/}
                                {/*</div>*/}
                                {/*<div className="newsListIntro">*/}
                                    {/*Lorem Ipsum is simply dummy text of the*/}
                                    {/*printing and typesetting industry. Lorem*/}
                                    {/*Ipsum has been the industry's standard dummy*/}
                                    {/*text ever since the 1500s, wh en an unknown*/}
                                    {/*printer took a galley of type and scrambled*/}
                                {/*</div>*/}
                                {/*<div className="newsListTagBox">*/}
                                    {/*<div className="newsListTag">*/}
                                        {/*<span className="TagName">标签：  </span><span className="Tags">公司、天气</span>*/}
                                    {/*</div>*/}
                                    {/*<div className="newsListTagTime">*/}
                                        {/*2018/04/13*/}
                                    {/*</div>*/}
                                {/*</div>*/}
                                {/*<div className="newsListBtn">了解详情</div>*/}
                            {/*</div>*/}
                        {/*</li>*/}
                    </div>
                </div>
            </div>
        )
    }
}

